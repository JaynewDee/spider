pub mod requests {
    use std::ops::{Deref, DerefMut};

    use reqwest::{Method, Request, Url};
    pub struct Client {
        client: Box<reqwest::ClientBuilder>,
        targets: [String; 1],
    }

    impl Deref for Client {
        type Target = Box<reqwest::ClientBuilder>;

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
            let builder = reqwest::ClientBuilder::new();
            let client = Box::new(builder);
            let targets = ["https://www.google.com".to_owned()];
            Client { client, targets }
        }

        fn _construct_request(kind: &str, url: Url) -> reqwest::Request {
            match kind {
                "get" => Request::new(Method::GET, url),
                "post" => Request::new(Method::POST, url),
                "put" => Request::new(Method::PUT, url),
                "delete" => Request::new(Method::DELETE, url),
                _ => Request::new(Method::GET, url),
            }
        }

        async fn as_text(url: &str) -> String {
            reqwest::get(url).await.unwrap().text().await.unwrap()
        }

        pub async fn request_google() -> Result<String, ()> {
            let body = Self::as_text("https://www.google.com").await;
            Ok(body)
        }

        pub async fn request_mine() -> Result<String, ()> {
            let body = Self::as_text("https://syntheticrain.net").await;
            Ok(body)
        }
    }
}
