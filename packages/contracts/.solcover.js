module.exports = {
  mocha: {
    grep: "@skip-on-coverage", // Find everything with this tag
    invert: true, // Run the grep's inverse set.
  },
  skipFiles: [
    "core/defi/pool/AffiliateToken.sol",
    "test_helpers/Faucet.sol",
    "mocks/",
    "external/",
    "core/interfaces/",
    "core/utils/RandomNumberConsumer.sol",
  ],
};
