// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KaizenToken is ERC20, Ownable {
    uint256 public constant TOTAL_SUPPLY = 1000000 * 10 ** 18;
    uint256 public constant USD_TO_KAIZEN_RATE = 1000;

    constructor() ERC20("Kaizen", "KZN") Ownable(msg.sender) {
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    function buyTokens() external payable {
        uint256 tokenAmount = (msg.value * USD_TO_KAIZEN_RATE) / (1 ether);
        require(
            tokenAmount <= balanceOf(owner()),
            "Not enough tokens available!"
        );
        _transfer(owner(), msg.sender, tokenAmount);
    }

    function sellTokens(uint256 tokenAmount) external {
        require(balanceOf(msg.sender) >= tokenAmount, "Not enough tokens!");
        uint256 ethAmount = (tokenAmount * 1 ether) / USD_TO_KAIZEN_RATE;
        require(address(this).balance >= ethAmount, "Not enough funds!");
        _transfer(msg.sender, owner(), tokenAmount);
        payable(msg.sender).transfer(ethAmount);
    }

    function withdrawEth() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
