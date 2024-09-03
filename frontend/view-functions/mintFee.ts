import { MODULE_ADDRESS, MODULE_NAME, OCTA } from "@/constants";
import { aptosClient } from "@/utils/aptosClient";

export interface MintFeeArguments {
  collectionId: string;
}

export const getMintFee = async ({ collectionId }: MintFeeArguments) => {
  const response = await aptosClient().view<[{ vec: Array<string> }]>({
    payload: {
      function: `${MODULE_ADDRESS}::${MODULE_NAME}::mint_fee`,
      typeArguments: [],
      functionArguments: [collectionId],
    },
  });

  const responseValue = response[0].vec[0];

  const mintFee = responseValue !== undefined ? Number.parseInt(responseValue) / OCTA : undefined;

  return mintFee;
};
