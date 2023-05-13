import { expect } from 'chai';
import { keccak256, solidityPack } from 'ethers/lib/utils';
import { ethers } from 'hardhat';
import { zeroAddress } from 'viem';

import { defaultAbiCoder } from '@ethersproject/abi';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

export const generateRequestHash = ({
  requestId,
  fromAddress,
  toAddress,
  tokenAddress,
  amount,
  notes
}: {
  requestId: string;
  fromAddress: string;
  toAddress: string;
  tokenAddress: string;
  amount: string;
  notes: string;
}) => {
  const encodedValue = defaultAbiCoder.encode(['uint256'], [amount]).substring(2); // remove '0x' prefix and zero-padding

  const encodedParams = solidityPack(
    ['bytes32', 'address', 'address', 'address', 'uint256', 'string'],
    [requestId, fromAddress, toAddress, tokenAddress, `0x${encodedValue}`, notes]
  );

  return keccak256(encodedParams);
};

describe('FrenmoRequests', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    const FrenmoRequests = await ethers.getContractFactory('FrenmoRequests');
    const contract = await FrenmoRequests.deploy();
    const [user] = await ethers.getSigners();

    return { contract, user };
  }

  describe('Deployment', function () {
    it('Should set empty requests', async function () {
      const { contract } = await loadFixture(deploy);
      expect(await contract.myRequests()).to.be.eql([]);
    });
  });

  describe('Request', function () {
    it('Should emit the new request event', async function () {
      const { contract, user } = await loadFixture(deploy);
      const requestId = ethers.utils.formatBytes32String('1');
      const requestHash = generateRequestHash({
        requestId,
        fromAddress: user.address,
        toAddress: zeroAddress,
        amount: '1',
        tokenAddress: zeroAddress,
        notes: ''
      });

      await expect(contract.request(requestId, zeroAddress, zeroAddress, '1', ''))
        .to.emit(contract, 'NewRequest')
        .withArgs(user.address, requestHash);
    });

    describe('myRequests', function () {
      it('Should return the user requests', async function () {
        const { contract, user } = await loadFixture(deploy);
        const requestId = ethers.utils.formatBytes32String('1');
        const requestHash = generateRequestHash({
          requestId,
          fromAddress: user.address,
          toAddress: zeroAddress,
          amount: '1',
          tokenAddress: zeroAddress,
          notes: ''
        });

        await contract.request(requestId, zeroAddress, zeroAddress, '1', '');
        expect(await contract.myRequests()).to.be.eql([requestHash]);
      });
    });
  });
});
