# KaizenToken

KaizenToken is an ERC-20 token implementation using Solidity. This project demonstrates a token with buy and sell functionality, including direct token purchases with Ether, token sales back to the contract, and owner-only Ether withdrawal. It leverages OpenZeppelin's ERC20 and Ownable libraries for secure and standardized token management. Features include a fixed exchange rate of 1000 KZN per ETH, pre-minted total supply allocated to the owner, and built-in liquidity for token sales.

## Project Structure

The project follows a structured layout for better organization:

- **kaizen-token/**
  - **contracts/** _(Contains the Solidity smart contracts)_
    - `KaizenToken.sol` _(The main KaizenToken ERC-20 contract)_
  - **scripts/** _(Contains the deployment scripts)_
    - `deploy.js` _(Deploys the KaizenToken contract to the blockchain)_
  - **test/** _(Contains the test cases for the contract)_
    - `KaizenToken.test.js` _(Unit tests for the KaizenToken contract)_
  - **hardhat.config.js** _(Hardhat configuration file)_

## Features

- **Buy Tokens**: Allows users to purchase tokens using Ether.
- **Sell Tokens**: Users can sell their tokens back to the contract in exchange for Ether.
- **Withdraw Ether**: The contract owner can withdraw Ether from the contract balance.
- **ERC-20 Standard**: Follows the ERC-20 token standard, including functions like `transfer`, `balanceOf`, and more.
- **OpenZeppelin Libraries**: Utilizes the well-audited OpenZeppelin ERC20 and Ownable libraries.

## Getting Started

### Prerequisites

- Node.js (Recommended version: 18.x)
- Hardhat
- Metamask (for interacting with the deployed contract)
- Ethereum test network (like localhost or Ropsten)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/onaisahmed/kaizen-token.git
   cd kaizen-token
   ```

2. **Install the dependencies**:

   ```bash
   npm install
   ```

### Compiling the Contract

1. Run the following command to compile the Solidity contract:

   ```bash
   npx hardhat compile
   ```

### Deploying the Contract

1. To deploy the contract to a local blockchain, run the Hardhat node:

   ```bash
   npx hardhat node
   ```

2. Deploy the KaizenToken contract to the local network:

   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

   The contract address will be printed in the console after deployment.

### Interacting with the Contract

You can interact with the KaizenToken contract using the Hardhat console or via scripts. Some key functions include:

- **Buy Tokens**:

  ```js
  await kaizenToken.buyTokens({ value: ethers.utils.parseEther("1") });
  ```

- **Sell Tokens**:

  ```js
  await kaizenToken.sellTokens(tokenAmount);
  ```

- **Withdraw Ether**:

  ```js
  await kaizenToken.withdrawEth();
  ```

### Testing the Contract

1. Write test cases in the `test/KaizenToken.test.js` file.
2. Run the test cases using Hardhat:

   ```bash
   npx hardhat test
   ```
