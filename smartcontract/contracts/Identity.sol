//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9

import "https://github.com/openzeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol
import "https://github.com/openzeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol

contract IdentityVerificationNft is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; // counter for generating new token _tokenIds

    struct Identity{
        uint256 id; // unique ID for the Identity
        address owner; // Addressof the identity owner
       string name; //Name of the identity owner
       string email; // Email of the identity owner
       string idType; // Type of ID (e.g. passport, driver`s license,etc.)
       string idNumber; // ID idNumber
       bool  verified; //verification status of the identity
    }

       mapping(uint256 =>Identity) public identities; // mapping to store all identities

       constructor() ERC721("IdentityVerificationNft","IVNFT") {}

       //Function to create a new identity
       function createIdentity(string memory _name,string memory _email,string memory _idType,string memory _idNumber) public returns (uint256) {
        _tokenIds.increment(); //increment the token ID counter

        uint newIdentityId = _tokenIds.current(); // Generate a new identity ID
        Identity memory newIdentityId = Identity (newIdentityId, msg.sender, _name, _email, _idType, _idNumber, false); // create a new identity struct with the passed-in parameter


        identities[newIdentityId]; =newIdentity; // Add the new identity to the mapping

        _mint(msg.sender,newIdentityId); // Mint a new NFT token and assign it to the owner

        return newIdentityId; // Return the new identity ID
       }

       //Function to verify an identity
       function verifyIdentity(uint256 _identityId) public{
        require(msg.sender == identities[_identityId].owner, "only the owner can verify the identity"); //verify that the caller is the owner of the Identity
        identities[_identityId].verified = true; //set the verification statusof the identity to the true
       }
}

