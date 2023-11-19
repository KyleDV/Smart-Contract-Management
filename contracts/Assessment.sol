// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event Transfer(string _address, uint256 amount);
    event PayBills(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        balance += _amount;

        if(balance != (_previousBalance + _amount))
            revert();

        emit Deposit(_amount);
    }

    function withdraw(uint256 _withdrawAmount) public {

        uint _previousBalance = balance;

        require(balance >= _withdrawAmount, "Not Enough Balance");
        
        balance -= _withdrawAmount;

        if(balance != (_previousBalance - _withdrawAmount))
            revert();

        emit Withdraw(_withdrawAmount);
    }

    function transferamt(string memory to, uint256 _transferAmount) public {

        uint _previousBalance = balance;

        require(balance >= _transferAmount, "Not Enough Balance");
        
        balance -= _transferAmount;

        if(balance != (_previousBalance - _transferAmount))
            revert();
        
        emit Transfer(to, _transferAmount);
    }

    function paybills(int billno, uint256 months) public {

        uint _previousBalance = balance;

        uint256 amount = 0;

        if(billno == 1){
            amount = 20;
        }else if(billno == 2){
            amount = 15;
        }else{
            amount = 0;
        }

        amount = amount * months;

        require(balance >= amount, "Not Enough Balance");
        
        balance -= amount;

        if(balance != (_previousBalance - amount))
            revert();

        emit PayBills(amount);
    }

}
