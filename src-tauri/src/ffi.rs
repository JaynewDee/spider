use spider::requests::request_dev;

pub mod invoke_api {
    use spider::requests::request_dev;

    #[tauri::command]
    pub async fn scrape_dev() -> Result<String, ()> {
        let res = request_dev().await?;
        println!("{:?}", res);
        Ok("Hello from Rust!".into())
    }
}
