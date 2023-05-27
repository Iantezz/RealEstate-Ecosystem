// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ownable {
    address private owner;
    mapping(address => bool) private authorizedBuyers;
    mapping(address => bool) private assignedInvestors;
    mapping(address => bool) private borrowers;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event AuthorizedBuyerAdded(address indexed buyer);
    event AuthorizedBuyerRemoved(address indexed buyer);
    event AssignedInvestorAdded(address indexed investor);
    event AssignedInvestorRemoved(address indexed investor);
    event BorrowerAdded(address indexed borrower);
    event BorrowerRemoved(address indexed borrower);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Ownable: Only the contract owner can call this function");
        _;
    }

    modifier onlyAuthorizedBuyer() {
        require(authorizedBuyers[msg.sender], "Ownable: Only authorized buyers can call this function");
        _;
    }

    modifier onlyAssignedInvestor() {
        require(assignedInvestors[msg.sender], "Ownable: Only assigned investors can call this function");
        _;
    }

    modifier onlyBorrower() {
        require(borrowers[msg.sender], "Ownable: Only borrowers can call this function");
        _;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Ownable: Invalid new owner address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function addAuthorizedBuyer(address buyer) external onlyOwner {
        require(buyer != address(0), "Ownable: Invalid buyer address");
        authorizedBuyers[buyer] = true;
        emit AuthorizedBuyerAdded(buyer);
    }

    function removeAuthorizedBuyer(address buyer) external onlyOwner {
        require(authorizedBuyers[buyer], "Ownable: The buyer is not authorized");
        authorizedBuyers[buyer] = false;
        emit AuthorizedBuyerRemoved(buyer);
    }

    function addAssignedInvestor(address investor) external onlyOwner {
        require(investor != address(0), "Ownable: Invalid investor address");
        assignedInvestors[investor] = true;
        emit AssignedInvestorAdded(investor);
    }

    function removeAssignedInvestor(address investor) external onlyOwner {
        require(assignedInvestors[investor], "Ownable: The investor is not assigned");
        assignedInvestors[investor] = false;
        emit AssignedInvestorRemoved(investor);
    }

    function addBorrower(address borrower) external onlyAuthorizedBuyer {
        require(borrower != address(0), "Ownable: Invalid borrower address");
        borrowers[borrower] = true;
        emit BorrowerAdded(borrower);
    }

    function removeBorrower(address borrower) external onlyAuthorizedBuyer {
        require(borrowers[borrower], "Ownable: The borrower is not registered");
        borrowers[borrower] = false;
        emit BorrowerRemoved(borrower);
    }

    function isOwner(address account) public view returns (bool) {
        return account == owner;
    }

    function isAuthorizedBuyer(address account) public view returns (bool) {
        return authorizedBuyers[account];
    }

    function isAssignedInvestor(address account) public view returns (bool) {
        return assignedInvestors[account];
    }

    function isBorrower(address account) public view returns (bool) {
        return borrowers[account];
   
