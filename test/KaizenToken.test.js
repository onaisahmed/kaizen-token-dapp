const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("KaizenToken", function () {
  let KaizenTokenContract;
  let kaizenToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    KaizenTokenContract = await ethers.getContractFactory("KaizenToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    kaizenToken = await KaizenTokenContract.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await kaizenToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await kaizenToken.balanceOf(owner.address);
      expect(await kaizenToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Token Purchase", function () {
    it("Should allow users to buy tokens", async function () {
      await kaizenToken
        .connect(addr1)
        .buyTokens({ value: ethers.parseEther("1") });

      const addr1Balance = await kaizenToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal("1000000000000000000000");
    });

    it("Should fail when trying to buy more tokens than available", async function () {
      await expect(
        kaizenToken
          .connect(addr1)
          .buyTokens({ value: ethers.parseEther("1001") })
      ).to.be.revertedWith("Not enough tokens available!");
    });
  });

  describe("Token Sale", function () {
    beforeEach(async function () {
      await kaizenToken
        .connect(addr1)
        .buyTokens({ value: ethers.parseEther("1") });
    });

    it("Should allow users to sell tokens", async function () {
      const initialBalance = await ethers.provider.getBalance(
        await addr1.getAddress()
      );

      await kaizenToken.connect(addr1).sellTokens(ethers.parseEther("500"));

      const addr1TokenBalance = await kaizenToken.balanceOf(
        await addr1.getAddress()
      );
      expect(addr1TokenBalance).to.equal(ethers.parseEther("500"));

      const finalBalance = await ethers.provider.getBalance(
        await addr1.getAddress()
      );
      expect(finalBalance - initialBalance).to.be.closeTo(
        ethers.parseEther("0.5"),
        ethers.parseEther("0.01") // Allow for gas costs
      );
    });

    it("Should fail when trying to sell more tokens than owned", async function () {
      await expect(
        kaizenToken.connect(addr1).sellTokens(ethers.parseEther("1001"))
      ).to.be.revertedWith("Not enough tokens!");
    });
  });

  describe("ETH Withdrawal", function () {
    beforeEach(async function () {
      await kaizenToken
        .connect(addr1)
        .buyTokens({ value: ethers.parseEther("1") });
    });

    it("Should allow only the owner to withdraw ETH", async function () {
      const initialBalance = await ethers.provider.getBalance(
        await owner.getAddress()
      );

      await kaizenToken.connect(owner).withdrawEth();

      const finalBalance = await ethers.provider.getBalance(
        await owner.getAddress()
      );
      expect(finalBalance - initialBalance).to.be.closeTo(
        ethers.parseEther("1"),
        ethers.parseEther("0.01") // Allow for gas costs
      );
    });

    it("Should fail when non-owner tries to withdraw ETH", async function () {
      await expect(
        kaizenToken.connect(addr1).withdrawEth()
      ).to.be.revertedWithCustomError(
        kaizenToken,
        "OwnableUnauthorizedAccount"
      );
    });
  });
});
