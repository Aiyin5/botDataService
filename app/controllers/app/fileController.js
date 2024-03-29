const File = require("../../models/fileModel.js");
const {DocxLoader} = require ("langchain/document_loaders/fs/docx");
const {SecretId,SecretKey,VdURL}= require("../../config/config.json");
const cosInstance = require("../../util/cosFunction");
let cos = new cosInstance(SecretId,SecretKey);
const AdmZip = require('adm-zip');
const path = require("path");
const fs = require("fs");
const {PDFLoader} = require("langchain/document_loaders/fs/pdf"); //引入查看zip文件的包
const AxiosTool = require("../../util/axiosTool");
const axiosIns=new AxiosTool(VdURL);
function removeEmoji (content) {
    let conByte = new TextEncoder("utf-8").encode(content);
    for (let i = 0; i < conByte.length; i++) {
        if ((conByte[i] & 0xF8) == 0xF0) {
            for (let j = 0; j < 4; j++) {
                conByte[i+j]=0x30;
            }
            i += 3;
        }
    }
    content = new TextDecoder("utf-8").decode(conByte);
    return content.replaceAll("0000", "");
}
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

// Create and Save new file
exports.create =async (req, res) => {
    console.log("rec new file create")
    // Validate request
    if (!req.body || !req.body.bot_id ) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }
    //docx
    if(!req.body.file_type || req.body.file_type=="docx"){
        let bot_file_name=req.body.bot_id+req.body.file_name;
        try{
            const loader = new DocxLoader(
                req.file.path
            );
            let textContent =  await loader.load();
            textContent = removeEmoji(textContent[0].pageContent)
            await cos.upload(req.file.path,bot_file_name)
            //console.log(req.body.content)
            const file = new File({
                bot_id: req.body.bot_id,
                file_name: req.body.file_name,
                type: 0,
                content: textContent,
            });
            // Save Tutorial in the database
            await File.create(file, async (err, data) => {
                if (err){
                    console.log(err.message || err)
                    res.status(500).send({
                        message:
                            "文件上传失败，请稍后再尝试"
                    });
                }
                else {
                    try {
                        let vdRes= await axiosIns.post("/addVector",
                            {
                                "bot_id": req.body.bot_id,
                                "doc_name":req.body.file_name,
                                "doc_data": textContent
                            });

                        if(vdRes.ActionType=="OK"){
                            res.send({
                                ActionType: "OK",
                            });
                        }
                        else {
                            res.send({
                                ActionType: "False",
                                message:"数据更新出错"
                            });
                        }
                    }
                    catch (err){
                        res.send({
                            ActionType: "False",
                            message:"数据更新出错"
                        });
                    }
                }
            });
        }
        catch (err){
            console.log(err.message || err)
            res.status(500).send({
                message:
                    "暂不支持word2007及之前前的doc文件解析"
            });
        }
    }
    //pdf
    else {
        let bot_file_name=req.body.bot_id+req.body.file_name;
        try{
            const loader = new PDFLoader(
                req.file.path,{
                    splitPages: false,
                });
            let textContent =  await loader.load();
            textContent = removeEmoji(textContent[0].pageContent)
            await cos.upload(req.file.path,bot_file_name)
            //console.log(req.body.content)
            const file = new File({
                bot_id: req.body.bot_id,
                file_name: req.body.file_name,
                type: 1,
                content: textContent,
            });
            await File.create(file, async (err, data) => {
                if (err){
                    console.log(err.message || err)
                    res.status(500).send({
                        message:
                            "文件上传失败，请稍后再尝试"
                    });
                }
                else {
                    try {
                        let vdRes= await axiosIns.post("/addVector",
                            {
                                "bot_id": req.body.bot_id,
                                "doc_name":req.body.file_name,
                                "doc_data": textContent
                            });

                        if(vdRes.ActionType=="OK"){
                            res.send({
                                ActionType: "OK",
                            });
                        }
                        else {
                            res.send({
                                ActionType: "False",
                                message:"数据更新出错"
                                //
                            });
                        }
                    }
                    catch (err){
                        res.send({
                            ActionType: "False",
                            message:"数据更新出错"
                        });
                    }
                }
            });
        }
        catch (err){
            console.log(err.message || err)
            res.status(500).send({
                message:
                    "暂不支持解析图片格式的pdf"
            });
        }
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
    console.log("rv post docDelete")
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }
    const where = req.body;
    File.find(where, async (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "删除失败，内部服务器错误."
            });
        /*else res.send(data);*/
        else {
            if(data.length<1){
                res.send({
                    ActionType: "False",
                    message:"未找到需要删除的内容"
                });
                return
            }
            else {
                try {
                    let vdRes= await axiosIns.post("/deleteVector",
                        {
                            "bot_id": data[0].bot_id,
                            "doc_name":data[0].file_name,
                            "doc_data": data[0].file_content
                        });
                    if(vdRes.ActionType=="OK"){
                        let bot_file_name =  req.body.bot_id+data[0].file_name;
                        await cos.deleteObject(bot_file_name)
                        File.deleteFileInfo(where, (err, data) => {
                            if (err)
                                res.status(500).send({
                                    message:
                                        err.message || "删除失败，内部服务器错误"
                                });
                            else {
                                res.send({
                                    ActionType: "OK",
                                })
                            }
                        });
                    }
                    else {
                        res.send({
                            ActionType: "False",
                            message:"删除失败"
                        })
                    }
                }
                catch (err){
                    console.log(err)
                    res.send({
                        ActionType: "False",
                        message:"删除失败"
                    })
                }
            }
        }
    });
}

exports.download = async (req, res) => {
    console.log("rv post download")
    if (!req.body || !req.body.bot_id || !req.body.file_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }
    let bot_file_name=req.body.bot_id+req.body.file_name;
    console.log(req.body.file_name)
    try {
        let flag = await cos.getObjectUrl(bot_file_name)
        console.log(flag)
        res.send({
            ActionType: "OK",
            downloadUrl:flag
        })
    }
    catch (err){
        res.status(500).send({
            message:
                "下载出错，请稍后再试"
        });
    }
}
