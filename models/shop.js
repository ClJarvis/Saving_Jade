var mongoose = require('mongoose');

var shopSchema = mongoose.Schema({
    title: {type: String, required: true, default: ''},
    // description: {type: String, required: true, default: ''},
    price: {type: String, required: true},
    seller: {type: String, required: true},
    endDate: {type: String, required: true}

});

var Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
