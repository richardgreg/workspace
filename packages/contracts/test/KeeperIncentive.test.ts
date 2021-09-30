import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { utils } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ethers, waffle } from "hardhat";
import {
  KeeperIncentive,
  KeeperIncentiveHelper,
  MockERC20,
} from "../typechain";

let deployTimestamp;
let owner: SignerWithAddress, nonOwner: SignerWithAddress;
let mockPop: MockERC20;
let keeperIncentive: KeeperIncentive;
let keeperIncentiveHelper: KeeperIncentiveHelper;
const incentive = parseEther("10");

describe("Keeper incentives", function () {
  beforeEach(async function () {
    [owner, nonOwner] = await ethers.getSigners();
    const mockERC20Factory = await ethers.getContractFactory("MockERC20");
    mockPop = (await (
      await mockERC20Factory.deploy("TestPOP", "TPOP", 18)
    ).deployed()) as MockERC20;
    await mockPop.mint(owner.address, parseEther("100"));
    await mockPop.mint(nonOwner.address, parseEther("10"));

    keeperIncentive = await (
      await (
        await ethers.getContractFactory("KeeperIncentive")
      ).deploy(mockPop.address, owner.address)
    ).deployed();

    deployTimestamp = (await waffle.provider.getBlock("latest")).timestamp + 1;
    keeperIncentiveHelper = await (
      await (
        await ethers.getContractFactory("KeeperIncentiveHelper")
      ).deploy(keeperIncentive.address)
    ).deployed();
    await keeperIncentive
      .connect(owner)
      .addControllerContract(
        utils.formatBytes32String("KeeperIncentiveHelper"),
        keeperIncentiveHelper.address
      );
    await keeperIncentive
      .connect(owner)
      .createIncentive(
        utils.formatBytes32String("KeeperIncentiveHelper"),
        incentive,
        true,
        false
      );
    await keeperIncentive
      .connect(owner)
      .approveAccount(
        utils.formatBytes32String("KeeperIncentiveHelper"),
        owner.address
      );
    await mockPop
      .connect(owner)
      .approve(keeperIncentive.address, parseEther("100000"));
    await mockPop
      .connect(owner)
      .approve(keeperIncentiveHelper.address, parseEther("100000"));
  });
  it("functions should only be available for Governance", async function () {
    await expect(
      keeperIncentive
        .connect(nonOwner)
        .createIncentive(
          utils.formatBytes32String("KeeperIncentiveHelper"),
          incentive,
          true,
          false
        )
    ).to.be.revertedWith(
      "Only the contract governance may perform this action"
    );
    await expect(
      keeperIncentive
        .connect(nonOwner)
        .updateIncentive(
          utils.formatBytes32String("KeeperIncentiveHelper"),
          0,
          incentive,
          true,
          false
        )
    ).to.be.revertedWith(
      "Only the contract governance may perform this action"
    );
    await expect(
      keeperIncentive
        .connect(nonOwner)
        .approveAccount(
          utils.formatBytes32String("KeeperIncentiveHelper"),
          owner.address
        )
    ).to.be.revertedWith(
      "Only the contract governance may perform this action"
    );
    await expect(
      keeperIncentive
        .connect(nonOwner)
        .removeApproval(
          utils.formatBytes32String("KeeperIncentiveHelper"),
          owner.address
        )
    ).to.be.revertedWith(
      "Only the contract governance may perform this action"
    );
    await expect(
      keeperIncentive
        .connect(nonOwner)
        .toggleApproval(utils.formatBytes32String("KeeperIncentiveHelper"), 0)
    ).to.be.revertedWith(
      "Only the contract governance may perform this action"
    );
    await expect(
      keeperIncentive
        .connect(nonOwner)
        .toggleIncentive(utils.formatBytes32String("KeeperIncentiveHelper"), 0)
    ).to.be.revertedWith(
      "Only the contract governance may perform this action"
    );
  });
  it("should create an incentive", async () => {
    const result = await keeperIncentive
      .connect(owner)
      .createIncentive(
        utils.formatBytes32String("KeeperIncentiveHelper"),
        incentive,
        true,
        false
      );
    expect(result)
      .to.emit(keeperIncentive, "IncentiveCreated")
      .withArgs(
        utils.formatBytes32String("KeeperIncentiveHelper"),
        incentive,
        false
      );
    expect(
      await keeperIncentive.incentives(
        utils.formatBytes32String("KeeperIncentiveHelper"),
        0
      )
    ).to.deep.equal([incentive, true, false]);
  });
  describe("change incentives", function () {
    it("should change the whole incentive", async function () {
      await keeperIncentive
        .connect(owner)
        .createIncentive(
          utils.formatBytes32String("KeeperIncentiveHelper"),
          incentive,
          true,
          false
        );
      const result = await keeperIncentive
        .connect(owner)
        .updateIncentive(
          utils.formatBytes32String("KeeperIncentiveHelper"),
          0,
          parseEther("100"),
          false,
          true
        );
      expect(result)
        .to.emit(keeperIncentive, "IncentiveChanged")
        .withArgs(
          utils.formatBytes32String("KeeperIncentiveHelper"),
          incentive,
          parseEther("100"),
          false,
          true
        );
      expect(
        await keeperIncentive.incentives(
          utils.formatBytes32String("KeeperIncentiveHelper"),
          0
        )
      ).to.deep.equal([parseEther("100"), false, true]);
    });
    it("should toggle if the incentive is enabled", async function () {
      const result = await keeperIncentive
        .connect(owner)
        .toggleIncentive(utils.formatBytes32String("KeeperIncentiveHelper"), 0);
      expect(result)
        .to.emit(keeperIncentive, "IncentiveToggled")
        .withArgs(utils.formatBytes32String("KeeperIncentiveHelper"), false);
      expect(
        await keeperIncentive.incentives(
          utils.formatBytes32String("KeeperIncentiveHelper"),
          0
        )
      ).to.deep.equal([incentive, false, false]);
      const result2 = await keeperIncentive
        .connect(owner)
        .toggleIncentive(utils.formatBytes32String("KeeperIncentiveHelper"), 0);
      expect(result2)
        .to.emit(keeperIncentive, "IncentiveToggled")
        .withArgs(utils.formatBytes32String("KeeperIncentiveHelper"), true);
      expect(
        await keeperIncentive.incentives(
          utils.formatBytes32String("KeeperIncentiveHelper"),
          0
        )
      ).to.deep.equal([incentive, true, false]);
    });
    it("should fund incentives", async function () {
      await mockPop
        .connect(nonOwner)
        .approve(keeperIncentive.address, incentive);
      const result = await keeperIncentive
        .connect(nonOwner)
        .fundIncentive(incentive);
      expect(result)
        .to.emit(keeperIncentive, "IncentiveFunded")
        .withArgs(incentive);
      expect(await mockPop.balanceOf(keeperIncentive.address)).to.equal(
        incentive
      );
      expect(await keeperIncentive.incentiveBudget()).to.equal(incentive);
    });
    context("approval", function () {
      it("should approve accounts", async function () {
        expect(
          await keeperIncentive
            .connect(owner)
            .approveAccount(
              utils.formatBytes32String("KeeperIncentiveHelper"),
              nonOwner.address
            )
        )
          .to.emit(keeperIncentive, "Approved")
          .withArgs(
            utils.formatBytes32String("KeeperIncentiveHelper"),
            nonOwner.address
          );
        expect(
          await keeperIncentive.approved(
            utils.formatBytes32String("KeeperIncentiveHelper"),
            nonOwner.address
          )
        ).to.equal(true);
      });
      it("should remove approval", async function () {
        await keeperIncentive
          .connect(owner)
          .approveAccount(
            utils.formatBytes32String("KeeperIncentiveHelper"),
            nonOwner.address
          );
        expect(
          await keeperIncentive
            .connect(owner)
            .removeApproval(
              utils.formatBytes32String("KeeperIncentiveHelper"),
              nonOwner.address
            )
        )
          .to.emit(keeperIncentive, "RemovedApproval")
          .withArgs(
            utils.formatBytes32String("KeeperIncentiveHelper"),
            nonOwner.address
          );
        expect(
          await keeperIncentive.approved(
            utils.formatBytes32String("KeeperIncentiveHelper"),
            nonOwner.address
          )
        ).to.equal(false);
      });
      it("should toggle approval", async function () {
        expect(
          await keeperIncentive
            .connect(owner)
            .toggleApproval(
              utils.formatBytes32String("KeeperIncentiveHelper"),
              0
            )
        )
          .to.emit(keeperIncentive, "ApprovalToggled")
          .withArgs(utils.formatBytes32String("KeeperIncentiveHelper"), true);
        expect(
          await keeperIncentive.incentives(
            utils.formatBytes32String("KeeperIncentiveHelper"),
            0
          )
        ).to.deep.equal([incentive, true, true]);
        expect(
          await keeperIncentive
            .connect(owner)
            .toggleApproval(
              utils.formatBytes32String("KeeperIncentiveHelper"),
              0
            )
        )
          .to.emit(keeperIncentive, "ApprovalToggled")
          .withArgs(utils.formatBytes32String("KeeperIncentiveHelper"), false);
        expect(
          await keeperIncentive.incentives(
            utils.formatBytes32String("KeeperIncentiveHelper"),
            0
          )
        ).to.deep.equal([incentive, true, false]);
      });
    });
  });
  describe("call incentivized functions", function () {
    it("should pay out keeper incentive rewards", async function () {
      const oldBalance = await mockPop.balanceOf(owner.address);

      await mockPop
        .connect(nonOwner)
        .approve(keeperIncentive.address, incentive);
      await keeperIncentive.connect(nonOwner).fundIncentive(incentive);

      expect(await keeperIncentiveHelper.connect(owner).incentivisedFunction())
        .to.emit(keeperIncentiveHelper, "FunctionCalled")
        .withArgs(owner.address);
      const newBalance = await mockPop.balanceOf(owner.address);
      expect(newBalance).to.deep.equal(oldBalance.add(incentive));
    });
    it("should not pay out rewards if the incentive budget is not high enough", async function () {
      const oldBalance = await mockPop.balanceOf(owner.address);
      const result = await keeperIncentiveHelper
        .connect(owner)
        .incentivisedFunction();
      const newBalance = await mockPop.balanceOf(owner.address);
      expect(newBalance).to.equal(oldBalance);
    });
    context("approval", function () {
      it("should not be callable for non approved addresses", async function () {
        await expect(
          keeperIncentiveHelper.connect(nonOwner).incentivisedFunction()
        ).to.revertedWith("you are not approved as a keeper");
      });
      it("should be callable for non approved addresses if the incentive is open to everyone", async function () {
        await keeperIncentive
          .connect(owner)
          .toggleApproval(
            utils.formatBytes32String("KeeperIncentiveHelper"),
            0
          );
        await mockPop
          .connect(owner)
          .approve(keeperIncentiveHelper.address, parseEther("11"));
        await keeperIncentive.connect(owner).fundIncentive(parseEther("11"));

        const oldBalance = await mockPop.balanceOf(nonOwner.address);
        const result = await keeperIncentiveHelper
          .connect(nonOwner)
          .incentivisedFunction();

        expect(result)
          .to.emit(keeperIncentiveHelper, "FunctionCalled")
          .withArgs(nonOwner.address);
        const newbalance = await mockPop.balanceOf(nonOwner.address);
        expect(newbalance).to.equal(oldBalance.add(incentive));
      });
    });
    context("should not do anything ", function () {
      it("if the incentive for this function wasnt set yet", async function () {
        keeperIncentive = await (
          await (
            await ethers.getContractFactory("KeeperIncentive")
          ).deploy(mockPop.address, owner.address)
        ).deployed();
        await keeperIncentive
          .connect(owner)
          .addControllerContract(
            utils.formatBytes32String("KeeperIncentiveHelper"),
            keeperIncentiveHelper.address
          );
        await keeperIncentive
          .connect(owner)
          .approveAccount(
            utils.formatBytes32String("KeeperIncentiveHelper"),
            owner.address
          );
        await mockPop
          .connect(nonOwner)
          .approve(keeperIncentive.address, incentive);
        await keeperIncentive.connect(nonOwner).fundIncentive(incentive);

        const oldBalance = await mockPop.balanceOf(owner.address);
        expect(
          await keeperIncentiveHelper.connect(owner).incentivisedFunction()
        )
          .to.emit(keeperIncentiveHelper, "FunctionCalled")
          .withArgs(owner.address);

        const newBalance = await mockPop.balanceOf(owner.address);
        expect(newBalance).to.equal(oldBalance);
      });
    });
  });
});
