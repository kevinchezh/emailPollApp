const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//same thing
const { Schema } = mongoose;
//user schema
const userSchema = new Schema({
    googleID: String,
    credit: { type: Number, default:0}
});
//create the collection users
mongoose.model('users',userSchema);