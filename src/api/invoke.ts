import { invoke } from "@tauri-apps/api/tauri";

type AsyncGet<T> = () => Promise<T>;

interface InvokeAPI {
  getDomains: AsyncGet<string>;
  getHackerSrcs: (numPages: number, filter: string) => Promise<string[]>;
  getRedditSrcs: () => Promise<string[]>;
  getDevSrcs: () => Promise<string[]>;
  storeCrawlResult: (item: any, category: string) => Promise<any>;
}

export const Invokers: InvokeAPI = {
  getDomains: async () => await invoke("get_domains"),
  getHackerSrcs: async (numPages, filter) =>
    await invoke("get_hacker_srcs", { numPages, filter }),
  getRedditSrcs: async () => await invoke("get_reddit_srcs"),
  getDevSrcs: async () => await invoke("get_dev_srcs"),
  storeCrawlResult: async (item, category = "general") =>
    await invoke("store_crawl_result")
};
