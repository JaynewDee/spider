pub mod requests {
    use std::ops::{Deref, DerefMut};

    use reqwest::{Method, Request, Url};
    use serde::{Deserialize, Serialize};
    use serde_json;

    #[derive(Deserialize, Serialize, Debug)]
    pub struct Domain {
        name: String,
        pub url: String,
    }

    #[derive(Debug, Deserialize, Serialize)]
    pub struct Domains(Vec<Domain>);

    impl Default for Domains {
        fn default() -> Self {
            let default_domains = vec![
                Domain {
                    name: String::from("Interactive Portfolio"),
                    url: String::from("https://syntheticrain.net"),
                },
                Domain {
                    name: String::from("Hex Guess Game"),
                    url: String::from(
                        "http://hex-guess-app-bucketf.s3-website.us-east-2.amazonaws.com/",
                    ),
                },
                Domain {
                    name: String::from("Acumen Gold"),
                    url: String::from(
                        "http://acumen-dev-client-static.s3-website.us-east-2.amazonaws.com/",
                    ),
                },
            ];
            Domains(default_domains)
        }
    }

    impl Domains {
        pub fn iter(&self) -> std::slice::Iter<Domain> {
            self.0.iter()
        }
    }

    impl std::iter::IntoIterator for Domains {
        type Item = Domain;
        type IntoIter = std::vec::IntoIter<Self::Item>;

        fn into_iter(self) -> Self::IntoIter {
            self.0.into_iter()
        }
    }

    impl<'a> std::iter::IntoIterator for &'a Domains {
        type Item = &'a Domain;
        type IntoIter = std::slice::Iter<'a, Domain>;

        fn into_iter(self) -> Self::IntoIter {
            self.0.iter()
        }
    }

    #[derive(Deserialize, Serialize, Debug)]
    struct Status {
        name: String,
        code: String,
    }

    //

    #[derive(Deserialize, Serialize, Debug)]
    struct StatusResponses(Vec<Status>);

    //

    pub struct Client {
        client: Box<reqwest::Client>,
        targets: [String; 1],
    }

    //

    impl Deref for Client {
        type Target = Box<reqwest::Client>;

        fn deref(&self) -> &Self::Target {
            &self.client
        }
    }

    impl DerefMut for Client {
        fn deref_mut(&mut self) -> &mut Self::Target {
            &mut self.client
        }
    }

    impl Client {
        pub fn new() -> Client {
            let builder = reqwest::Client::new();
            let client = Box::new(builder);
            let targets = ["https://www.google.com".to_owned()];
            Client { client, targets }
        }

        fn construct_request(kind: &str, url: Url) -> reqwest::Request {
            match kind {
                "get" => Request::new(Method::GET, url),
                "post" => Request::new(Method::POST, url),
                "put" => Request::new(Method::PUT, url),
                "delete" => Request::new(Method::DELETE, url),
                _ => Request::new(Method::GET, url),
            }
        }

        async fn exec_request(&self, req: Request) -> Result<reqwest::Response, ()> {
            let res = reqwest::Client::execute(&*self.client, req)
                .await
                .expect("Client should successfully execute request ... ");

            Ok(res)
        }

        async fn as_text(url: &str) -> String {
            reqwest::get(url).await.unwrap().text().await.unwrap()
        }

        pub async fn request_google() -> Result<String, ()> {
            let body = Self::as_text("https://news.ycombinator.com/").await;
            super::chop::test_printall_r(&body);
            Ok(body)
        }

        pub async fn request_domain_status(&self) -> Result<String, ()> {
            let domains = Domains::default();
            let mut responses = vec![];
            for domain in domains {
                let url = Url::parse(&domain.url).unwrap();
                let req = Self::construct_request("get", url);
                let res = Self::exec_request(&self, req).await?;
                let status = res.status();
                let status_text = status.as_str();
                responses.push(Status {
                    name: domain.name,
                    code: status_text.to_string(),
                })
            }
            let json = serde_json::to_string(&responses).unwrap();
            Ok(json)
        }
    }
}

// TODO
// Implement scraper module
//////////////////////////////
pub mod chop {
    pub fn test_printall_r(content_str: &str) {
        for ch in content_str.chars() {
            if ch == 'r' {
                println!("{ch}");
            }
        }
    }
}

// TODO
// Implement cron module
///////////////////////////
