var mongoose = require('mongoose');

var jadeSchema = mongoose.Schema({
    title: {type: String, required: true, default: ''},
    // description: {type: String, required: true, default: ''},
    price: {type: String, required: true},
    seller: {type: String, required: true},
    endDate: {type: String, required: true}

});

var Jade = mongoose.model('Jade', jadeSchema);

module.exports = Jade;
