import { accountAPTBalance } from "@/view-functions/accountBalance";
import { useQuery } from "@tanstack/react-query";

export function useGetAccountBalance(accountAddress?: string) {
  return useQuery({
    queryKey: ["account-balance", accountAddress],
    refetchInterval: 1000 * 30,
    queryFn: async () => {
      if (!accountAddress) return;
      const accountBalance = await accountAPTBalance({ accountAddress });

      return accountBalance;
    },
    enabled: !!accountAddress,
  });
}
