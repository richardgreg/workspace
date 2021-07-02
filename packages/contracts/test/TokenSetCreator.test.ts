import { expect } from "chai";
import hardhat, { ethers, waffle } from "hardhat";
import TokenSetCreator, { Configuration } from "../lib/TokenSetCreator";
import { parseEther } from "ethers/lib/utils";
import { BigNumber, Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("TokenSetCreator", function () {
  interface Contracts {
    crvDUSDPool?: Contract; //MockCurveMetapool;
    ycrvDUSD?: Contract; // MockYearnV2Vault
    crvFRAXPool?: Contract;
    ycrvFRAX?: Contract;
  }

  let configuration: Configuration;
  let owner: SignerWithAddress;
  let contracts: Contracts = {};
  let subjectComponentRatio: number;


  before(async function () {
    [owner] = await ethers.getSigners();

    interface DeployPoolAndVault {
      virtualPrice: BigNumber;
      sharePrice: BigNumber;
      contractNames: (keyof Contracts)[];
    }
    const deployPoolAndVault = async ({
      virtualPrice,
      sharePrice,
      contractNames,
    }: DeployPoolAndVault) => {
      const CurveMetapool = await ethers.getContractFactory(
        "MockCurveMetapool"
      );
      const crvPool = await waffle.deployMockContract(
        owner,
        CurveMetapool.interface.format() as any
      );
      crvPool.mock.get_virtual_price.returns(virtualPrice);
      contracts[contractNames[0]] = crvPool;

      const YearnVaultV2 = await ethers.getContractFactory("MockYearnV2Vault");
      const ycrv = await waffle.deployMockContract(
        owner,
        YearnVaultV2.interface.format() as any
      );
      ycrv.mock.pricePerShare.returns(sharePrice);
      contracts[contractNames[1]] = ycrv;
    };

    await deployPoolAndVault({
      contractNames: ["crvFRAXPool", "ycrvFRAX"],
      virtualPrice: parseEther("1.005114961893439729"),
      sharePrice: parseEther("1.015962661461740916"),
    });

    await deployPoolAndVault({
      contractNames: ["crvDUSDPool", "ycrvDUSD"],
      virtualPrice: parseEther("1.011013458944652876"),
      sharePrice: parseEther("1.019964776911275462"),
    });
    
    configuration = {
      targetNAV: parseEther("200"),
      core: {
        SetTokenCreator: {
          address: "0x0000000000000000000000",
        },
        modules: {
          BasicIssuanceModule: {
            address: "0x0000000000000000000000",
          },
        },
      },
      components: {
        ycrvDUSD: {
          ratio: 25,
          address: contracts.ycrvDUSD.address,
          oracle: contracts.crvDUSDPool.address,
        },
        ycrvFRAX: {
          ratio: 25,
          address: contracts.ycrvFRAX.address,
          oracle: contracts.crvFRAXPool.address,
        },
      },
    };
  });

  describe("test setup", () => {
    it("configuration should be defined", () => {
      expect(configuration.targetNAV).to.equal(parseEther("200"));
      expect(configuration.components.ycrvDUSD.address).to.equal(
        "0x5eb3Bc0a489C5A8288765d2336659EbCA68FCd00"
      );
      expect(configuration.components.ycrvDUSD.oracle).to.equal(
        "0x8f86403A4DE0BB5791fa46B8e795C547942fE4Cf"
      );
      expect(configuration.components.ycrvFRAX.address).to.equal(
        "0x99bbA657f2BbC93c02D617f8bA121cB8Fc104Acf"
      );
      expect(configuration.components.ycrvFRAX.oracle).to.equal(
        "0x70e0bA845a1A0F2DA3359C97E0285013525FFC49"
      );
    });

    it("should be able to retrieve a mock yearn contract by address", async () => {
      const contract = await hardhat.ethers.getContractAt(
        "MockYearnV2Vault",
        configuration.components.ycrvDUSD.address
      );
      expect(contract.address).to.equal(
        configuration.components.ycrvDUSD.address
      );
    });

    it("should be able to retrieve a MockCurveMetapool contract by address", async () => {
      const contract = await hardhat.ethers.getContractAt(
        "MockCurveMetapool",
        configuration.components.ycrvDUSD.oracle
      );
      expect(contract.address).to.equal(
        configuration.components.ycrvDUSD.oracle
      );
    });
  });

  describe("Token Set Creator unit calculator", async () => {
    let subjectComponent: Configuration["components"][0];
    let subjectConfiguration: Configuration;

    async function subject() {
      return TokenSetCreator({ configuration: subjectConfiguration, hre: hardhat })._calculateUnits(
        subjectComponent
      );
    }

    describe('DUSD calculations', () => {

      before(() => {
        subjectConfiguration = configuration;
        subjectComponent = configuration.components.ycrvDUSD;
      });

      it("should calculate the correct amount of units", async () => {
        expect(await subject()).to.eq(parseEther("48.487287913484946687"));
      });

      describe('calculation when component ratio changes', () => {

        beforeEach(() => {
          subjectComponent = {  
            ...configuration.components.ycrvDUSD,
            ratio: 50,
          };
        });

        it("should calculate the correct amount of units", async () => {
          expect(await subject()).to.eq(parseEther("96.974575826969893376"));
        });
      });
    });
    describe('FRAX calculations', () => {

      before(() => {
        subjectConfiguration = configuration;
        subjectComponent = configuration.components.ycrvFRAX;
      });

      it("should calculate the correct amount of units", async () => {
        expect(await subject()).to.eq(parseEther("48.963958299874173602"));
      });

      describe('calculation when component ratio changes', () => {

        beforeEach(() => {
          subjectComponent = {  
            ...configuration.components.ycrvFRAX,
            ratio: 33,
          };
        });

        it("should calculate the correct amount of units", async () => {
          expect(await subject()).to.eq(parseEther("64.632424955833909156"));
        });
      });
    });
  });
});
