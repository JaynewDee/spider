import { invoke } from "@tauri-apps/api/tauri";

export const Invokers = {
  scrapeDev: async (): Promise<String> => await invoke("scrape_dev")
};
