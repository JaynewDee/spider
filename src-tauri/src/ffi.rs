pub mod invoke_api {
    use spider::requests::Client;

    #[tauri::command]
    pub async fn scrape_me() -> Result<String, ()> {
        let client = Client::new();

        let res = Client::request_status(&client).await?;

        Ok(res)
    }

    #[tauri::command]
    pub async fn scrape_google() -> Result<String, ()> {
        let res = Client::request_google().await?;

        Ok(res)
    }
}
