Information about project (even secret keys) are in notion page: https://www.notion.so/michael-dls/Demo-Prototype-Mint-Blockchain-2a8c6bd522dd80089268cdf5ae377f90 

----
# Below here are my UPDATES:

# Nov 16

```bash
# Update this after every npm install

earthly@earthly ~/Documents/TestFolder/blockchain-certificate-website
 % npm list
blockchain-certificate-website@0.1.0 /home/earthly/Documents/TestFolder/blockchain-certificate-website
├── @emnapi/core@1.7.1 extraneous
├── @emnapi/runtime@1.7.1 extraneous
├── @emnapi/wasi-threads@1.1.0 extraneous
├── @napi-rs/wasm-runtime@0.2.12 extraneous
├── @tailwindcss/postcss@4.1.17
├── @tybys/wasm-util@0.10.1 extraneous
├── @types/node@20.19.25
├── @types/react-dom@19.2.3
├── @types/react@19.2.5
├── babel-plugin-react-compiler@1.0.0
├── eslint-config-next@16.0.3
├── eslint@9.39.1
├── ethers@6.15.0
├── next@16.0.3
├── react-dom@19.2.0
├── react@19.2.0
├── tailwindcss@4.1.17
├── thirdweb@5.112.1
└── typescript@5.9.3
```
Updated on: 9:34 PM
(3) Time.

> Trying to understand why there's extraneous warning here.
> Claude said it's because the files in the node_modules is not present in the package.json file (the project's package's dependency list).
> 

505 pm

Note: npm list -g
This lists all the packages I downloaded in npm - Globally.

Note: npm list
This lists all the packages I downloaded in npm - In current directory.

Drawio Link : https://drive.google.com/file/d/1ALTDuJkygCYqGmNu0d_-lCPD7b_IcZu9/view?usp=sharing

## Installed Thirdweb #install
```
npm i thirdweb
```


## Installed Ethers #install
```
npm install ethers
```

Proof:
```bash
earthly@earthly ~/Documents/TestFolder/blockchain-certificate-website
 % npm install ethers
npm warn ERESOLVE overriding peer dependency
npm warn While resolving: use-sync-external-store@1.2.0
npm warn Found: react@19.2.0
npm warn node_modules/react
npm warn   peer react@">=16.8.0" from @emotion/react@11.14.0
npm warn   node_modules/@emotion/react
npm warn     peer @emotion/react@"^11.0.0-rc.0" from @emotion/styled@11.14.1
npm warn     node_modules/@emotion/styled
npm warn     1 more (thirdweb)
npm warn   44 more (@emotion/styled, ...)
npm warn
npm warn Could not resolve dependency:
npm warn peer react@"^16.8.0 || ^17.0.0 || ^18.0.0" from use-sync-external-store@1.2.0
npm warn node_modules/valtio/node_modules/use-sync-external-store
npm warn   use-sync-external-store@"1.2.0" from valtio@1.13.2
npm warn   node_modules/valtio
npm warn
npm warn Conflicting peer dependency: react@18.3.1
npm warn node_modules/react
npm warn   peer react@"^16.8.0 || ^17.0.0 || ^18.0.0" from use-sync-external-store@1.2.0
npm warn   node_modules/valtio/node_modules/use-sync-external-store
npm warn     use-sync-external-store@"1.2.0" from valtio@1.13.2
npm warn     node_modules/valtio

added 9 packages, and audited 1051 packages in 25s

252 packages are looking for funding
  run `npm fund` for details

20 low severity vulnerabilities

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```

# Nov 17

5:23 PM

solved the next.config.ts
solved the vercel problem at @8HxTMA9TJ in [[next.config.ts]]

7:09 PM

I learned how AutoConnect works from [[ClientDisplay.tsx]]

Q: How do you even fix the button hydration issue?
A: ????


7:30
```
npx thirdweb create contract
```
I made a contract

