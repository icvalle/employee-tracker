const inquirer = require("inquirer");
const db = require("./db/db");

const runSearch = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
            'View All Employees', 
            'View All Departments', 
            'View All Roles', 
            'Add Employee', 
            'Add Department', 
            'Add Role', 
            'Update Employee Role'
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'View All Employees':
            viewEmployees();
            break;
  
          case 'View All Departments':
            viewDept();
            break;
  
          case 'View All Roles':
            viewRoles();
            break;
  
          case 'Add Employee':
            addEmployee();
            break;
  
          case 'Add Department':
            addDept();
            break;

          case 'Add Role':
            addRole();
            break;
        
          case 'Update Employee Role':
            updateEmployeeRole();
            break;
  
          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
      });
};

async function viewEmployees () {
    let employees = await db.findAllEmployees();
    console.table(employees);
    runSearch();
}

async function viewDept () {
  let departments = await db.findAllDepartments();
  console.table(departments);
  runSearch();
}

async function viewRoles () {
  let roles = await db.findAllRoles();
  console.table(roles);
  runSearch();
}

runSearch();