## Aptos Build Mint Page Template

This template provides a beautiful pre-made UI for an NFT minting page so that users can mint NFTs from a collection created in Aptos Build.

Once you add your collection's network and address to the `.env` file in this directory, you can deploy your mint page to the cloud hosting provider of your choice. We recommend hosting this page on Vercel if you do not already have a preferred hosting provider.

This template is based off of the Digital Asset template from `create-aptos-dapp`. You can read more about how to use the template [here](https://aptos.dev/create-aptos-dapp/templates/digital-asset)

## The Aptos Build Mint Page template provides 1 page:

- **Public Mint NFT Page** - A page for the public to mint NFTs.

### What tools the template uses?

- React framework
- Vite development tool
- shadcn/ui + tailwind for styling
- Aptos TS SDK
- Aptos Wallet Adapter

### What commands are available?

Some commands are built-in the template and can be ran as a npm script, for example:

- `npm run dev` - a command to run the mint page locally
- `npm run build` - a command to create a production build of the mint page
- `npm run deploy` - a command to deploy the dapp to Vercel
