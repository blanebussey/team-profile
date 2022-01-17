// import constructors
// const Manager = require('../lib/Manager')
// create and empty team array
// run inquirer prompts for manager
// create a class variable from inquirer input const manager = new Manager(ip.name, ip.officeNum, ip.email, ip.id)
// push that manager into the team array team.push(manager)
// ask if they want another user
// if yes, run employee prompts
// if no, send employee array to createHTML function that should be living in src
// createHTML takes the employee array and turns it into an html page that is returned to index.js to write a file with
const Manager = require('./lib/Manager')
const Intern = require('./lib/Intern')
const Engineer = require('./lib/Engineer')
const generateHTML = require('./src/generate')
var fs = require('fs');
const inquirer = require('inquirer');
const e = require('express');
var teamGallery = [];


function initialize() {

    var inquirer = require('inquirer');

    inquirer
    .prompt([
        { 
            type: "input",
            name: "employeeName",
            question: "What is the name of your manager?"
        }, 
        {
            type: "input",
            name: "eMail",
            question: "What is your e-mail address?"
        },
        {
            type: "input",
            name: "id",
            question: "What is your id?"
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
        //console.log('Answers', employeeInfo)
        if (answers.role === "Engineer") {
            var employeeInquirer = require('inquirer');
            employeeInquirer
            .prompt([
            {
                type: "input",
                name: "githubAddress",
                question: "What is your github address?"
            },
            {
                type: "confirm",
                name: "additional",
                question: "Do you want to add another employee?"
            }
            ])
            .then((answers) => {
                employeeInfo.github = answers.githubAddress
                console.log(employeeInfo)
                const engineer = new Engineer(employeeInfo.employeeName, employeeInfo.id, employeeInfo.eMail, employeeInfo.github)
                teamGallery.push(engineer)
                console.log(teamGallery)
                if(answers.additional) {
                    initialize()
                } 
                else {
                    console.log("i am working");
                    generateGallery();
                }
            })
        }
                else if(answers.role === "Intern") {
                    console.log("intern section")
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "university",
                            question: "What school do you attend?"
                        },
                        {
                            type: "confirm",
                            name: "additional",
                            question: "Do you want to add another employee?"
                        },
                    ])
                    .then((answers) => {
                        employeeInfo.school = answers.university
                        const intern = new Intern (employeeInfo.employeeName, employeeInfo.id, employeeInfo.eMail, employeeInfo.school)
                        teamGallery.push(intern)
                        if(answers.additional) {
                            initialize()
                        } 
                        else {
                            console.log("i am working");
                            generateGallery();
                        }
                    })
                }
                        else if (answers.role === "Manager") {
                            inquirer.prompt([
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
                            .then((answers) => {
                                employeeInfo.office = answers.office
                                const manager = new Manager (employeeInfo.employeeName, employeeInfo.id, employeeInfo.eMail, employeeInfo.office)
                                teamGallery.push(manager)
                                if(answers.additional) {
                                    initialize()
                                } 
                                else {
                                    console.log("i am working");
                                    generateGallery();
                                }
                            })
                        }    

                            })
                        }
            
       


generateGallery = () => {
    const html = generateHTML(teamGallery)
    fs.writeFileSync("./dist/team.html", html)
};

initialize();