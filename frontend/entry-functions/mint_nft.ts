import { MODULE_ADDRESS, MODULE_NAME } from "@/constants";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

export type MintNftArguments = {
  collectionId: string;
  amount: number;
};

export const mintNFT = (args: MintNftArguments): InputTransactionData => {
  const { collectionId, amount } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::mint`,
      typeArguments: [],
      functionArguments: [collectionId, amount],
    },
  };
};
