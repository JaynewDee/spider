import { invoke } from "@tauri-apps/api/tauri";

type AsyncScrape<T> = () => Promise<T>;

interface InvokeAPI {
  scrapeDev: AsyncScrape<string>;
  scrapeMe: AsyncScrape<string>;
}

export const Invokers: InvokeAPI = {
  scrapeDev: async () => await invoke("scrape_dev"),
  scrapeMe: async () => await invoke("scrape_me")
};
