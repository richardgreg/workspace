import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { ACLRegistry } from "../typechain";

const DEFAULT_ADMIN_ROLE =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
const ROLE = ethers.utils.id("ROLE");
const OTHER_ROLE = ethers.utils.id("OTHER_ROLE");
const PERMISSION = ethers.utils.id("PERMISSION");

let admin: SignerWithAddress,
  authorized: SignerWithAddress,
  other: SignerWithAddress,
  otherAdmin: SignerWithAddress;

let aclRegistry: ACLRegistry;
describe("ContractRegistry", () => {
  beforeEach(async () => {
    [admin, authorized, other, otherAdmin] = await ethers.getSigners();
    aclRegistry = await (
      await ethers.getContractFactory("ACLRegistry")
    ).deploy();
  });
});
