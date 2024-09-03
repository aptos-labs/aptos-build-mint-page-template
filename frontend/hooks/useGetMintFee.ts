import { config } from "@/config";
import { getMintFee } from "@/view-functions/mintFee";
import { useQuery } from "@tanstack/react-query";

export function useGetMintFee(collection_id: string = config.collection_id) {
  return useQuery({
    queryKey: ["mint-fee", collection_id],
    refetchInterval: 1000 * 30,
    queryFn: async () => {
      const mintFee = await getMintFee({ collectionId: collection_id });

      if (mintFee === undefined) {
        throw new Error("Failed to fetch mint fee");
      }

      return mintFee;
    },
  });
}
