
const Volcano = require("../models/Volcano");
const User = require("../models/User");


exports.getAll = () => Volcano.find();

exports.getOne = (volcanoId) => Volcano.findById(volcanoId);

exports.getLatest = () => Volcano.find().sort({createdAt: -1}).limit(3);

exports.getOneDetailed = (volcanoId) => this.getOne(volcanoId).populate('owner').populate('signUpList');

exports.signUp = async (volcanoId, userId) => {
    await Volcano.findByIdAndUpdate(volcanoId, {$push: {signUpList: userId}});
    await User.findByIdAndUpdate(userId, {$push: {signeUpVolcanoes: volcanoId}});
}

exports.create = async (userId, volcanoData) => {

    const createdVolcano = await Volcano.create({
        owner: userId,
        ...volcanoData,
    });

    await User.findByIdAndUpdate(userId, { $push: { createdVolcanoes: createdVolcano._id } });

    return createdVolcano;
};

exports.edit = (volcanoId, volcanoData) => Volcano.findByIdAndUpdate(volcanoId, volcanoData, { runValidators: true});

exports.delete = (volcanoId) => Volcano.findByIdAndDelete(volcanoId);