proof:
```bash
earthly@earthly ~/Documents/TestFolder/blockchain-certificate-website
 % npx thirdweb create contract

    $$\     $$\       $$\                 $$\                         $$\       
    $$ |    $$ |      \__|                $$ |                        $$ |      
  $$$$$$\   $$$$$$$\  $$\  $$$$$$\   $$$$$$$ |$$\  $$\  $$\  $$$$$$\  $$$$$$$\  
  \_$$  _|  $$  __$$\ $$ |$$  __$$\ $$  __$$ |$$ | $$ | $$ |$$  __$$\ $$  __$$\ 
    $$ |    $$ |  $$ |$$ |$$ |  \__|$$ /  $$ |$$ | $$ | $$ |$$$$$$$$ |$$ |  $$ |
    $$ |$$\ $$ |  $$ |$$ |$$ |      $$ |  $$ |$$ | $$ | $$ |$$   ____|$$ |  $$ |
    \$$$$  |$$ |  $$ |$$ |$$ |      \$$$$$$$ |\$$$$$\$$$$  |\$$$$$$$\ $$$$$$$  |
     \____/ \__|  \__|\__|\__|       \_______| \_____\____/  \_______|\_______/ 

 💎 thirdweb v0.14.12 💎

✔ What is your project named? … thirdweb-contract-test-1
✔ What framework do you want to use? › Hardhat
✔ What will be the name of your new smart contract? … contractOne
✔ What type of contract do you want to start from? › ERC721
✔ What extensions do you want to add to your contract? › Lazy Mint
Creating a new thirdweb contracts project in /home/earthly/Documents/TestFolder/blockchain-certificate-website/thirdweb-contract-test-1.

Downloading files. This might take a moment.
Installing packages. This might take a couple of minutes.

Downloading solc@0.8.26: 6.34 MB/6.34 MB, done
Packages are hard linked from the content-addressable store to the virtual store.
  Content-addressable store is at: /home/earthly/.local/share/pnpm/store/v10
  Virtual store is at:             node_modules/.pnpm
Downloading @nomicfoundation/edr-darwin-arm64@0.12.0-next.15: 10.16 MB/10.16 MB, done
Downloading @nomicfoundation/edr-linux-x64-gnu@0.12.0-next.15: 14.46 MB/14.46 MB, done
Downloading @nomicfoundation/edr-linux-x64-musl@0.12.0-next.15: 14.48 MB/14.48 MB, done
Downloading @nomicfoundation/edr-darwin-x64@0.12.0-next.15: 10.97 MB/10.97 MB, done
Downloading @nomicfoundation/edr-win32-x64-msvc@0.12.0-next.15: 10.68 MB/10.68 MB, done
Downloading @nomicfoundation/edr-linux-arm64-musl@0.12.0-next.15: 14.41 MB/14.41 MB, done
Downloading @nomicfoundation/edr-linux-arm64-gnu@0.12.0-next.15: 14.43 MB/14.43 MB, done
 WARN  2 deprecated subdependencies found: glob@8.1.0, inflight@1.0.6
Packages: +486
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 487, reused 162, downloaded 324, added 486, done

dependencies:
+ @thirdweb-dev/contracts 3.15.0
+ zksync-ethers 5.11.0 (6.21.0 is available)

devDependencies:
+ @matterlabs/hardhat-zksync-solc 1.5.1
+ @matterlabs/hardhat-zksync-verify 1.9.1
+ hardhat 2.27.0 (3.0.15 is available)

╭ Warning ───────────────────────────────────────────────────────────────────────────────────╮
│                                                                                            │
│   Ignored build scripts: cpu-features, keccak, protobufjs, ssh2.                           │
│   Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.   │
│                                                                                            │
╰────────────────────────────────────────────────────────────────────────────────────────────╯

Done in 22.8s using pnpm v10.22.0

Success! Created thirdweb-contract-test-1 at /home/earthly/Documents/TestFolder/blockchain-certificate-website/thirdweb-contract-test-1

Inside that directory, you can run several commands:

  pnpm run build
    Compiles your contracts and detects thirdweb extensions implemented on them.

  pnpm run deploy
    Deploys your contracts with the thirdweb deploy flow.

  pnpm run publish
    Publishes your contracts with the thirdweb publish flow.

We suggest that you begin by typing:

  cd thirdweb-contract-test-1
```
Now there's this new folder called [[thirdweb-contract-test-1]]


