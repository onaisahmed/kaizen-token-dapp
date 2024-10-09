import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import contractData from "../contractData.json";

const CONTRACT_ADDRESS = contractData.address;
const CONTRACT_ABI = contractData.abi;

function KaizenTokenApp() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(0);
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");

  useEffect(() => {
    const init = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const ethersProvider = new ethers.BrowserProvider(provider);
        const signer = await ethersProvider?.getSigner();
        const tokenContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );
        setContract(tokenContract);

        const accounts = await provider?.request({ method: "eth_accounts" });
        if (accounts?.length > 0) {
          setAccount(accounts[0]);
          updateBalance(accounts[0], tokenContract);
        }

        provider.on("accountsChanged", (newAccounts) => {
          if (newAccounts?.length > 0) {
            setAccount(newAccounts[0]);
            updateBalance(newAccounts[0], tokenContract);
          } else {
            setAccount(null);
            setBalance(0);
          }
        });
      } else {
        alert("Please install MetaMask!");
      }
    };

    init();
  }, []);

  const updateBalance = async (address, contract) => {
    const balance = await contract?.balanceOf(address);
    setBalance(ethers.formatUnits(balance, 18));
  };

  const connectWallet = async () => {
    try {
      const provider = await detectEthereumProvider();
      if (provider) {
        const accounts = await provider?.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        updateBalance(accounts[0], contract);
      }
    } catch (error) {
      alert(`Failed to connect wallet`);
    }
  };

  const buyTokens = async () => {
    try {
      const tx = await contract?.buyTokens({
        value: ethers.parseEther(buyAmount),
      });
      await tx.wait();
      updateBalance(account, contract);
      setBuyAmount("");
    } catch (error) {
      alert(`Failed to buy tokens: ${error?.reason}`);
    }
  };

  const sellTokens = async () => {
    try {
      const tx = await contract?.sellTokens(ethers.parseUnits(sellAmount, 18));
      await tx.wait();
      updateBalance(account, contract);
      setSellAmount("");
    } catch (error) {
      console.log("error", error?.reason);
      alert(`Failed to sell tokens: ${error?.reason}`);
    }
  };

  return (
    <div className="mainDiv">
      <h1>Kaizen Token App</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected Account: {account}</p>
          <p>Token Balance: {balance} KZN</p>

          <div>
            <input
              type="number"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              placeholder="Amount of ETH to spend"
            />
            <button onClick={buyTokens}>Buy Tokens</button>
          </div>

          {balance > 0 && (
            <div>
              <input
                type="number"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
                placeholder="Amount of KZN to sell"
              />
              <button onClick={sellTokens}>Sell Tokens</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default KaizenTokenApp;
