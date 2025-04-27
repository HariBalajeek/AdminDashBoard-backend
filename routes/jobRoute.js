const express = require('express');
const { jobAdd, getAllJobs, editJob, deleteJob } = require('../controllers/jobController');


//setting up the router
const router = express.Router()


//router
router.post('/add',jobAdd)
router.get('/get',getAllJobs)
router.put('/edit/:jobId', editJob)
router.delete('/delete/:jobId', deleteJob)



module.exports = router