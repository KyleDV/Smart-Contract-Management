# Smart Contract Management

POGGERS ATM is an application to for depositing and withdrawing ETH (locally).

## Description

The program has three functions
### Deposit
This function allows you to deposit a given amount
### Withraw
This function allows you to deposit a given amount
### Transfer
This function allows you to transfer a given amount to an address
### Pay Bills
This function allows you to pay either the electricity or water for a given period of months

## Getting Started

### Installing

* Downlad the Smart Contract Management folder
* Get the MetaMask chrome extension
* Open 3 terminals in the directory of the Smart Contract Management folder you just downloaded
* In the first terminal type:  npm i
* In the second terminal type: npx hardhat node
* In the third terminal type: npx hardhat run --network localhost scripts/deploy.js

### Adding a network

* In the first terminal, type: npm run dev
* Open your MetaMask and go to Settings > Network > Add a network > Add a network manually
* Fill up your Network Name, Chain ID to 31337, and Currency symbol to ETH
* Fill up the New RPC URL, it will be found at the top of the output of your second terminal (Usually its http://127.0.0.1:8545/)

### Executing the program

* Change your network to the newly created network
* Add a wallet by going to Add account or hardware wallet > Import account then add private key of Account #0 that can be found in the second terminal
* Go to the first url that is displayed (usually its http://localhost:3000)
* Login using the imported wallet

## Authors

Kyle Dominic C. Vallo

kyledominic2001@gmail.com

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
