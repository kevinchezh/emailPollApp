const mongoose = require('mongoose');
const {Schema} = mongoose;

const recipientsSchema = new Schema({
    email: String,
    responded: {type:Boolean, default:false}
});

//why here we exports rahter than mongoose model?
/**
 * because this is a sub documment we only want this to exists under
 * the servey document, and not actually exists in the mongo database
 */
module.exports =recipientsSchema;

