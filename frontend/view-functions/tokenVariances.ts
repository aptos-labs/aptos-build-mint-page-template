import { MODULE_ADDRESS, MODULE_NAME } from "@/constants";
import { aptosClient } from "@/utils/aptosClient";

export interface TokenVariancesArguments {
  collectionId: string;
}

interface RawTokenVariance {
  name: string;
  description: string;
  uri: string;
  property_keys: Array<string>;
  property_types: Array<string>;
  property_values: Array<Uint8Array>;
  minted_token_count: string;
  supply: { vec: Array<string> };
}

export interface TokenVariance {
  name: string;
  description: string;
  uri: string;
  propertyKeys: Array<string>;
  propertyTypes: Array<string>;
  propertyValues: Array<Uint8Array>;
  mintedTokenCount: number;
  supply?: number;
}

export const getTokenVariances = async ({ collectionId }: TokenVariancesArguments) => {
  const response = (
    await aptosClient().view<[RawTokenVariance[]]>({
      payload: {
        function: `${MODULE_ADDRESS}::${MODULE_NAME}::tokens`,
        typeArguments: [],
        functionArguments: [collectionId],
      },
    })
  )[0];

  const tokenVariances: Array<TokenVariance> = response.map((token) => {
    let supply: number | undefined;
    const maybeSupply = token.supply.vec[0] !== undefined ? Number.parseInt(token.supply.vec[0]) : undefined;
    if (maybeSupply !== undefined && !Number.isNaN(maybeSupply)) {
      supply = maybeSupply;
    }

    return {
      name: token.name,
      description: token.description,
      uri: token.uri,
      propertyKeys: token.property_keys,
      propertyTypes: token.property_types,
      propertyValues: token.property_values,
      mintedTokenCount: Number.parseInt(token.minted_token_count),
      supply,
    };
  });

  return tokenVariances;
};
