const Notion = require("../../models/notionModel.js");
const notionApi =require("../../util/notion")
const File = require("../../models/fileSysModel");
const {limitCheck} = require("../../util/limitCheck");
// Create and Save a new Tutorial
exports.create =async (req, res) => {
    console.log("rec notion create")
    // Validate request
    if (!req.body.bot_id || !req.body.token) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    let limit_res = await limitCheck(req.body.bot_id)
    if(!limit_res.yuliao_action){
        res.status(200).send({
            ActionType: "FALSE",
            message:"超过当前版本容量，请升级版本"
        });
        return
    }
    //console.log(req.body)
    console.log("start")
    let subNum=2;
    if(req.body.subPage){
        subNum=10;
    }
    let pageId=req.body.pagelink;
    if(pageId.includes("?pvs="))
    {
        pageId=pageId.slice(0,pageId.length-6);
    }
    pageId=pageId.replaceAll(" ","")
    pageId=pageId.slice(-32);
        try {
            let content = ""
            content = await notionApi.read_block(pageId, req.body.token, subNum);
            content = removeEmoji(content)
            console.log("start Hash")
            let hashcode = await notionApi.getHashFromArticle(content)
            console.log("hash end")
            const notion = new Notion({
                bot_id: req.body.bot_id,
                doc_name: req.body.doc_name,
                type: 2,
                content: content,
                page_id: pageId,
                doc_hash: hashcode
            });
            // Save Tutorial in the database
            Notion.create(notion, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the File."
                    });
                else {
                    res.send({
                        ActionType: "OK",
                        data: notion
                    });
                }
            });
        }
        catch (err){
            console.log(err);
            res.status(400).send({
                message:
                     "请确认链接或者页面授权token."
            });
        }
};
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
exports.findNotionById = (req, res) =>{
    console.log("rv post findNotion")
    const where = req.body;
    if(!where.bot_id){
        res.status(400).send({
            message: "bot_id can not be empty!"
        });
    }
    else {
        Notion.find(where, (err, data) => {
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
}
exports.getNotionPage = (req, res) =>{
    console.log("rv post getNotionPage")
    const where = req.body;
    if(!where.bot_id){
        res.status(400).send({
            message: "bot_id can not be empty!"
        });
    }
    else {
        Notion.findByPage(where, (err, data) => {
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
}
exports.deleteNotionInfo = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }
    const where = req.body;
    Notion.deleteNotionInfo(where, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else {
            res.send({
                ActionType: "OK",
            })
        }
    });
}

exports.allNotion = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }
    const where = req.body;
    Notion.findAll((err, data) => {
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
