#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

extern crate reqwest;

mod ffi;

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

use ffi::invoke_api::{
    get_dev_srcs, get_domains, get_hacker_srcs, get_reddit_srcs, get_schedule, scrape_all,
};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_domains,
            get_schedule,
            scrape_all,
            get_hacker_srcs,
            get_reddit_srcs,
            get_dev_srcs
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
