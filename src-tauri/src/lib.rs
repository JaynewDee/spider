pub mod monitor {
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
                Domain {
                    name: String::from("Roomy"),
                    url: String::from("https://meep-mountain.herokuapp.com/"),
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
        domain: String,
        code: String,
    }

    //

    #[derive(Deserialize, Serialize, Debug)]
    struct StatusResponses(Vec<Status>);

    pub struct Client {
        client: Box<reqwest::Client>,
    }

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
            Client { client }
        }

        fn construct(kind: &str, url: Url) -> reqwest::Request {
            match kind {
                "get" => Request::new(Method::GET, url),
                "post" => Request::new(Method::POST, url),
                "put" => Request::new(Method::PUT, url),
                "delete" => Request::new(Method::DELETE, url),
                _ => Request::new(Method::GET, url),
            }
        }

        async fn execute(&self, req: Request) -> Result<reqwest::Response, ()> {
            let res = reqwest::Client::execute(&*self.client, req)
                .await
                .expect("Client should successfully execute request ... ");

            Ok(res)
        }

        pub async fn request_domain_status(&self) -> Result<String, ()> {
            let domains = Domains::default();
            let mut responses = vec![];
            for domain in domains {
                let url = Url::parse(&domain.url).unwrap();
                let req = Self::construct("get", url);
                let res = Self::execute(&self, req).await?;
                let status = res.status();
                let status_text = status.as_str();

                responses.push(Status {
                    name: domain.name,
                    domain: domain.url,
                    code: status_text.to_string(),
                })
            }
            let json = serde_json::to_string(&responses).unwrap();
            Ok(json)
        }
    }
}

//////////////////////////////
pub mod crawl {
    use scraper::{Html, Selector};
    struct Target(String);

    pub async fn hacker_news(
        num_pages: usize,
        filter: &str,
    ) -> Result<Vec<String>, tauri::InvokeError> {
        let mut target_page = 1;
        let mut all_src_data: Vec<Vec<String>> = vec![];
        let target = Target(format!("https://news.ycombinator.com/?p={target_page}"));
        let client = reqwest::Client::new();

        while target_page < num_pages {
            let body = client
                .get(&target.0)
                .send()
                .await
                .unwrap()
                .text()
                .await
                .unwrap();

            let fragment = Html::parse_document(&body);

            let elements = Selector::parse(r#".titleline"#).unwrap();

            let mut src_strings: Vec<String> = vec![];

            for anchor in fragment.select(&elements) {
                if let Some(attrs) = anchor.first_child().unwrap().value().as_element() {
                    for item in attrs.attrs() {
                        let owned_str = item.1.to_string();
                        if owned_str.contains(&filter) {
                            src_strings.push(owned_str)
                        }
                    }
                } else {
                    break;
                }
            }

            all_src_data.push(src_strings);
            target_page += 1;
        }

        // TODO
        // Add name of each article link to crawl return

        Ok(all_src_data.into_iter().flatten().collect())
    }

    pub async fn reddit() -> Result<Vec<String>, tauri::InvokeError> {
        let all_src_data: Vec<Vec<String>> = vec![];
        let target = Target(format!(
            "https://www.reddit.com/search/?q=programming&source=recent&include_over_18=1"
        ));

        let client = reqwest::Client::new();

        let body = client
            .get(&target.0)
            .send()
            .await
            .unwrap()
            .text()
            .await
            .unwrap();

        let fragment = Html::parse_document(&body);

        let elements = Selector::parse("a").unwrap();

        for el in fragment.select(&elements) {
            println!("{:?}", el.value());
        }

        Ok(all_src_data.into_iter().flatten().collect())
    }
}

// TODO
// Implement sql/ite module
// to store saved crawl results

pub mod persistence {}

// TODO
// Complete/revive cron module
///////////////////////////
//

pub mod schedule {

    use chrono::Utc;
    use cron::Schedule;
    use serde::Serialize;
    use std::{ops::Deref, str::FromStr};

    #[derive(Debug, thiserror::Error)]
    enum Error {
        #[error(transparent)]
        Io(#[from] std::io::Error),
    }

    impl serde::Serialize for Error {
        fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: serde::ser::Serializer,
        {
            serializer.serialize_str(self.to_string().as_ref())
        }
    }

    #[derive(Debug, thiserror::Error)]
    enum CustomErr {
        #[error("Serialize Error")]
        SerializeScheduleErr(#[from] serde_json::Error),
        #[error("Cron Error")]
        CronErr(#[from] std::io::Error),
    }

    impl serde::Serialize for CustomErr {
        fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: serde::ser::Serializer,
        {
            serializer.serialize_str(self.to_string().as_ref())
        }
    }

    #[derive(Serialize)]
    struct ScheduleResponse {
        times: Vec<String>,
    }

    pub struct CustomSchedule {
        expression: Option<String>,
        pub schedule: Box<Option<Schedule>>,
    }

    impl Deref for CustomSchedule {
        type Target = Option<Schedule>;

        fn deref(&self) -> &Self::Target {
            &self.schedule
        }
    }

    impl Default for CustomSchedule {
        fn default() -> CustomSchedule {
            CustomSchedule {
                expression: None,
                schedule: Box::new(None),
            }
        }
    }

    impl CustomSchedule {
        fn _get(self) -> Option<Schedule> {
            *self.schedule
        }

        //

        pub fn set_standard(&mut self) -> Result<(), serde_json::Error> {
            let exp = String::from("0 0 9,12,15,18 * * *");
            self.expression = Some(exp.clone());

            self.schedule = Box::new(Some(Schedule::from_str(&exp).unwrap()));

            Ok(())
        }

        //

        pub fn print(&self) -> Result<(), cron::error::Error> {
            let s = self.schedule.clone().unwrap();

            for datetime in s.upcoming(Utc).take(10) {
                println!("-> {}", datetime);
            }

            Ok(())
        }

        //

        pub fn send(&self) -> String {
            let schedule = self.schedule.as_ref().clone().unwrap();
            let mut times = vec![];
            for dt in schedule.upcoming(Utc).take(8) {
                times.push(dt.to_string());
            }
            serde_json::to_string(&times).unwrap()
        }

        //
    }
}
