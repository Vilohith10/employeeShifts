var express = require('express');
var router = express.Router();
var shift_helper=require('../controllers/shifts')

router.post('/shifts',async function(req,res,next){
    const body = req.body;
    await shift_helper.createShift(
        body
    ).then(async function (result) {
        res.status(200).send(result);
    }).catch(error => {
        console.log(error)
        res.status(500).send({ 'error': error })
    })
})

router.get('/shifts',async function(req,res,next){
    const shiftDates = req.body;
    await shift_helper.getShift(
        shiftDates
    ).then(async function (result) {
        res.status(200).send(result);
    }).catch(error => {
        console.log(error)
        res.status(500).send({ 'error': error })
    })
})

router.post('/employees/assign-shift',async function(req,res,next){
    const body = req.body
    await shift_helper.postShiftSchedule(
        body
    ).then(async function (result) {
        res.status(200).send(result);
    }).catch(error => {
        console.log(error)
        res.status(500).send({ 'error': error })
    })
})

router.get('/employees/assign-shift',async function(req,res,next){
    const empId=req.query.empId
    await shift_helper.getEmployeeShift(
        empId
    ).then(async function (result) {
        res.status(200).send(result);
    }).catch(error => {
        console.log(error)
        res.status(500).send({ 'error': error })
    })
})

module.exports = router;