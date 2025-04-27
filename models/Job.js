const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
    jobTitle:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    salaryRange:{
        minSalary: {
            type: Number,
            required: true
        },
        maxSalary: {
            type: Number,
            required: true
        }
    },
    applicationDeadline:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    postedAt:{
        type:Date,
        default:Date.now
    }
})


const Job = mongoose.model("Job",jobSchema)

module.exports = Job