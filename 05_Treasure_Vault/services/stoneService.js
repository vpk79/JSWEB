const Stone = require("../models/Stone");
const User = require("../models/User");


exports.getAll = () => Stone.find();

exports.getOne = (stoneId) => Stone.findById(stoneId);

exports.getLatest = () => Stone.find().sort({ createdAt: -1 }).limit(3);

exports.getOneDetailed = (stoneId) => this.getOne(stoneId).populate('owner').populate('likedList');

exports.like = async (stoneId, userId) => {
    await Stone.findByIdAndUpdate(stoneId, { $push: { likedList: userId } });
    await User.findByIdAndUpdate(userId, { $push: { likedStones: stoneId } });
};



exports.create = async (userId, stoneData) => {

    const addedStone = await Stone.create({
        owner: userId,
        ...stoneData,
    });

    await User.findByIdAndUpdate(userId, { $push: { addedStones: addedStone._id } });

    return addedStone;
};

exports.edit = (stoneId, stoneData) => Stone.findByIdAndUpdate(stoneId, stoneData, { runValidators: true });

exports.delete = (stoneId) => Stone.findByIdAndDelete(stoneId);

exports.search = (name) => {
    return Stone.find({name});
}