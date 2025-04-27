const Job = require('../models/Job');


exports.jobAdd = async (req, res) => {
    const {jobTitle, companyName,jobType, location, salaryRange, applicationDeadline, description} = req.body;
    try {
        const job = new Job({
            jobTitle,
            companyName,
            jobType,
            location,
            salaryRange,
            applicationDeadline,
            description
        });
        await job.save();
        res.status(201).json({message: "Job added successfully", job});
    } catch (error) {
        res.status(500).json({message: "Error adding job", error});
    }
}


exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({message: "Error fetching jobs", error});
    }
}

exports.editJob = async (req, res) => {
    const {jobId} = req.params;
    const {jobTitle, companyName, jobType, location, salaryRange, applicationDeadline, description} = req.body;
    const jobFields ={}
    if (jobTitle) jobFields.jobTitle = jobTitle;
    if (companyName) jobFields.companyName = companyName;
    if (jobType) jobFields.jobType = jobType;
    if (location) jobFields.location = location;
    if (salaryRange) jobFields.salaryRange = salaryRange;
    if (applicationDeadline) jobFields.applicationDeadline = applicationDeadline;
    if (description) jobFields.description = description;

    if(Object.keys(jobFields).length === 0) {
        return res.status(400).json({message: "No fields to update"});
    }
    try {
        const job = await Job.findByIdAndUpdate(jobId, {
            $set: jobFields
        }, {new: true},{ runValidators: true});
        if (!job) {
            return res.status(404).json({message: "Job not found"});
        }
        res.status(200).json({message: "Job updated successfully", job});
    } catch (error) {
        res.status(500).json({message: "Error updating job", error});
    }
}


exports.deleteJob = async (req, res) => {
    const {jobId} = req.params;
    try {
        const job = await Job.findByIdAndDelete(jobId);
        if (!job) {
            return res.status(404).json({message: "Job not found"});
        }
        res.status(200).json({message: "Job deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error deleting job", error});
    }
}