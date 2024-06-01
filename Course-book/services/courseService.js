const Course = require("../models/Course");

exports.create = async (userId, courseData) => {

   const createCourse = Course.create({
        owner: userId,
        ...courseData
    });
}