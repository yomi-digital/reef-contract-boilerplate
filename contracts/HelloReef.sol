// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title HelloReef
 * HelloReef - Basic REEF contract
 */
contract HelloReef is Ownable {
    function sayHello(string memory _who) external pure returns (string memory) {
        return string(abi.encodePacked("Hello ", _who, "!"));
    }
}
