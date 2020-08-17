pragma solidity ^0.7.0;

contract Counter {
    uint256 public value;

    function increase() public {
        value = value + 1;
    }
}
