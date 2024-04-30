var express = require('express');
var router = express.Router();
var employee_helper=require('../controllers/employee')

router.post('/employees',async function(req,res,next){
    const body = req.body;
    await employee_helper.createEmployee(
        body
    ).then(async function (result) {
        res.status(200).send(result);
    }).catch(error => {
        console.log(error)
        res.status(500).send({ 'error': error })
    })
})

router.put('/employees',async function(req,res,next){
    const body = req.body;
    await employee_helper.editEmployee(
        body
    ).then(async function (result) {
        res.status(200).send(result);
    }).catch(error => {
        console.log(error)
        res.status(500).send({ 'error': error })
    })
})

module.exports = router;