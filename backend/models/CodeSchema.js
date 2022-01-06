const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CodeSchema = new Schema({
        title: {
            type: String,
            required: [true, 'Please Enter a Title'],
            trim: true
        },
        language:{
            type: String,
            required: [true, 'Please Enter a Programin Language']
        },
        tags: [{
            _id : false,
            tag:{
                type: String,
                required: false,
                maxlength: [15, 'Describe your code in one or two words'],
                trim: true
            }
        }],  
        code: {
            type: String,
            required: [true, "You Didn't Write any Code to Save"],
            trim: true
        },
        explanation: {
            type: String, 
            required: false,
            trim: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        folder:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref:"Folder"
        }
    },
    {
        timestamps: true,
    }
);

let Code = mongoose.model('code', CodeSchema);
module.exports = Code;
