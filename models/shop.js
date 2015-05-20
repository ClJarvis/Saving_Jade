var mongoose = require('mongoose');

var shopSchema = mongoose.Schema({
    title: {type: String, required: true, default: ''},
    image:{type: String, required: true, default: ''},
    // description: {type: String, required: true, default: ''},
    price: {type: String, required: true, default: ''},
     //condintion: {type: Boolean, required: true},
    //size: {type: String, required: true},
    // season: {type: String, required: true},
    // kind: {type: String, required: true},
    price: {type: String, required: true, default: ''},
    seller: {type: String, required: true, default: ''},
    endDate: {type: String, required: true, default: ''}

});

var Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
