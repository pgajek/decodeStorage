const { ethers } = require("ethers");

const RPC_URL =
  "https://eth-sepolia.g.alchemy.com/v2/SRIsNk0G9XuPgHC7fAKMiLhA98gzaLmN";
const CONTRACT_ADDRESS = "0x512fa0fD4EF9DCcB699dB0673FAB5b16cbcc8346";
const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-sepolia.g.alchemy.com/v2/SRIsNk0G9XuPgHC7fAKMiLhA98gzaLmN"
);

async function readStorage(slot) {
  const value = await provider.getStorageAt(CONTRACT_ADDRESS, slot);
  console.log(`Slot ${slot}: ${value}`);
}

async function main() {
  // Read simpleVar (slot 0)
  await readStorage(5);

  // Read fixedArray[0] (slot 1)
  await readStorage(6);

  // Read fixedArray[1] (slot 2)
  await readStorage(7);

  // Read longString length (slot 3)
  await readStorage(8);

  // Calculate and read longString data (starting at keccak256(slot 3))
  const dataSlot = ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(["uint256"], [3])
  );
  await readStorage(dataSlot);

  // Read balances[msg.sender] (slot keccak256(abi.encodePacked(msg.sender, baseSlot)))
  const msgSender = "0x8545845EF4BD63c9481Ae424F8147a6635dcEF87"; // Example address
  const addressHash = ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [msgSender, 4])
  );
  await readStorage(addressHash);
}

main().catch(console.error);
