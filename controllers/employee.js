var format = require('pg-format');
var db_utils = require('./database');


async function createEmployee(body){
    console.log("body---------->",body)
    return new Promise(async(resolve,reject)=>{
        var query=`INSERT INTO employees(name, department_id, role_id, available_time_id)
                    VALUES (
                        $1, 
                        (SELECT d.department_id FROM departments d WHERE d.name=$2), 
                        (SELECT r.role_id FROM roles r WHERE r.name=$3), 
                        (SELECT id FROM time_frames WHERE description=$4)
                    )
                    returning employee_id`
        var values=[body.name,body.department,body.role,body.availableTimeId]
        var result=await db_utils.execute_query_params_return_query_result(
            query,values
        ).then(res=>{
            resolve(res.rows[0])
        }).catch(error=>{
            reject(error)
        })
    })
}

async function editEmployee(body){
    return new Promise(async(resolve,reject)=>{
        var query=`UPDATE employees 
                    SET 
                        name = $1,
                        department_id = (SELECT department_id FROM departments WHERE name=$2), 
                        role_id = (SELECT role_id FROM roles WHERE name=$3), 
                        available_time_id = (SELECT id FROM time_frames WHERE description=$4)                        
                    WHERE 
                        employee_id = $5`
        var values=[body.name,body.department,body.role,body.availableTimeId,body.empId]
        var result=await db_utils.execute_query_params_return_query_result(
            query,values
        ).then(res=>{
            resolve(res.rows[0])
        }).catch(error=>{
            reject(error)
        })
    })
}

async function getEmployee(empId){
    return await new Promise(async(resolve,reject)=>{
        var query=`select * from employees where employee_id=$1`
        var values=[empId]
        var result=await db_utils.execute_query_params_return_query_result(
            query,values
        ).then(res=>{
            console.log("res.rows---------->",res.rows)
            resolve(res.rows)
        }).catch(error=>{
            reject(error)
        })
    })
}

module.exports ={
    createEmployee,
    editEmployee,
    getEmployee
}