const Course = require("../models/Course");
const User = require("../models/User");


exports.getAll = () => Course.find();

exports.getOne = (courseId) => Course.findById(courseId);

exports.getLatest = () => Course.find().sort({createdAt: -1}).limit(3);

exports.getOneDetailed = (courseId) => this.getOne(courseId).populate('owner').populate('signUpList');

exports.signUp = async (courseId, userId) => {
    await Course.findByIdAndUpdate(courseId, {$push: {signUpList: userId}});
    await User.findByIdAndUpdate(userId, {$push: {signeUpCourses: courseId}});
}

exports.create = async (userId, courseData) => {

    const createdCourse = await Course.create({
        owner: userId,
        ...courseData,
    });

    await User.findByIdAndUpdate(userId, { $push: { createdCourses: createdCourse._id } });

    return createdCourse;
};

exports.edit = (courseId, courseData) => Course.findByIdAndUpdate(courseId, courseData, { runValidators: true});

exports.delete = (courseId) => Course.findByIdAndDelete(courseId);