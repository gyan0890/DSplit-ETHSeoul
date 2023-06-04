import { ethers } from 'ethers';
import React, { useState } from 'react';


import { Button } from '@/components';
import { Transaction, User } from '@/models/transaction';
import { development, LensClient, production } from '@lens-protocol/client';

const contractAddress = '0x22D49c04622eCCA58389f2fF4B39451ec5137C91';
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_totalExpense",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "_participants",
				"type": "address[]"
			}
		],
		"name": "addExpense",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bounties",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "bId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "totalAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "prizePerPerson",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimBounty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_totalBounty",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "_hackers",
				"type": "address[]"
			}
		],
		"name": "createBounty",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "expenses",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "eId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "payer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "totalExpense",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expensePerPerson",
				"type": "uint256"
			},
			{
				"internalType": "enum Desplit.ExpenseStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getActiveExpensesPerUser",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getTotalUserExpenses",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "expenseId",
				"type": "uint256"
			}
		],
		"name": "settleUp",
		"outputs": [
			{
				"internalType": "enum Desplit.ExpenseStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userExpenses",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

interface AddressStepProps {
  type: Transaction['type'];
  onSetDestination: (user: Transaction['to']) => void;
}

const AddressStep = ({ onSetDestination, type }: AddressStepProps) => {
  const [search, setSearch] = useState('');
  const [members, setMembers] = useState('');
  const [result, setResult] = useState('');

  const searchAddress = async () => {
    if (!search) return;
    if(!members) return;

    const values = ['0x68a25E486065d8752C06fE3b3D8F675FAB6D4153', '0x68a25E486065d8752C06fE3b3D8F675FAB6D4153', '0x68a25E486065d8752C06fE3b3D8F675FAB6D4153', '0x68a25E486065d8752C06fE3b3D8F675FAB6D4153', '0x68a25E486065d8752C06fE3b3D8F675FAB6D4153'];

    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    let bn = await provider.getBlockNumber();
    console.log(bn);

    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Call the function on the smart contract
    const response = await contract.addExpense(search, values);
    setResult(response.data);

    //Logic to send the list of members and the expenditure to the contract


    // if (ethers.utils.isAddress(search)) {
    //   const user: User = { address: search as `0x${string}` };
    //   onSetDestination(user);
    // } else {
    //   try {
    //     const lensClient = new LensClient({
    //       environment: process.env.NODE_ENV === 'development' ? development : production
    //     });
    //     const lensProfile = await lensClient.profile.fetch({
    //       handle: search
    //     });
    //     if (lensProfile) {
    //       const { ownedBy } = lensProfile;
    //       const user: User = { address: ownedBy as `0x${string}`, name: search };
    //       onSetDestination(user);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h1 className="text-2xl text-center">
        {type === 'request' ? 'Request crypto from' : 'Expense Details'}
      </h1>

      <form className="mt-8">
        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            className="mt-4 w-64 h-14 bg-white border-2 border-black rounded-md p-2 block w-full p-4 pl-10 text-center"
            type="text"
            placeholder="Input the amount"
            autoFocus
            required
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
           <input
            className="mt-4 w-64 h-14 bg-white border-2 border-black rounded-md p-2 block w-full p-4 pl-10 text-center"
            type="text"
            placeholder="Input Comma Separated Addresses"
            autoFocus
            required
            value={members}
            onChange={(e) => setMembers(e.target.value)}
          />
        </div>
        
      </form>
      <div className="mt-4 text-center">
        <Button label="continue" onClick={searchAddress} />
        <p>Expenses Added: {result}</p>
      </div>
    </div>
  );
};

export default AddressStep;
