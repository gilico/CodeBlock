const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = mongoose.SchemaTypes.ObjectId;

const FolderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "You already have a folder with this name"],
        trim: true
    },
    primeLang:{ 
        type: String,
        trim: true,
    },
    codes:[{
        type: ObjectId,
        ref: "Code" 
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
})


const Folder = mongoose.model('folder', FolderSchema);

module.exports = Folder;