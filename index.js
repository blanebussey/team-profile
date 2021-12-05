var fs = require('fs');
function initialize() 
{
    var employeeInfo = {};
    var inquirer = require('inquirer');



    inquirer
    .prompt([
        { 
            type: "input",
            name: "employee-name",
            question: "What is your name?"
        }, 
        {
            type: "input",
            name: "e-mail",
            question: "What is your e-mail address?"
        },
        {
            type: "list",
            name: "role",
            question: "What is your role in the company?",
            choices: ["Engineer", "Intern", "Manager"]
        },
    ])
    .then((answers) => {
        employeeInfo = answers;
        if (answers["role"] === "Engineer")
        {
            var employeeInquirer = require('inquirer');
            employeeInquirer
            .prompt([
            {
                type: "input",
                name: "github-address",
                question: "What is your github address?"
            },
            {
                type: "confirm",
                name: "addtional",
                question: "Do you want to add another employee?"
            }
        ])
            .then((answers) =>
            {
                employeeInfo["github-address"] = answers["github-address"];
                var employeeWrittenData = employeeInfo['employee-name'] + " " + employeeInfo['e-mail'] + " " + employeeInfo['role'] + " " + answers['github-address'];
                fs.writeFile('employee.txt', employeeWrittenData, (err) => {
      
                    // In case of a error throw err.
                    if (err) throw err;
                });
                if (answers["addtional"]=== true)
                    initialize();
            })
        } 
        else if (answers["role"] === "Intern")
        {
            var employeeInquirer = require('inquirer');
            employeeInquirer
            .prompt([
            {
                type: "input",
                name: "university",
                question: "What school do you go to?"
            },
            {
                type: "confirm",
                name: "addtional",
                question: "Do you want to add another employee?"
            }
        ])
            .then((answers) =>
            {
                if (answers["addtional"]=== true)
                    initialize();
                //console.log(answers)
            })
        } 
        else if (answers["role"] === "Manager")
        {
            var employeeInquirer = require('inquirer');
            employeeInquirer
            .prompt([
            {
                type: "input",
                name: "office",
                question: "What is your office number?"
            },
            {
                type: "confirm",
                name: "addtional",
                question: "Do you want to add another employee?"
            },
        
        ])
            .then((answers) =>
            {
                if (answers["addtional"]=== true)
                    initialize();
            })
        } 
    })
    .catch((error) => {
        if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        } else {
        // Something else went wrong
        }
    });
};

//initialize();

let http = require('http');

let handleRequest = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('dist/index.html', null, function (error, data) {
        if (error) {
            response.writeHead(404);
            respone.write('Whoops! File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
};

http.createServer(handleRequest).listen(8000);
