const Code = require('../models/CodeSchema');
const Folder = require('../models/FolderSchema');

const getAllCodes = async (req, res) => {
    try {
        const folder = await Folder.findById(req.params.folderid);
        if(folder)
        {
            const codes = await Code.find({ user:res.locals.user._id, folder: folder._id });
            if(codes)
            {
                res.json(codes);
            }else
            {
                throw Error("You Don't Have Any CodeBlocks")
            }
        }
        else
        {
            throw new Error("Folder Not Found");
        } 

    } 
    catch (error) 
    {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};

const createCode = async (req, res) => {
    const { title, language,tags, code, explanation } = req.body;
    try {
        
        if(!title || !language || !code)
        {
            throw Error("Please Fill the Require Fields");
        }
        else 
        {
            const folder = await Folder.findById(req.params.folderid);
            
            if(folder)
            {
                const newCode = new Code({user: res.locals.user._id, title, language,tags, code, explanation, folder: folder._id});
                
                const createCode = await newCode.save();
                folder.codes.push(createCode);
                await folder.save();
                res.status(201).json(createCode);
            }
            else
            {
                throw new Error("Folder Not Found");
            } 
        }
    } 
    catch (error) 
    {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

const getById = async (req, res) => {
  
    try {
        
        const code = await Code.findById(req.params.id);
        
        if(code)
        {
            res.json(code);
        }
        else
        {
            throw new Error("Code Block Not Found");
        } 
    } 
    catch (error) 
    {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

const updateCode = async (req, res) => {

    const { title, language, code, explanation } = req.body;

    try {
        
        const codeToUpdate = await Code.findById(req.params.id);

        // if the user id of the document is not equale to the logged id
        if(codeToUpdate.user.toString() !== res.locals.user._id.toString())
        {
            res.status(400);
            throw Error("You Can't access this CodeBlock");
        }

        // if found a document in the db by it's id then update
        if(codeToUpdate)
        {
            codeToUpdate.title = title;
            codeToUpdate.language = language;
            codeToUpdate.code = code;
            codeToUpdate.explanation = explanation;

            const updatedCode = await codeToUpdate.save();
            res.json(updatedCode);
        }
        else
        {
            throw Error("Code Block Not Found");
        }
    } 
    catch (error) 
    {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

const deleteCode = async (req, res) => {

    try {

        const codeToDelete = await Code.findById(req.params.id);
        const fromFolder = await Folder.findById(req.params.folderid);

        // if the user id of the document is not equale to the logged id
        if(codeToDelete && codeToDelete.user.toString() !== res.locals.user._id.toString())
        {
            throw Error("You Can't access this CodeBlock");
        }
        
        if(codeToDelete && fromFolder) 
        {
            let index = fromFolder.codes.indexOf(codeToDelete._id);

            await codeToDelete.remove();
            fromFolder.codes.splice(index, 1);
            fromFolder.save();
                

            res.json({ message: "Code Deleted" });
        }
        else
        {
            throw Error("Code Block Not Found");
        }
    } 
    catch (error) 
    {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}


const handleErrors = (err) => {
    let errors = { form: '', findCode: '', findUser: '', access: ''};

    // can't get all codes
    if(err.message === "You Don't Have Any CodeBlocks")
    {
        errors.findCode = "You Don't Have Any CodeBlocks";
    }
    // need to fill all the params
    if(err.message === 'Please Fill the Require Fields')
    {
        errors.form = 'Please Fill the Require Fields';
    }

    if(err.message === "Code Block Not Found")
    {
        errors.findCode = "Code Block Not Found";
    }

    if(err.message === "You Can't access this CodeBlock")
    {
        errors.findUser = "You Can't access this CodeBlock";
    }

    if(err.message.includes("Cast to ObjectId failed for value"))
    {
        errors.findCode = "CodeBlock is not Exists";
    }

    return errors;
}


module.exports = { getAllCodes, createCode, getById, updateCode, deleteCode}