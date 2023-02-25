pub mod requests {

    pub async fn request_dev() -> Result<String, ()> {
        let body = reqwest::get("https://www.rust-lang.org")
            .await
            .unwrap()
            .text()
            .await
            .unwrap();
        Ok(body)
    }
}
