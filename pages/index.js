import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const options = { gasLimit: 1000000 };

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      var amount = parseInt(document.getElementById("amountid").value)
      let tx = await atm.deposit(amount);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      var amount = parseInt(document.getElementById("amountid").value)
      let tx = await atm.withdraw(amount);
      await tx.wait()
      getBalance();
    }
  }

  const transfer = async() => {
    if (atm) {
      var address = parseInt(document.getElementById("address").value)
      var amount = parseInt(document.getElementById("transamountid").value)
      let tx = await atm.transferamt(address, amount);
      await tx.wait()
      getBalance();
    }
  }

  const payelec = async() => {
    if (atm) {
      var amount = parseInt(document.getElementById("amountid").value)
      var months = parseInt(document.getElementById("billsmonths").value)
      let tx = await atm.paybills(1, months);
      await tx.wait()
      getBalance();
    }
  }

  const paywater = async() => {
    if (atm) {
      var amount = parseInt(document.getElementById("amountid").value)
      var months = parseInt(document.getElementById("billsmonths").value)
      let tx = await atm.paybills(2, months);
      await tx.wait()
      getBalance();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Connect your wallet using Metamask</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Public Address: {account}</p>
        <p>Balance: {balance}</p>
        <b>Amount:</b> <input id="amountid" type="number" min="1"></input>
        <br></br>
        <br></br>
        <button onClick={deposit}>Deposit</button>
        <button onClick={withdraw}>Withdraw</button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h3>Transfer</h3>
        <b>Amount:</b> <input id="transamountid" type="number" min="1"></input> 
        <br></br>
        <b>Address:</b> <input id="address" type="text" minlength="40"></input>
        <br></br>
        <br></br>
        <button onClick={transfer}>Transfer</button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h3>Pay Bills</h3>
        <b>Months:</b> <input id="billsmonths" type="number" min="1"></input>
        <br></br>
        <b>Electricity Bill (20/month):</b> <button onClick={payelec}>Pay</button>
        <br></br>
        <b>Water Bill (15/month):</b> <button onClick={paywater}>Pay  </button>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>POGGERS ATM</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}
