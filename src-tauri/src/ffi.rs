pub mod invoke_api {
    use spider::requests::Client;

    #[tauri::command]
    pub async fn scrape_me() -> Result<String, ()> {
        let res = Client::request_mine().await?;
        println!("{:?}", res);
        Ok(res)
    }

    #[tauri::command]
    pub async fn scrape_google() -> Result<String, ()> {
        let res = Client::request_google().await?;
        println!("{:?}", res);
        Ok(res)
    }
}
