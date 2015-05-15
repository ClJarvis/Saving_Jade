var mongoose = require('mongoose');

var jadeSchema = mongoose.Schema({
    description: {type: String, required: true, default: ''},
    title: {type: String, required: true, default: ''},
    user: {type: String, required: true}
});

var Jade = mongoose.model('Jade', jadeSchema);

module.exports = Jade;
