const inquirer = require("inquirer");
let answer;

inquirer.prompt(
    [{
        type: "input",
        message: "Type the name of your app or press ENTER to select from a list",
        name: "modeSelect"
    }]
).then((answers) => {
    answer = answers.modeSelect;
    responded = true;
})
