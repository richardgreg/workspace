# Smart Contract Emissions Dashboard

[https://emissions-dashboard.popcorn.network/](https://emissions-dashboard.popcorn.network/)

View historic transaction volume and CO2 emissions for Ethereum smart contracts.

The dashboard is currently set up to display data for the following contracts:

- [POP](https://etherscan.io/address/0xd0cd466b34a24fcb2f87676278af2005ca8a78c4)
- [yvCurve-USDN](https://etherscan.io/address/0x3b96d491f067912d18563d56858ba7d6ec67a6fa)
- [yvCurve-DUSD](https://etherscan.io/address/0x30fcf7c6cdfc46ec237783d94fc78553e79d4e9c)
- [yvCurve-FRAX](https://etherscan.io/address/0xb4ada607b9d6b2c9ee07a275e9616b84ac560139)
- [yvCurve-UST](https://etherscan.io/address/0x1c6a9783f812b3af3abbf7de64c3cd7cc7d1af44)

Note - The ability for users to edit the contract list is a work in progress.

## How it works

Currently, the dashboard has two main data sources

1. CO2 emission estimates from [patch.io](https://docs.patch.io/#/estimates?id=ethereum).
2. Historical txns sources from [etherscan.io](etherscan.io).

The process of adding estimates to transactions is as follows.

- First, estimates are sourced from Patch.
- Transactions are then sourced from Etherscan.
- The CO2 emissions are calculated by applying the nearest estimate (as estimates are sourced daily) to the gas used.

## Requirements

To run the project you need:

- Node.js 14.15.1 development environment.
- Local env variables for Patch API, Etherscan API, Infura and Database connection string URL (currently limited to MongoDB).

## Technology Used

- [Next.js](https://nextjs.org/)
- [Netlify](https://www.netlify.com/)
- [Lerna](https://lerna.js.org)
- [Yarn](https://yarnpkg.com)
- [Storybook](https://storybook.js.org/)
- [Patch](https://www.patch.io/)
- [MongoDB](https://www.mongodb.com/)
- [Etherscan](https://etherscan.io/)
- [Infura](https://infura.io/)

## Directory structure

```
packages
├── emissions-dashboard   @popcorn/emissions-dashboard   [next.js netlify]
├── ui                    [@popcorn/ui]                  [ui components + storybook]
└── ... etc
```

## Prerequisites

Install packages: `yarn install`

## Getting started with Development

At the moment, it's not possible to bootstrap the project. We are developing an initialisation script to make this possible.

<!-- 1. Copy `.env.example` to `.env` and update it with DB URL connection string, Infura API, Patch, Etherscan API endpoints.

2. Run `yarn run emissions-db:start` to start the Next.js app and connect it to a local Netlify instance. -->

## Default Service Locations

| Service          | Location                    |
| ---------------- | --------------------------- |
| Next.js Frontend | http://localhost:8888       |
| Storybook        | run: `yarn lerna run story` |

## Contributing

Contributions are welcome! Please raise a pull request with your contributions.

Popcorn follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/1/4/code-of-conduct).
