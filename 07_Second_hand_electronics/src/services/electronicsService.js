
const Electronics = require('../models/Electronics');

exports.create = (electronicsData) => Electronics.create(electronicsData);

exports.getAll = () => Electronics.find().lean();

exports.getOne = (electronicsId) => Electronics.findById(electronicsId).populate('buyingList');

exports.delete = (electronicsId) => Electronics.findByIdAndDelete(electronicsId);

exports.updateOne = (electronicsId, electronicsData) => Electronics.findByIdAndUpdate(electronicsId, electronicsData);

exports.search = (electronicsText) => {
    if (electronicsText) {
        return (Electronics.find({ name: { $regex: electronicsText, $options: 'i' } }).lean());
    }
}

exports.findTheThree = () => Electronics.find({}).sort({ createdAt: -1 }).lean();