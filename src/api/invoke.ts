import { invoke } from "@tauri-apps/api/tauri";

type AsyncGet<T> = () => Promise<T>;

interface InvokeAPI {
  getDomains: AsyncGet<string>;
}

export const Invokers: InvokeAPI = {
  getDomains: async () => await invoke("get_domains")
};
