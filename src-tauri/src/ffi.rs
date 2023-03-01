pub mod invoke_api {
    use spider::requests::Client;
    use spider::schedule::CustomSchedule;
    use tauri::InvokeError;

    #[tauri::command]
    pub async fn get_domains() -> Result<String, ()> {
        let client = Client::new();

        let res = Client::request_domain_status(&client).await?;

        Ok(res)
    }

    #[tauri::command]
    pub fn get_schedule() -> Result<String, InvokeError> {
        let mut schedule = CustomSchedule::default();
        schedule.set_standard().unwrap();
        Ok(schedule.send())
    }
}
