const User = require('../models/User');
const Electronics = require('../models/Electronics');

exports.create = async (electronicsData) => {
   const createdElectronics =  await Electronics.create(electronicsData);
    const userId = createdElectronics.owner;
    await User.findByIdAndUpdate(userId, { $push: { createdElectronics: createdElectronics._id } });
    return createdElectronics;
};

exports.buy = async (electronicsId, userId) => {
    await Electronics.findByIdAndUpdate(electronicsId, { $push: { buyingList: userId } });
    await User.findByIdAndUpdate(userId, { $push: { buyedElectronics: electronicsId } });
}

exports.getAll = () => Electronics.find().lean();

exports.getOne = (electronicsId) => Electronics.findById(electronicsId).populate('buyingList');

exports.delete = (electronicsId) => Electronics.findByIdAndDelete(electronicsId);

exports.updateOne = (electronicsId, electronicsData) => Electronics.findByIdAndUpdate(electronicsId, electronicsData);

exports.search = (data) => {
    let result = {};
    if (data.name) {
        result.name =  new RegExp(data.name, 'i');
    }
    if(data.type){
        result.type = data.type;
    }

    return (Electronics.find(result).lean());

}

// exports.findTheThree = () => Electronics.find({}).sort({ createdAt: -1 }).lean();