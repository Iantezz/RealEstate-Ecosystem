const Migrations = artifacts.require("real_estate");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
