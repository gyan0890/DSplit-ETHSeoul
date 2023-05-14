// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract FrenmoRequests {
  mapping (address => bytes32[]) private requests;
  mapping (bytes32 => Request) public data;

  struct Request {
    bytes32 id;
    address to;
    address token;
    uint256 amount;
    string note;
  }

  event NewRequest(address sender, bytes32 _requestHash);

  function request(bytes32 _requestId, address _to, address _token, uint256 _amount, string memory _note) external {
    bytes32 _requestHash = keccak256(abi.encodePacked(_requestId, msg.sender, _to, _token, _amount, _note));
    Request memory req = Request(_requestHash, _to, _token, _amount, _note);
    data[_requestHash] = req;
    requests[msg.sender].push(_requestHash);
    requests[_to].push(_requestHash);
    emit NewRequest(msg.sender, _requestHash);
  }

  function myRequests() public view returns (Request[] memory) {
    bytes32[] storage requestHashes = requests[msg.sender];
    Request[] memory result = new Request[](requestHashes.length);
    for (uint i = 0; i < requestHashes.length; i++) {
      result[i] = data[requestHashes[i]];
    }
    return result;
  }
}