I will try the code:
```bash
earthly@earthly ~/Documents/TestFolder/blockchain-certificate-website/thirdweb-contract-test-1
 % pnpm run build            

> hardhat-javascript-starter@ build /home/earthly/Documents/TestFolder/blockchain-certificate-website/thirdweb-contract-test-1
> npx thirdweb@latest detect

Need to install the following packages:
thirdweb@5.112.1
Ok to proceed? (y) 

npm warn ERESOLVE overriding peer dependency
npm warn deprecated @hey-api/client-fetch@0.10.0: Starting with v0.73.0, this package is bundled directly inside @hey-api/openapi-ts.
npm warn deprecated @paulmillr/qr@0.2.1: The package is now available as "qr": npm install qr
npm warn deprecated @walletconnect/sign-client@2.21.0: Reliability and performance improvements. See: https://github.com/WalletConnect/walletconnect-monorepo/releases
npm warn deprecated @walletconnect/sign-client@2.21.0: Reliability and performance improvements. See: https://github.com/WalletConnect/walletconnect-monorepo/releases
npm warn deprecated @walletconnect/sign-client@2.21.0: Reliability and performance improvements. See: https://github.com/WalletConnect/walletconnect-monorepo/releases
npm warn deprecated @walletconnect/sign-client@2.21.1: Reliability and performance improvements. See: https://github.com/WalletConnect/walletconnect-monorepo/releases
npm warn deprecated @walletconnect/universal-provider@2.21.0: Reliability and performance improvements. See: https://github.com/WalletConnect/walletconnect-monorepo/releases
npm warn deprecated @walletconnect/universal-provider@2.21.0: Reliability and performance improvements. See: https://github.com/WalletConnect/walletconnect-monorepo/releases
npm warn deprecated @walletconnect/universal-provider@2.21.0: Reliability and performance improvements. See: https://github.com/WalletConnect/walletconnect-monorepo/releases
npm warn deprecated @walletconnect/universal-provider@2.21.1: Reliability and performance improvements. See: https://github.com/WalletConnect/walletconnect-monorepo/releases
npm warn deprecated @walletconnect/sign-client@2.21.8: Reliability and performance improvements. See: https://github.com/WalletConnect/walletconnect-monorepo/releases
npm warn deprecated @walletconnect/universal-provider@2.21.8: Reliability and performance improvements. See: https://github.com/WalletConnect/walletconnect-monorepo/releases
npm warn deprecated @walletconnect/ethereum-provider@2.21.1: Reliability and performance improvements. See: https://github.com/WalletConnect/walletconnect-monorepo/releases

    $$\     $$\       $$\                 $$\                         $$\       
    $$ |    $$ |      \__|                $$ |                        $$ |      
  $$$$$$\   $$$$$$$\  $$\  $$$$$$\   $$$$$$$ |$$\  $$\  $$\  $$$$$$\  $$$$$$$\  
  \_$$  _|  $$  __$$\ $$ |$$  __$$\ $$  __$$ |$$ | $$ | $$ |$$  __$$\ $$  __$$\ 
    $$ |    $$ |  $$ |$$ |$$ |  \__|$$ /  $$ |$$ | $$ | $$ |$$$$$$$$ |$$ |  $$ |
    $$ |$$\ $$ |  $$ |$$ |$$ |      $$ |  $$ |$$ | $$ | $$ |$$   ____|$$ |  $$ |
    \$$$$  |$$ |  $$ |$$ |$$ |      \$$$$$$$ |\$$$$$\$$$$  |\$$$$$$$\ $$$$$$$  |
     \____/ \__|  \__|\__|\__|       \_______| \_____\____/  \_______|\_______/ 

 💎 thirdweb v0.14.12 💎

Detected package manager: pnpm
Detected library: none
Detected language: javascript
Detected framework: hardhat
Detected app type: contract
✔ Compilation successful


🔎 Detected extension on contractOne
✔️ ERC721
✔️ ERC721Burnable
✔️ ERC721Supply
✔️ ERC721LazyMintable
✔️ ERC721ClaimCustom
✔️ Royalty
✔️ ContractMetadata
✔️ Ownable
✔️ Fallback

ℹ Suggested extensions
- ERC721Enumerable - https://portal.thirdweb.com/interfaces/erc721enumerable
- ERC721AQueryable - https://portal.thirdweb.com/interfaces/erc721aqueryable
- ERC721Mintable - https://portal.thirdweb.com/interfaces/erc721mintable
- ERC721Revealable - https://portal.thirdweb.com/interfaces/erc721revealable
- ERC721SignatureMintV1 - https://portal.thirdweb.com/interfaces/erc721signaturemintv1
- ERC721SignatureMintV2 - https://portal.thirdweb.com/interfaces/erc721signaturemintv2
- ERC721TieredDrop - https://portal.thirdweb.com/interfaces/erc721tiereddrop
- ERC721ClaimZora - https://portal.thirdweb.com/interfaces/erc721claimzora
- ERC721ClaimConditionsV1 - https://portal.thirdweb.com/interfaces/erc721claimconditionsv1
- ERC721ClaimConditionsV2 - https://portal.thirdweb.com/interfaces/erc721claimconditionsv2
- ERC721ClaimPhasesV1 - https://portal.thirdweb.com/interfaces/erc721claimphasesv1
- ERC721ClaimPhasesV2 - https://portal.thirdweb.com/interfaces/erc721claimphasesv2
- ERC721SharedMetadata - https://portal.thirdweb.com/interfaces/erc721sharedmetadata
- ERC721LoyaltyCard - https://portal.thirdweb.com/interfaces/erc721loyaltycard
- ERC721UpdatableMetadata - https://portal.thirdweb.com/interfaces/erc721updatablemetadata
- Permissions - https://portal.thirdweb.com/interfaces/permissions

ℹ Once you're done writing your contracts, you can run the following command to deploy them:

     pnpm run deploy

```
this is after I run pnpm run build.


## Figuring out how to do testing on a smart contract


ImDead - some user account I made.

9:34 PM

Updating the npm list.

