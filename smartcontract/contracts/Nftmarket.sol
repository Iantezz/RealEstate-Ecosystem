//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Nftmarket is ERC721URIStorage,Ownable{
    using Counters for Counters.Counter;

    struct NftItem {
    uint256 tokenid;
    address creator;
    uint256 price;
    bool is listed;
    }


uint public listingprice = 0.005 ether;
Counters.Counter private _listedItems;
Counters.Counter private _tokenIds;

mapping(strind => bool) private _usedTokenURIs;
mapping(uint => NftItem) private _idToNftItem;
mapping(address =>mapping(uint =>uint))private _ownedTokens;
mapping(uint => uint)private _idToOwnedIndex;

uint256[] private _allNft;
mapping(uint =>uint) private _idToNftIndex;

event NftItemCreated(
    uint indexed  tokenid,
    address indexed creator ,
    uint price,
    bool islisted
    );

    constructor() ERC721("real_estate", "RENFT") {}
    //[] _Todo: set listing price
    //[] _Todo: get Nft item
    //[] _Todo: count of listed items
    //[] _Todo:check token url if exists
    //[] _Todo: total supply
    //[] _Todo: token by index
    //[] _Todo: token of a specific owner
    //[] _Todo: get all Nfts on sale
    //[] _Todo: get all Nfts of a specific owner
    //[] _Todo: mint Nfts function
    //[] _Todo: buy Nft function
    //[] _Todo: place Nfts on sale
    //[] _Todo: remove Nfts from sale
    //[] _Todo: transfer Nfts
    //[] _Todo: create Nft item

    function tokenURIExists(string memory tokenURI) public view returns (bool) {
        return _usedTokenURIs[tokenURI] == true;

    }

    function tokenOfOwnerByIndex( ) public returns  (uint) {
        
    }
    function getOwnedNfts() public view returns (NftItems[] memory) {
        uint totalNftsOwned = ERC721.balanceOf(msg.sender);
        NftItem[] memory items = new NftItem[](totalNftsOwned);
        
        for(uint i = 0; i < totalNftsOwned; i++) {
            uint tokenId = ERC721.tokenOfOwnerByIndex(msg.sender, i);
            NftItem storage
            items[i] = ;
        }
        return items;
    }

    function mintToken(string memory tokenURI, uint _price) public payable returns (uint) {
        require(!tokenURIExists(tokenURI), "Token url already exists");
        require(msg.value == listingPrice, "Price must be equal to listing");

        _tokenIds.increment();
        _listedItems.increment();

        uint newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId,_tokenURI);
        _createNftItem(newTokenId, _price);
        _usedTokenURIs[tokenURI] = true;

        return newTokenId;
    }

    function buyNft (uint _tokenId) public payable {
        uint price = _idToNftItem[_tokenId].price;
        address owner = ERC721.ownerOf(_tokenId);

        require(msg.sender !=owner, "You already own this Nft");
        require(msg.value == price, "Price must be equal to listing");

        _idToNftItem[_tokenId].islisted = false;
        _idToNftItems.decrement();

        _transfer(owner,msg.sender, _tokenId);
        payable(owner).transfer(msg.value);
    }

    function placeNftOnSale(uint _tokenId, uint _newPrice) public payable {
        require(ERC721.ownerOf(_tokenId) ==msg.sender, "You are not owner of this nft");
        require(_idToNftItem[_tokenId].islisted == false, "Item is already on sale");
        require(msg.value == listingPrice, "Price must be equal to listing");

        _idToNftItem[_tokenId].isListed = true;
        _idToNftItem[_tokenId].price = _newPrice;
        _idToNftItems.increment();
    }


    function _createNftItem(uint _tokenId, uint _price) private{
        require(price > 0, "price must be at least 1 wei");
        _idToNftItem[_tokenId] = NftItem(
            _tokenId,
            msg.sender,
            _price,
            true
        );

    }
}



