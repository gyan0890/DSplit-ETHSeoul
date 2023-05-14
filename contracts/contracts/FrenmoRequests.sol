// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import { Ownable } from "./libs/Ownable.sol";
import { ERC2771Context } from "./libs/ERC2771Context.sol";

contract FrenmoRequests is ERC2771Context, Ownable {
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

  constructor (address _trustedForwarder) ERC2771Context(_trustedForwarder) {}

  function request(bytes32 _requestId, address _to, address _token, uint256 _amount, string memory _note) external {
    bytes32 _requestHash = keccak256(abi.encodePacked(_requestId, _msgSender(), _to, _token, _amount, _note));
    Request memory req = Request(_requestHash, _to, _token, _amount, _note);
    data[_requestHash] = req;
    requests[_msgSender()].push(_requestHash);
    requests[_to].push(_requestHash);
    emit NewRequest(_msgSender(), _requestHash);
  }

  function myRequests() public view returns (Request[] memory) {
    bytes32[] storage requestHashes = requests[_msgSender()];
    Request[] memory result = new Request[](requestHashes.length);
    for (uint i = 0; i < requestHashes.length; i++) {
      result[i] = data[requestHashes[i]];
    }
    return result;
  }

  function setTrustedForwarder(address trustedForwarder) external onlyOwner {
    require(trustedForwarder != address(0), "Invalid trust forwarder");
    _trustedForwarder = trustedForwarder;
  }

  function versionRecipient() external pure returns (string memory) {
      return "1.0";
  }
}