pub mod requests {
    use std::ops::{Deref, DerefMut};

    use reqwest::{Method, Request, Url};
    pub struct Client {
        client: Box<reqwest::ClientBuilder>,
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
            Client { client }
        }

        fn construct_request(m: Method, url: Url) -> reqwest::Request {
            Request::new(m, url)
        }

        async fn as_text(url: &str) -> String {
            reqwest::get(url).await.unwrap().text().await.unwrap()
        }

        pub async fn request_dev() -> Result<String, ()> {
            let body = Self::as_text("http://dev.to").await;
            Ok(body)
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
