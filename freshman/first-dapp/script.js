
//here we are just declaring two variables. We will be assigning them their respective values in the next script
// var getMood
import { createWalletClient, custom, getContract } from "https://esm.sh/viem@2.21.40";
import { sepolia } from "https://esm.sh/viem/chains";
// var setMood

//A Wallet Client is an interface to interact with Ethereum Accounts.
//The createWalletClient function sets up a Wallet Client with a given medium.
document.addEventListener('DOMContentLoaded', async () => {

//create a client that connects the user's account to Ethereum Sepolia
const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum),
});

// this will make your wallet extension show you a pop-up requesting you to connect your wallet
// accounts will be an array
const accounts = await walletClient.requestAddresses();

//get the first address in the accounts array
const [address] = accounts;


// Replace the following two values. 
//Make sure the MoodContractAddress is in double single/double quotes 
const MoodContractAddress = "0x52F57e59676fACE8044193D34A9725D775030360";
const MoodContractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_mood",
                "type": "string"
            }
        ],
        "name": "setMood",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMood",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const MoodContractInstance = getContract({
    address: MoodContractAddress,
    abi: MoodContractABI,
    client: walletClient,
});


getMood = async function () {
    const mood = await MoodContractInstance.read.getMood();
    document.getElementById("showMood").innerText = `Your Mood: ${mood}`;
}

setMood = async function () {
    const mood = document.getElementById("mood").value;
    await MoodContractInstance.write.setMood([mood], {
        account: address
    });
}
})