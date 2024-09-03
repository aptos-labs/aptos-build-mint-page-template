import { config } from "@/config";
import { getTokenVariances } from "@/view-functions/tokenVariances";
import { useQuery } from "@tanstack/react-query";

export function useGetMaxSupply(collection_id: string = config.collection_id) {
  return useQuery({
    queryKey: ["max-supply", collection_id],
    refetchInterval: 1000 * 30,
    queryFn: async () => {
      const tokenVariances = await getTokenVariances({ collectionId: collection_id });

      let maxSupply = 0;
      for (const token of tokenVariances) {
        // If token.supply is undefined, unlimited copies are available.
        // If one token has unlimited copies, then the max supply of the collection is infinite.
        if (token.supply === undefined) {
          maxSupply = Infinity;
          break;
        }
        maxSupply += token.supply;
      }

      return maxSupply;
    },
  });
}
