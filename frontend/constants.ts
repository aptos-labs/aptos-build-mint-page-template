export const NETWORK = import.meta.env.VITE_APP_NETWORK ?? "testnet";
export const MODULE_ADDRESS =
  NETWORK === "testnet" ? "0xdc125359657ec85e751bb23a7d256507ad7ee2865375c266a89ab88e692140e4" : "TODO";
export const MODULE_NAME = "unmanaged_launchpad";
export const COLLECTION_ADDRESS = import.meta.env.VITE_COLLECTION_ADDRESS;
export const IS_DEV = Boolean(import.meta.env.DEV);
export const OCTA = 100000000;
