// Web3.js Initialization
let web3;
let contract;

// Replace with your deployed contract address
const contractAddress = "";

// Replace this with your actual ABI
const contractABI = [
];

window.onload = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request account access if needed
      web3 = new Web3(window.ethereum);
      await ethereum.request({ method: "eth_requestAccounts" });

      // Initialize contract
      contract = new web3.eth.Contract(contractABI, contractAddress);
      document.getElementById("status").innerText = "Connected to MetaMask!";
    } catch (error) {
      console.error("User denied MetaMask access", error);
    }
  } else {
    alert("Please install MetaMask to use this app!");
  }
};

// Stake Tokens Functionality
async function stakeTokens() {
  const stakeAmount = document.getElementById("stakeAmount").value;
  if (stakeAmount <= 0) {
    alert("Please enter a valid amount to stake!");
    return;
  }
  try {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.stakeTokens().send({
      from: accounts[0],
      value: web3.utils.toWei(stakeAmount, "ether"),
    });
    document.getElementById(
      "status"
    ).innerText = `Staked ${stakeAmount} ETH successfully!`;
  } catch (error) {
    console.error(error);
    document.getElementById("status").innerText = "Error staking tokens!";
  }
}

// Withdraw Stake Functionality
async function withdrawStake() {
  try {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.withdrawStake().send({ from: accounts[0] });
    document.getElementById("status").innerText = "Withdrawn successfully!";
  } catch (error) {
    console.error(error);
    document.getElementById("status").innerText = "Error withdrawing tokens!";
  }
}
