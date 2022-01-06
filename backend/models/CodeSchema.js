const mongoose = require('mongoose');


const CodeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please Enter a Title']
    },
    language:{
        type: String,
        required: [true, 'Please Enter a Programin Language']
    },
    tags: [{
        tag1: {
            type: String,
            required: false,
            maxlength: [15, 'Describe your code in one or two words']
        },
        tag2: {
            type: String,
            required: false,
            maxlength: [15, 'Describe your code in one or two words']
        },
        tag3: {
            type: String,
            required: false,
            maxlength: [15, 'Describe your code in one or two words']
        }
    }],    
    code: {
        type: String,
        required: [true, "You Didn't Write any Code to Save"]
    },
    explanation: {
        type: String, 
        required: false
    }
});


const UserCode = mongoose.model('code', CodeSchema);

module.exports = UserCode;