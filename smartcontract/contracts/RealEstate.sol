// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Ownable.sol";

contract RealEstateContract Ownable {
    struct Property {
        string propertyId;
        address owner;
        address authorizedBuyer;
        bool isSold;
    }

    mapping(string => Property) private properties;
    mapping(address => bool) private investors;
    mapping(address => uint256) private loans;

    event PropertyRegistered(string propertyId, address owner);
    event AuthorizedBuyerSet(string propertyId, address authorizedBuyer);
    event PropertySold(string propertyId, address buyer);
    event InvestorAdded(address investor);
    event LoanRequested(address borrower, uint256 amount);
    event LoanApproved(address borrower, uint256 amount);
    event LoanDue(address borrower, uint256 amount);

    function registerProperty(string memory propertyId) public onlyOwner {
        require(properties[propertyId].owner == address(0), "Property already registered");
        properties[propertyId].propertyId = propertyId;
        properties[propertyId].owner = msg.sender;
        emit PropertyRegistered(propertyId, msg.sender);
    }

    function setAuthorizedBuyer(string memory propertyId, address buyer) public onlyOwner {
        require(properties[propertyId].owner != address(0), "Property not registered");
        properties[propertyId].authorizedBuyer = buyer;
        emit AuthorizedBuyerSet(propertyId, buyer);
    }

    function buyProperty(string memory propertyId) public payable {
        require(properties[propertyId].owner != address(0), "Property not registered");
        require(!properties[propertyId].isSold, "Property already sold");
        require(properties[propertyId].authorizedBuyer == msg.sender, "Buyer not authorized");
        require(msg.value > 0, "Invalid payment");

        properties[propertyId].owner.transfer(msg.value);
        properties[propertyId].isSold = true;
        emit PropertySold(propertyId, msg.sender);
    }

    function addInvestor(address investor) public onlyOwner {
        require(!investors[investor], "Investor already added");
        investors[investor] = true;
        emit InvestorAdded(investor);
    }

    function requestLoan(uint256 amount) public {
        require(amount > 0, "Invalid loan amount");
        loans[msg.sender] = amount;
        emit LoanRequested(msg.sender, amount);
    }

    function approveLoan(address borrower) public onlyOwner {
        uint256 amount = loans[borrower];
        require(amount > 0, "No loan requested");

        loans[borrower] = 0;
        borrower.transfer(amount);
        emit LoanApproved(borrower, amount);
    }

    function loanDue(address borrower) public onlyOwner {
        uint256 amount = loans[borrower];
        require(amount > 0, "No loan requested");

        emit LoanDue(borrower, amount);
    }
}



contract RealEstateContract {
    // Event for a successful purchase
    event PurchaseSuccessful(address indexed buyer, address indexed seller, uint256 propertyId);

    // Event for a denied purchase
    event PurchaseDenied(address indexed buyer, address indexed seller, uint256 propertyId);

    // Event for a successful loan application and deposit
    event LoanApplicationSuccessful(address indexed loanee, uint256 amount);

    // Event for the loan period due
    event LoanPeriodDue(address indexed loanee, uint256 amount);

    function purchaseProperty(uint256 propertyId) external {
        // Perform the purchase logic

        if (purchaseSuccessful) {
            emit PurchaseSuccessful(msg.sender, seller, propertyId);
        } else {
            emit PurchaseDenied(msg.sender, seller, propertyId);
        }
    }

    function applyForLoan(uint256 amount) external {
        // Perform the loan application logic

        if (loanApplicationSuccessful) {
            emit LoanApplicationSuccessful(msg.sender, amount);
        }
    }

    function loanPeriodDue() external {
        // Perform the loan period due logic

        emit LoanPeriodDue(msg.sender, amount);
    }
}
