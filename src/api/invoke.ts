import { invoke } from "@tauri-apps/api/tauri";

type AsyncGet<T> = () => Promise<T>;

interface InvokeAPI {
  getDomains: AsyncGet<string>;
  getHackerSrcs: (numPages: number) => Promise<string[]>;
}

export const Invokers: InvokeAPI = {
  getDomains: async () => await invoke("get_domains"),
  getHackerSrcs: async (numPages) =>
    await invoke("get_hacker_srcs", { numPages })
};
