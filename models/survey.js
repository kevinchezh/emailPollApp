const mongoose = require('mongoose');
const {Schema} = mongoose;
const recipientsSchema = require('./recipients');
//convention _ means a relationship set up variable
const surveySchema = new Schema({
    title:String,
    body: String,
    subject: String,
    recipients:[recipientsSchema],
    yes: {type: Number, default:0},
    no: {type: Number, default:0},
    _user:{type:Schema.Types.ObjectId, ref:'User'},
    dataSent: Date,
    lastResponded: Date
})
mongoose.model('surveys', surveySchema);