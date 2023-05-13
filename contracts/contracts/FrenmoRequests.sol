// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract FrenmoRequests {
  mapping (address => bytes32[]) public requests;

  event NewRequest(address sender, bytes32 _requestHash);

  function request(bytes32 _requestId, address _to, address _token, uint256 _amount, string memory _note) external {
    bytes32 _requestHash = keccak256(abi.encodePacked(_requestId, msg.sender, _to, _token, _amount, _note));
    requests[msg.sender].push(_requestHash);
    emit NewRequest(msg.sender, _requestHash);
  }

  function myRequests() public view returns (bytes32[] memory) {
    return requests[msg.sender];
  }
}