import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQueryClient } from "@tanstack/react-query";
import { FC, FormEvent, useState } from "react";
// Internal assets
import Copy from "@/assets/icons/copy.svg";
import ExternalLink from "@/assets/icons/external-link.svg";
import Placeholder1 from "@/assets/placeholders/bear-1.png";
// Internal utils
import { aptosClient } from "@/utils/aptosClient";
import { clampNumber } from "@/utils/clampNumber";
import { truncateAddress } from "@/utils/truncateAddress";
// Internal hooks
import { useGetCollectionData } from "@/hooks/useGetCollectionData";
import { useGetMaxSupply } from "@/hooks/useGetMaxSupply";
import { useGetMintFee } from "@/hooks/useGetMintFee";
import { useGetAccountBalance } from "@/hooks/useGetAccountBalance";
// Internal components
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Socials } from "@/pages/Mint/components/Socials";
// Internal constants
import { NETWORK } from "@/constants";
// Internal config
import { config } from "@/config";
// Internal enrty functions
import { mintNFT } from "@/entry-functions/mint_nft";

interface HeroSectionProps {}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const { data } = useGetCollectionData();
  const { data: mintFee = 0 } = useGetMintFee();
  const queryClient = useQueryClient();
  const { account, signAndSubmitTransaction } = useWallet();
  const { data: accountBalance } = useGetAccountBalance(account?.address);
  const [nftCount, setNftCount] = useState(1);

  const { collection, totalMinted = 0 } = data ?? {};

  const mintNft = async (e: FormEvent) => {
    e.preventDefault();
    if (!collection?.collection_id) return;
    if (!account) {
      toast({ variant: "destructive", title: "Error", description: "You must connect a wallet before minting" });
      return;
    }
    if (accountBalance !== undefined && accountBalance < mintFee) {
      toast({ variant: "destructive", title: "Error", description: "You do not have enough funds to mint" });
      return;
    }

    const response = await signAndSubmitTransaction(
      mintNFT({ collectionId: collection.collection_id, amount: nftCount }),
    );
    await aptosClient().waitForTransaction({ transactionHash: response.hash });
    queryClient.invalidateQueries();
    setNftCount(1);
  };

  return (
    <section className="hero-container flex flex-col md:flex-row gap-6 px-4 max-w-screen-xl mx-auto w-full">
      <Image
        src={collection?.cdn_asset_uris.cdn_image_uri ?? collection?.cdn_asset_uris.cdn_animation_uri ?? Placeholder1}
        rounded
        className="w-full md:basis-2/5 aspect-square object-cover self-center"
      />
      <div className="basis-3/5 flex flex-col gap-4">
        <h1 className="title-md">{collection?.collection_name ?? config.defaultCollection?.name}</h1>
        <Socials />
        <p className="body-sm">{collection?.description ?? config.defaultCollection?.description}</p>

        <Card>
          <CardContent
            fullPadding
            className="flex flex-col md:flex-row gap-4 md:justify-between items-start md:items-center flex-wrap"
          >
            <form onSubmit={mintNft} className="flex flex-col md:flex-row gap-4 w-full md:basis-1/4">
              <Input
                type="number"
                value={nftCount}
                onChange={(e) => setNftCount(parseInt(e.currentTarget.value, 10))}
                className="min-w-14"
              />
              <Button className="h-16 md:h-auto" type="submit">
                Mint
              </Button>
              {!!mintFee && (
                <span className="whitespace-nowrap text-secondary-text body-sm self-center">{mintFee} APT</span>
              )}
            </form>

            <MintedMeter totalMinted={totalMinted} />
          </CardContent>
        </Card>

        <div className="flex gap-x-2 items-center flex-wrap justify-between">
          <p className="whitespace-nowrap body-sm-semibold">Collection Address</p>

          <div className="flex gap-x-2">
            <AddressButton address={collection?.collection_id ?? ""} />
            <a
              className={buttonVariants({ variant: "link" })}
              target="_blank"
              href={`https://explorer.aptoslabs.com/account/${collection?.collection_id}?network=${NETWORK}`}
            >
              View on Explorer <Image src={ExternalLink} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const MintedMeter: FC<{ totalMinted: number }> = ({ totalMinted }) => {
  const { data: maxSupply = 0 } = useGetMaxSupply();

  return (
    <div className="flex flex-col gap-2 w-full md:basis-1/2">
      <p className="label-sm text-secondary-text">
        {clampNumber(totalMinted)} / {clampNumber(maxSupply)} Minted
      </p>
      <Progress value={(totalMinted / maxSupply) * 100} className="h-2" />
    </div>
  );
};

const AddressButton: FC<{ address: string }> = ({ address }) => {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    if (copied) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <Button onClick={onCopy} className="whitespace-nowrap flex gap-1 px-0 py-0" variant="link">
      {copied ? (
        "Copied!"
      ) : (
        <>
          {truncateAddress(address)}
          <Image src={Copy} className="dark:invert" />
        </>
      )}
    </Button>
  );
};
