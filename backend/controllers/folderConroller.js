const Folder = require('../models/FolderSchema');
const Code = require('../models/CodeSchema');

const getAllFolders = async (req, res) => {

    try {
        const folders = await Folder.find({ user:res.locals.user._id });
        if(folders)
        {
            res.json(folders);
        }
        else
        {
            throw Error("You Don't Have Any Folders")
        }
    } 
    catch (error) 
    {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};

const createFolder = async (req, res) => {
    const { name, primeLang } = req.body;

    try {
        
        if(!name || !primeLang)
        {
            throw Error("Please Fill the Require Fields");
        }
        else 
        {
            const newFolder = new Folder({ user: res.locals.user._id, name, primeLang });
            
            const createFolder = await newFolder.save();
            
            res.status(201).json(createFolder);

        }
    } 
    catch (error) 
    {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }

}

const getFolderById = async (req, res) => {
    try {
        
        const folder = await Folder.findById(req.params.folderid);
        
        if(folder)
        {
            res.json(folder);
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
}

const updateFolder = async (req, res) => {
    const { name, primeLang } = req.body;

    try {
        
        const folderToUpdate = await Folder.findById(req.params.folderid);

        // if the user id of the document is not equale to the logged id
        if(folderToUpdate.user.toString() !== res.locals.user._id.toString())
        {
            res.status(400);
            throw Error("You Can't access this Folder");
        }

        // if found a document in the db by it's id then update
        if(folderToUpdate)
        {
            folderToUpdate.name = name;
            folderToUpdate.primeLang = primeLang;
            
            const updatedFolder = await folderToUpdate.save();
            res.json(updatedFolder);
        }
        else
        {
            throw Error("Folder Not Found");
        }
    } 
    catch (error) 
    {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

const deleteFolder = async (req, res) => {
    try {

        const folderToDelete = await Folder.findById(req.params.folderid);
        
        // if the user id of the document is not equale to the logged id
        if(folderToDelete && folderToDelete.user.toString() !== res.locals.user._id.toString())
        {
            throw Error("You Can't access this Folder");
        }
        
        if(folderToDelete) 
        {
            // Get an array of all the code that are in the folder to be deleted
            const allCodes = await Code.find({ user:res.locals.user._id, folder: folderToDelete._id });
            
            // Delete all the codes that belongs to the folder
            if(allCodes){
                allCodes.forEach(async(code) => {
                    await code.remove();
                })
            }

            // Deleting the folder
            await folderToDelete.remove();
            res.json({ message: "Folder Deleted" });
        }
        else
        {
            throw Error("Folder Not Found");
        }
    } 
    catch (error) 
    {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

const getUsersCodesData = async (req, res) => {
    const languages = [
        "javascript",
        "java",
        "python",
        "c_cpp",
        "xml",
        "ruby",
        "sass",
        "mysql",
        "json",
        "html",
        "csharp",
        "typescript",
        "css"
    ];
    try {
        const allCodes = await Code.find({ user:res.locals.user._id });
        let retArr = [];
        let sum = 0;
        if(allCodes)
        {
            languages.forEach(lang => {
                
                const count = allCodes.filter((obj) => obj.language === lang).length;
                sum += count;
                if(count > 0)
                {
                    retArr.push({language: lang, counts: count})
                }
            })

            
            retArr.forEach(obj => {
                let precent = (obj.counts / sum) * 100;
                obj.perc = precent;
            })
            

            res.json(retArr);
        }
        else
        {
            throw Error("You Don't Have Any Codes")
        }
    } 
    catch (error) 
    {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}


const handleErrors = (err) => {

    let errors = { form: '', findFolder: '', findUser: '', access: ''};

    // can't get all folders
    if(err.message === "You Don't Have Any Folders")
    {
        errors.findFolder = "You Don't Have Any Folders";
    }
    //if not filled all the inputs
    if(err.message === "Please Fill the Require Fields")
    {
        errors.form = "Please Fill the Require Fields";
    }

    if(err.message === "Folder Not Found")
    {
        errors.access = "Folder Not Found";
    }

    if(err.message === "You Can't access this Folder")
    {
        errors.findUser = "You Can't access this Folder";
    }

    if(err.message.includes("Cast to ObjectId failed for value"))
    {
        errors.findFolder = "Something is Wrong, Check if you are in your folder";
    }
    return errors;
    
}

module.exports = {getAllFolders, createFolder, getFolderById, updateFolder, deleteFolder,getUsersCodesData}