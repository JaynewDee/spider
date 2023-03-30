#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

extern crate reqwest;

mod ffi;

use ffi::invoke_api::{get_domains, get_schedule, scrape_all};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_domains,
            get_schedule,
            scrape_all
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
