export const NETWORK = import.meta.env.VITE_APP_NETWORK ?? "testnet";
export const MODULE_ADDRESS =
  NETWORK === "mainnet"
    ? "0x96c192a4e3c529f0f6b3567f1281676012ce65ba4bb0a9b20b46dec4e371cccd"
    : "0x220db6a4c15bb47c5b26f8bed9ca841ded18927c3f49fdd82d10b4b0daa70bd4";
export const MODULE_NAME = "unmanaged_launchpad";
export const COLLECTION_ADDRESS = import.meta.env.VITE_COLLECTION_ADDRESS;
export const IS_DEV = Boolean(import.meta.env.DEV);
export const OCTA = 100000000;
