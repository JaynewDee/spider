#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

extern crate reqwest;

mod ffi;

use ffi::invoke_api::{scrape_dev, scrape_google, scrape_me};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            scrape_dev,
            scrape_me,
            scrape_google
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
