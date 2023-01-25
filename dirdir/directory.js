const inquirer = require("inquirer");
const fs = require("fs");
const Friend = require("./Friend.js");
const { DiffieHellmanGroup } = require("crypto");
const firstRun = true;

let friendsArray = [];

//Get user input from the command line and act accordingly
// [Options] Create a new friend, Search for a friend, Delete a friend

function hello() {
    console.log(
        `
        *********************************
        *      Welcome to Friendly      *
        *********************************
                     
        `);
}

function goodbye() {
    console.log("goodbye!");
}

function loadFriendsList() {
    fs.readFile("./friends.json", "utf8", (error, data) => {
        friendsArray = JSON.parse(data);
        openArray();
    });  
}

//Parses json objects from fileRead in friendsArray and opens it for manipulation
function openArray(){
    for(let i = 0; i < friendsArray.length; i++){
        friendsArray[i] = JSON.parse(friendsArray[i]);
    }
}

//Displays the array passed in a "friend card" for all objects in the array that are passed
function displayArray(array) {
    array.forEach( element => {
        console.log(`Friend: ID - ${element.id}
        ${element.name}(${element.dateOfBirth})
        Married: ${element.married}, Kids: ${element.kids}
        Phone: ${element.phoneNumber}
        Address: ${element.address}
        `);
    })
}

//Stringifies and "closes" objects in the array before writing to friends.json
function closeArray(){
    for(let i = 0; i < friendsArray.length; i++){
        friendsArray[i] = JSON.stringify(friendsArray[i]);
    }
}

//Prompt user to see if they want to run again - if yes, main menu, otherwise goodbye()
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
    displayArray(friendsArray);
    runAgain();
}

function runIt(){
    
    loadFriendsList();
    
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

            case("quit"):
                goodbye();
                break;
                
            default:
                console.log("Something bad happened");
                break;
        }
    })
}


//Create and add a new Friend object
//Queries user for name, birthday, relationship status, kids, address, and phone number
//After entry, adds to the friends.json file and calls runAgain() asking the user if they want to run it again
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
        //Create a new friend object with an id of current number of friends + 1
        const friend = new Friend(friendsArray.length + 1,`${answers.firstName.trim()} ${answers.lastName.trim()}`.trim(), answers.dateOfBirth, answers.married, answers.kids, answers.address, answers.phoneNumber);
        return friend;
    })
    .then( (friend) => {
        addToFile(friend);
        runAgain();
    })
    
}

//User query based on the property the user wants to search
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
            
            case("id"):
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Enter your friend's ID",
                        name: "searchQuery"
                    }
                ])
                .then( answer => {
                    //Return true if no friend.id exists with the queried ID and display a message to the user
                    //otherwise display the record with the ID supplied
                    if(friendsArray.every( friend => friend.id != answer.searchQuery)){
                        console.log("No such ID");
                    } else {
                        displayArray( friendsArray.filter( friend => friend.id == answer.searchQuery ) );
                    }
                })
                .then( () => runAgain())
                break;

            case("name"):
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Enter your friend's name",
                        name: "searchQuery"
                    }
                ])
                .then( answer => {
                    if(friendsArray.some( friend => friend.name.includes(answer.searchQuery.toLowerCase()))){
                        displayArray( friendsArray.filter( friend => friend.name.includes( answer.searchQuery.trim() ) ) );
                    } else {
                        console.log(`No friend named ${answer.searchQuery}!`);
                    }
                })
                .then(() => runAgain())
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

function deleteIt() {
    console.log("Delete it!");
    runAgain();
}

hello();
runIt();


//Print new Friend object to file

//Query friend file and return information

//Delete a friends information (and confirm the delete with colored warning)

// [DREAM] Sort and rewrite buffer
// [DREAM] Return specific information for friend
// [DREAM] Open a neighbors address on Google Maps

