const File = require("../../models/fileModel.js");

const {SecretId,SecretKey}= require("../../config/config.json");
const cosInstance = require("../../util/cosFunction");
let cos = new cosInstance(SecretId,SecretKey);
const AdmZip = require('adm-zip'); //引入查看zip文件的包

function doc2text(path){
    const zip = new AdmZip(path); //filePath为文件路径
    let contentXml = zip.readAsText("word/document.xml");//将document.xml读取为text内容；
    let str = "";
    let json="";
    contentXml=contentXml.replaceAll(" xml:space=\"preserve\"","");
    contentXml.match(/<w:t>[\s\S]*?<\/w:t>/ig).forEach((item)=>{
        //str += item.slice(5,-6)});
        str += item.replace("<w:t>","").replace("</w:t>","")});
    return str;
}

// Create and Save a new Tutorial
exports.create =async (req, res) => {
    console.log("rec new file create")
    // Validate request
    if (!req.body || !req.body.bot_id ) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }
    let bot_file_name=req.body.bot_id+req.body.file_name;
    try{
        await cos.upload(req.file.path,bot_file_name)
        let textContent = doc2text(req.file.path)
        //console.log(req.body.content)
        const file = new File({
            bot_id: req.body.bot_id,
            file_name: req.body.file_name,
            type: 0,
            content: textContent,
        });

        // Save Tutorial in the database
        await File.create(file, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the File."
                });
            else {
                res.send({
                    ActionType: "OK"
                });
            }
        });
    }
    catch (err){
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the File."
        });
    }


};

exports.findByFile = (req, res) =>{
    console.log("rv post findByFile")
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const where = req.body;
    if(!where.bot_id){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    File.find(where, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        /*else res.send(data);*/
        else {
            res.send({
                ActionType: "OK",
                data: data
            })
        }
    });
}
exports.allFile = (req, res) =>{
    console.log("rv post findByFile")
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    File.findAll( (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        /*else res.send(data);*/
        else {
            res.send({
                ActionType: "OK",
                data: data
            })
        }
    });
}
exports.docsInfo = (req, res) =>{
    console.log("rv post docsInfo")
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    console.log(req.body)
    const where = req.body;
    if(!where.bot_id){
        res.status(400).send({
            message: "bot_id can not be empty!"
        });
        return;
    }
    File.findByPage(where, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else {
            res.send({
                ActionType: "OK",
                data: data
            })
        }
    });
}
exports.docDelete = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const where = req.body;
    let bot_file_name =  req.body.bot_id+req.body.file_name;
    try{
        await cos.deleteObject(bot_file_name)
        await File.deleteFileInfo(where, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while delete File."
                });
            else {
                res.send({
                    ActionType: "OK"
                })
            }
        });
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while delete File."
        });
    }
}

exports.download = async (req, res) => {
    if (!req.body || !req.body.bot_id || !req.body.file_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const where = req.body;
    let bot_file_name=req.body.bot_id+req.body.file_name;
    let file_path=__dirname+"/file/"+req.body.file_name

    try {
        let flag = await cos.getItem(file_path,bot_file_name)
        console.log(flag)
        if(flag.statusCode===200){
            res.sendFile(
                file_path
            )
        }
        else {
            res.status(500).send({
                message:
                    "Some error occurred while download File."
            });
        }
    }
    catch (err){
        res.status(500).send({
            message:
                err.message || "Some error occurred while download File."
        });
    }


}
