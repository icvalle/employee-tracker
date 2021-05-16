const connection = require("./connection");

class DB {
    constructor(connection){
        this.connection = connection;
    }

    findAllEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_ID;"
        );
    }

    findAllDepartments() {
        return this.connection.query(
            "SELECT department.name FROM department"
        );
    }

    findAllRoles() {
        return this.connection.query(
            "SELECT role.title, role.salary, role.department_id FROM role"
        );
    }

    postEmployee(answer) {
        return this.connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.role,
                manager_ID: answer.manager
            });
    }

    postDept(answer) {
        return this.connection.query(
            'INSERT INTO department SET ?',
            {
                id: answer.id,
                name: answer.name,
            });
    }

    postRole(answer) {
        return this.connection.query(
            'INSERT INTO role SET ?',
            {
                id: answer.id,
                title: answer.title,
                salary: answer.salary,
                department_id: answer.departmentId,
            });
    }

    putEmployeeRole(answer) {
        return this.connection.query(
            'UPDATE employee SET ? WHERE ?',
            [
                {
                    role_id: answer.title,
                },
                {
                    id: answer.id,
                }, 
            ],
        );
    }

}

module.exports = new DB(connection);
