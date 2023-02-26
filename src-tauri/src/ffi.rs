pub mod invoke_api {
    use spider::requests::Client;
    use spider::schedule::CustomSchedule;

    #[tauri::command]
    pub async fn scrape_me() -> Result<String, ()> {
        let mut schedule = CustomSchedule::default();
        schedule.set_standard();
        schedule.print_schedule();

        let client = Client::new();

        let res = Client::request_domain_status(&client).await?;

        Ok(res)
    }

    #[tauri::command]
    pub async fn scrape_google() -> Result<String, ()> {
        let res = Client::request_google().await?;

        Ok(res)
    }
}
