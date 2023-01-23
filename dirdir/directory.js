const inquirer = require("inquirer");
const fs = require("fs");
const Friend = require("./Friend.js");
const firstRun = true;

let friendsArray = [];

//Get user input from the command line and act accordingly
// [Options] Create a new friend, Search for a friend, Delete a friend

function goodbye() {
    console.log("goodbye!");
}

function loadFriendsList() {
    fs.readFile("./friends.json", "utf8", (error, data) => {
        friendsArray = JSON.parse(data);
        openArray();
    });  
}

//Parses json array
function openArray(){
    for(let i = 0; i < friendsArray.length; i++){
        friendsArray[i] = JSON.parse(friendsArray[i]);
    }
}

function closeArray(){
    for(let i = 0; i < friendsArray.length; i++){
        friendsArray[i] = JSON.stringify(friendsArray[i]);
    }
}

function runAgain(){
    inquirer.prompt(
        [{
            type: 'confirm',
            message: 'Do you want to run again?',
            name: 'runAgain'
        }]
    ).then( answer => ( (answer.runAgain === true) ? runIt() : goodbye()))
}

function showAll(){
    friendsArray.forEach( element => {
        console.log(`
        Friend: ${element.name}(${element.dateOfBirth})
        Married: ${element.married}, Kids: ${element.kids}
        Phone: ${element.phoneNumber}
        Address: ${element.address}`);
    })
}

function runIt(){
    
    loadFriendsList();
    console.log(
    `
    *********************************
    *      Welcome to Friendly      *
    *********************************
                 
    `);

    inquirer.prompt([
        {
            type: 'list',
            choices: [
                {name: "Add a new Friend", value: "add"},
                {name: "Find a Friend", value: "find"},
                {name: "Update Friend", value: "update"},
                {name: "Delete Friend :(", value: "delete"},
                {name: "Show All", value: "showAll"},
                {name: "Quit", value: "quit"}
            ],
            message: 'Please select an option: ',
            name: 'action'
        }
    ])
    .then( (answers) => {
        switch(answers.action){
            case("add"):
                addIt();
                break;

            case("find"):
                findIt();
                break;

            case("update"):
                updateIt();
                break;

            case("delete"):
                deleteIt();
                break;
            
            case("showAll"):
                showAll();
                break;

            case("Quit"):
                goodbye();
                break;
                
            default:
                console.log("Something bad happened");
                break;
        }
    })
}

function addIt(){
    inquirer.prompt([
        {
            type: "input",
            message: "First Name: ",
            name: "firstName"
        },
        {
            type: "input",
            message: "Last Name: ",
            name: "lastName"
        },
        {
            type: "datetime",
            message: "Birthdate: ",
            name: "dateOfBirth"
        },
        {
            type: "confirm",
            message: "Married?",
            name: "married"
        },
        {
            type: "kids",
            message: "Number of kids: ",
            name: "kids"
        },
        {
            type: "input",
            message: "Address: ",
            name: "address"
        },
        {
            type: "input",
            message: "Phone Number: ",
            name: "phoneNumber"
        }
    ])
    .then( (answers) => {
        const friend = new Friend(`${answers.firstName.trim()} ${answers.lastName.trim()}`.trim(), answers.dateOfBirth, answers.married, answers.kids, answers.address, answers.phoneNumber);
        return friend;
    })
    .then( (friend) => {
        addToFile(friend);
        runAgain();
    })
    
}

function findIt() {
    inquirer.prompt(
        [{
            input: 'list',
            message: 'What would you like to search by?',
            choices: [
                {name: "Name", value: "name"}
            ],
            name: 'searchChoice'
        }]
    )
    .then( (answer) => {
        
        switch(answer.searchChoice){
            
            case("name"):
                console.log(friendsArray);
                break;
        }
    })

}

function updateIt() {
    inquirer.prompt([
        {
            type: "checkbox",
            message: "Which property would you like to edit?",
            choices: ["Name", "Birthday", "Relationship Status", "Kids", "Address", "Phone Number", {name: "All", value: "all"}],
            name: "properties"
        }
    ])
    .then((answers) => {
        switch(answers.properties){
            case("all"):
                
                break;
            
            default:
                console.log("Error");
                break;
        }
    })
    runAgain();
}

function deleteIt() {
    console.log("Delete it!");
    runAgain();
}

function addToFile(friend) {
    
    // console.log(friend);
    // console.log(JSON.stringify(friend));
    closeArray();
    friendsArray.push(`${JSON.stringify(friend)}`);

    fs.writeFile("./friends.json", `${JSON.stringify(friendsArray)}`, (err) => {
        if(err){
            console.log("Error!");
        }
    })
    
}

runIt();
//Create and add a new Friend object

//Print new Friend object to file

//Query friend file and return information

//Delete a friends information (and confirm the delete with colored warning)

// [DREAM] Sort and rewrite buffer
// [DREAM] Return specific information for friend
// [DREAM] Open a neighbors address on Google Maps

