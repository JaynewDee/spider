pub mod invoke_api {
    use spider::crawl::{hacker_news, reddit};
    use spider::monitor::Client;
    use spider::schedule::CustomSchedule;
    use tauri::InvokeError;

    #[tauri::command]
    pub async fn get_domains() -> Result<String, ()> {
        let client = Client::new();

        let res = Client::request_domain_status(&client).await?;
        println!("{:?}", res);
        Ok(res)
    }

    #[tauri::command]
    pub async fn get_schedule() -> Result<String, InvokeError> {
        let mut schedule = CustomSchedule::default();
        schedule.set_standard().unwrap();
        Ok(schedule.send())
    }

    #[tauri::command]
    pub fn scrape_all() -> Result<(), InvokeError> {
        // call function that scrapes all specified targets

        Ok(())
    }

    #[tauri::command]
    pub async fn get_hacker_srcs(
        num_pages: usize,
        filter: String,
    ) -> Result<Vec<String>, InvokeError> {
        let srcs = hacker_news(num_pages, &filter).await;
        return srcs;
    }

    #[tauri::command]
    pub async fn get_reddit_srcs() -> Result<Vec<String>, InvokeError> {
        let srcs = reddit().await;
        return srcs;
    }

    #[tauri::command]
    pub async fn get_dev_srcs() -> Result<Vec<String>, InvokeError> {
        return Ok(vec!["Hello!".to_string()]);
    }
}
