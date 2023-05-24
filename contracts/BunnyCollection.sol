//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BunnyCollection is ERC721Enumerable, Ownable {
    using Strings for uint256;
    address private contractOwner;
    address private clientAddress = 0x24C97915Deb980eF086D0011BcfF1F5e9eC837Cc;
    // real wallet address = 0x127b44a8db238BAF4b3Da73ce05523bf93DE7346

    string baseURI =
        "https://ipfs.io/ipfs/QmQi2BKX2Zv8FSTr1GSLnYuGW71eKuD8ZZ9hBpmsJJCESF/metadata_";
    string public baseExtension = ".json";
    uint256 private _price = 0.1 ether; // Price in BNB
    uint256 public MAX_MINT = 5; // Max mint amount per wallet
    uint256 public MAX_SUPPLY = 200; // Maximum Supply

    constructor() ERC721("Bunny Inu NFT Collection", "BUN") {
        contractOwner = msg.sender;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory baseURI_) public onlyOwner {
        baseURI = baseURI_;
    }

    function mint(uint256 numberOfTokens) public payable {
        uint256 supply = totalSupply();
        require(
            numberOfTokens <= MAX_MINT,
            "You cannot mint more than 5 tokens at a time!"
        );
        require(supply + numberOfTokens <= MAX_SUPPLY, "Exceeds MAX_SUPPLY");
        require(
            msg.value >= _price * numberOfTokens,
            "Ether value sent is below the price"
        );

        for (uint256 i; i < numberOfTokens; i++) {
            _safeMint(msg.sender, supply + i);
        }

        (bool success, ) = clientAddress.call{value: msg.value}("");
        require(success);
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return
            bytes(baseURI).length > 0
                ? string(
                    abi.encodePacked(baseURI, tokenId.toString(), baseExtension)
                )
                : "";
    }
}
