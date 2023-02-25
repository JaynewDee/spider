#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod ffi;

use ffi::invoke_api::scrape_dev;
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![scrape_dev])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
