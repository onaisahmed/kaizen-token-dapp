# KaizenToken

KaizenToken is an ERC-20 token implementation using Solidity, featuring a React frontend for easy interaction. This project demonstrates a token with buy and sell functionality, including direct token purchases with Ether, token sales back to the contract, and owner-only Ether withdrawal. It leverages OpenZeppelin's ERC20 and Ownable libraries for secure and standardized token management. Features include a fixed exchange rate of 1000 KZN per ETH, pre-minted total supply allocated to the owner, and built-in liquidity for token sales.

## Project Structure

The project follows a structured layout for better organization:

- **kaizen-token/**
  - **contracts/** _(Contains the Solidity smart contracts)_
    - `KaizenToken.sol` _(The main KaizenToken ERC-20 contract)_
  - **scripts/** _(Contains the deployment scripts)_
    - `deploy.js` _(Deploys the KaizenToken contract to the blockchain)_
  - **test/** _(Contains the test cases for the contract)_
    - `KaizenToken.test.js` _(Unit tests for the KaizenToken contract)_
  - **frontend/** _(Contains the React frontend application)_
    - `src/` _(Source files for the React app)_
    - `public/` _(Public assets for the React app)_
    - `package.json` _(Frontend dependencies and scripts)_
  - **hardhat.config.js** _(Hardhat configuration file)_
  - **package.json** _(Project dependencies and scripts)_

## Features

- **Buy Tokens**: Allows users to purchase tokens using Ether.
- **Sell Tokens**: Users can sell their tokens back to the contract in exchange for Ether.
- **Withdraw Ether**: The contract owner can withdraw Ether from the contract balance.
- **ERC-20 Standard**: Follows the ERC-20 token standard, including functions like `transfer`, `balanceOf`, and more.
- **OpenZeppelin Libraries**: Utilizes the well-audited OpenZeppelin ERC20 and Ownable libraries.
- **React Frontend**: User-friendly interface for interacting with the smart contract.

## Getting Started

### Prerequisites

- Node.js (Recommended version: 18.x)
- Hardhat
- Metamask (for interacting with the deployed contract)
- Ethereum test network (like localhost or Ropsten)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/onaisahmed/kaizen-token-dapp.git
   cd kaizen-token
   ```

2. **Install the dependencies**:

   ```bash
   npm install
   ```

### Compiling and Running the Project

To compile the smart contract, start the local blockchain, deploy the contract, and run the frontend, use the following command:

```bash
npm run dev
```

This command will:

1. Compile the Solidity contract
2. Start a local Hardhat node
3. Deploy the KaizenToken contract to the local network
4. Start the React frontend application

The frontend will be available at `http://localhost:3000` (or another port if 3000 is occupied).

### Testing the Contract

1. Write test cases in the `test/KaizenToken.test.js` file.
2. Run the test cases using Hardhat:

   ```bash
   npx hardhat test
   ```
