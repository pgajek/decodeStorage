const ethers = require("ethers");

function decodeStorageSlot(value, type) {
  if (type === "uint256") {
    return ethers.BigNumber.from(value).toString();
  } else if (type === "string") {
    const hexString = value.slice(2); // Remove '0x' prefix
    let str = "";
    for (let i = 0; i < hexString.length; i += 2) {
      const byte = hexString.substr(i, 2);
      if (byte !== "00") {
        // Ignore padding
        str += String.fromCharCode(parseInt(byte, 16));
      }
    }
    return str;
  }
  return value;
}

const slot0 =
  "0x4c6f72656d20697073756d4c6f72656d20697073756d4c6f72656d2069707375";

console.log("Slot 0:", decodeStorageSlot(slot0, "string"));
