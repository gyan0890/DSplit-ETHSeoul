//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";

//1000000000000000000
//Addresses = ["0x420674Af540BE70031cbdE8C9279fA4fF4b049CE", "0xb8761b30c951d0614459b2e227Ea944df0314665", "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"]
/// This contract handles the main logic for DSplit
contract DSplit {

    using Counters for Counters.Counter;
    Counters.Counter private gIds;
    Counters.Counter private eIds;

    address owner;

    enum ExpenseStatus {
        ACTIVE,
        ONGOING,
        SETTLED
    }

    //Create an expense group
    struct Group {
        uint gId;
        string gName;
        address[] members;
        uint[] expenses;
        mapping(address => address) fromTo;
        mapping(address => uint) owedBalance;
    }

    struct Expense {
        // uint gId;
        uint eId;
        address payer;

        //The total remaining expense to be paid out - will be split equally between participants
        uint totalExpense;
        uint expensePerPerson;
        address[] participants;
        ExpenseStatus status;
        mapping(address => uint) balances;
        mapping(address => bool) settled;
    }

    //Groups
    mapping(uint => Group) public groups;

    //Total expenses
    mapping(uint => Expense) public expenses;

    //How many expenses is a user part of
    mapping(address => uint[]) public userExpenses;

    //How many groups is a user part of
    mapping(address => uint[]) public userGroups;

    //What are the expenses in a group
    mapping(uint => uint[]) groupExpenses;
  

    //How much has the individual had expenses
    mapping(address => uint) userTotalExpenses;


    constructor() {
        //Owner of the contract
        owner = msg.sender;
    }

    //Function to create a new group
    function createGroup(string memory _gName, address[] memory _members) public returns(uint){
         //Generating a group ID every time a new expense is created
        gIds.increment();
        uint id = gIds.current();

        groups[id].gId = id;
        groups[id].gName = _gName;
        groups[id].members = _members;

        for(uint i = 0; i < _members.length; i++) {
            userGroups[_members[i]].push(id);
        }

        return id;

    } 

    //Participants array should not have the payer
    function addExpense(uint _totalExpense, address[] memory _participants, uint groupId) public returns(uint){
        require(_totalExpense > 0, "Total expenses should be greater than 0");
        require(_participants. length > 0, "Number of participants to split with, cannot be zero");

        //Generating a expense ID every time a new expense is created
        eIds.increment();
        uint id = eIds.current();
        Expense storage newExpense = expenses[id];
        newExpense.eId = id;
        newExpense.payer = msg.sender;
        newExpense.totalExpense = _totalExpense;
        newExpense.participants = _participants;
        newExpense.status = ExpenseStatus.ACTIVE;

        //Adding expense ID to the group
        groupExpenses[groupId].push(id);

        //Create mappings of users and their balances
        uint numParticipants = _participants.length;
        uint _expensePerPerson = _totalExpense/numParticipants;

        newExpense.expensePerPerson = _expensePerPerson;
        
        //Populating the balances and the settles(true/false) mapping
        for(uint i = 0; i < numParticipants; i++){
            newExpense.balances[_participants[i]] = _expensePerPerson;
            newExpense.settled[_participants[i]] = false;
            userTotalExpenses[_participants[i]] += _expensePerPerson;
            userExpenses[_participants[i]].push(id);
        }

        newExpense.settled[msg.sender] = true;

        return _expensePerPerson;

    }

    //Each individual can call this function to settle up their debts(it's a payable function)
    function settleUp(uint expenseId) public payable returns(ExpenseStatus status){
        Expense storage newExpense = expenses[expenseId];
        address to = newExpense.payer;
        uint amount = newExpense.balances[msg.sender];
        uint counter = 0;

        require(newExpense.status != ExpenseStatus.SETTLED, "This expense is no longer valid.");
        require(amount > 0, "No balances left in this expense.");
        require(msg.value >= amount, "You have not sent enough money to settle,");

        payable(to).transfer(amount);
        newExpense.settled[msg.sender] = true;

        for(uint i = 0; i < newExpense.participants.length; i++){
            if(newExpense.settled[newExpense.participants[i]] == true){
                counter++;
            }
        }

        if(counter == newExpense.participants.length){
            newExpense.status = ExpenseStatus.SETTLED;
        }
        else {
            newExpense.status = ExpenseStatus.ONGOING;
        }

        return expenses[expenseId].status;
    }

    

    /// ALL THE GET CALLS ARE BELOW

    function getActiveExpensesPerUser(address user) public view returns(uint[] memory) {
        return userExpenses[user];
    }

    function getGroupsForUser(address user) public view returns(uint[] memory) {
        return userGroups[user];
    }

    function getExpensesForGroup(uint groupId) public view returns(uint[] memory) {
        return groupExpenses[groupId];
    }

    //Returns all the expenses of a particular user
    /*
    function getActiveExpensesPerUser(address user) public view returns(uint[] memory, uint[] memory) {
        //Get all the expense ID associated with a user
        uint[] memory uExpense = userExpenses[user];

        //Create temporary arrays to return active user expenses with corresponding amounts
        uint[] memory activeExpenses;
        uint[] memory activeExpenseAmount;
        uint j = 0;
        for(uint i = 0; i < uExpense.length; i++) {
            if(expenses[i].status == ExpenseStatus.ACTIVE || expenses[i].status == ExpenseStatus.ONGOING) {
                activeExpenses[j] = i;
                activeExpenseAmount[j] = expenses[i].expensePerPerson;
                j = j + 1;
            }
        }

        return (activeExpenses, activeExpenseAmount);
    }
    */

    //Return the total expenses incurred by a user
    function getTotalUserExpenses(address user) public view returns(uint) {
        return userTotalExpenses[user];
    }

    //Get the contract balance
   function getContractBalance() public view returns(uint) {
       return address(this).balance;
   }
    
} 