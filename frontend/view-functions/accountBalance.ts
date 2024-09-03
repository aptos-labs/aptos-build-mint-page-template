import { OCTA } from "@/constants";
import { aptosClient } from "@/utils/aptosClient";

export type AccountAPTBalanceArguments = {
  accountAddress: string;
};

export const accountAPTBalance = async ({ accountAddress }: AccountAPTBalanceArguments): Promise<number> => {
  const response = await aptosClient().view<[number]>({
    payload: {
      function: "0x1::coin::balance",
      typeArguments: ["0x1::aptos_coin::AptosCoin"],
      functionArguments: [accountAddress],
    },
  });

  return response[0] / OCTA;
};
