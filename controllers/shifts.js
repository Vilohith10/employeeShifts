var format = require('pg-format');
var db_utils = require('./database');
const { resolve } = require('path');
const { rejects } = require('assert');
const { error, assert } = require('console');

async function createShift(body){
    console.log('body---------------->',body)
    return new Promise(async(resolve,reject)=>{
        var query=`INSERT 
                        INTO 
                    shifts (start_time, end_time, department_id, required_skills)
                        VALUES 
                    ($1, $2, (SELECT department_id FROM departments WHERE name=$3), $4)
                    returning shift_id`
        var values=[body.start_time,body.end_time,body.department_id,body.required_skills]
        var result=await db_utils.execute_query_params_return_query_result(
            query,values
        ).then(res=>{
            resolve(res.rows[0])
        }).catch(error=>{
            reject(error)
        })
    })
}

async function getShift(shiftDates){
    return new Promise(async (resolve,reject)=>{
        var query=`SELECT *
                    FROM 
                shifts
                    WHERE 
                start_time BETWEEN $1 AND $2
                or 
                end_time BETWEEN $1 AND $2`
        var values=[shiftDates.start_time,shiftDates.end_time]
        var result=await db_utils.execute_query_params_return_query_result(
            query,values
        ).then(res=>{
            resolve(res.rows)
        }).catch(error=>{
            reject(error)
        })
    })
}

async function postShiftSchedule(body){
    return new Promise(async(resolve,reject)=>{
        var query=`INSERT 
                    INTO 
                assigned_shifts (employee_id,shift_id)
                    VALUES 
                ($1, $2)
                returning assignment_id;`
        var values=[body.employee_id,body.shift_id]
        var result=await db_utils.execute_query_params_return_query_result(
            query,values
        ).then(res=>{
            resolve(res.rows)
        }).catch(error=>{
            reject(error)
        })
    })

}

async function getEmployeeShift(empId){
    return new Promise(async(resolve,reject)=>{
        var query=`select 
                        start_time,
                        end_time,
                        required_skills
                    from shifts sh
                        join assigned_shifts ash on
                        ash.shift_id=sh.shift_id
                        where ash.employee_id=$1`
        var values=[empId]
        var results=await db_utils.execute_query_params_return_query_result(
            query,values
        ).then(res=>{
            resolve(res.rows)
        }).catch(error=>{
            reject(error)
        })
    })
}

module.exports={
    createShift,
    getShift,
    postShiftSchedule,
    getEmployeeShift
}