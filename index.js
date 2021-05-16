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
            'Update Employee Role',
            'Update Employee Manager',
            'Delete an Employee'
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

          case 'Update Employee Manager':
            updateEmployeeManager();
            break;

          case 'Delete an Employee':
            deleteEmployee();
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

async function addEmployee () {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?"
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role",
        message: "What is the employee's role id?",
        choices: [520, 580, 620, 680, 720, 780, 820, 880]
      },
      {
        type: "list",
        name: "manager",
        message: "What is the employee's manager id?",
        choices: [0, 1, 2, 3, 4, 5, 6, 7]
      }
    ])
    .then((answer) => {
      db.postEmployee(answer);
      console.log('New employee has been added.');
      runSearch();
    });
}

async function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department you would like to add?",
      },
      {
        type: "number",
        name: "id",
        message: "What is the department's id?",
      }
    ])
    .then((answer) => {
      db.postDept(answer);
      console.log('New department has been added.');
      runSearch();
    });
}

async function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the role you would like to add?",
      },
      {
        type: "number",
        name: "id",
        message: "What is the id of this role?",
      },
      {
        type: "decimal",
        name: "salary",
        message: "What is the salary for this role?",
      },
      {
        type: "number",
        name: "departmentId",
        message: "What is the department id for this role?",
      },
    ])
    .then((answer) => {
      db.postRole(answer);
      console.log('New role has been added.');
      runSearch();
    });
}

async function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "number",
        name: "id",
        message: "What is the id of the employee you would like to udpate?",
      },
      {
        type: "list",
        name: "title",
        message: "What is the new role id of the employee?",
        choices: [520, 580, 620, 680, 720, 780, 820, 880]
      },
    ])
    .then((answer) => {
      db.putEmployeeRole(answer);
      console.log('Employee\'s role has been updated.');
      runSearch();
    });
}

async function updateEmployeeManager() {
  inquirer
    .prompt([
      {
        type: "number",
        name: "id",
        message: "What is the id of the employee whose manager you would like to udpate?",
      },
      {
        type: "list",
        name: "manager_ID",
        message: "What is the id of the new manager for this employee?",
        choices: [0, 1, 2, 3, 4, 5, 6, 7]
      },
    ])
    .then((answer) => {
      db.putEmployeeManager(answer);
      console.log('Employee\'s manager has been updated.');
      runSearch();
    });
}

async function deleteEmployee() {
  inquirer
    .prompt([
      {
        type: "number",
        name: "id",
        message: "What is the id of the employee you would like to delete?",
      }
    ])
    .then((answer) => {
      db.removeEmployee(answer);
      console.log('Employee has been deleted.');
      runSearch();
    });
}

runSearch();