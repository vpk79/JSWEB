const Course = require("../models/Course");
const User = require("../models/User");

exports.create = async (userId, courseData) => {

   const createdCourse = Course.create({
        owner: userId,
        ...courseData,
    });

    await User.findByIdAndUpdate(userId, {$push: {createdCourse: createdCourse._id}});

    return createdCourse;
}