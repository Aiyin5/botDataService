const File = require("../../models/fileSysModel.js");
const {VdURL} = require('../../config/config.json')
const AxiosTool = require("../../util/axiosTool");
const {limitCheck} = require("../../util/limitCheck");
const axiosIns=new AxiosTool(VdURL);
// Create and Save a new Tutorial
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

exports.create = async (req, res) => {
    console.log("rec file create")
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    let user_type = 0;
    if(!req.body.bot_id || !req.body.doc_name){
        res.status(400).send({
            message: "doc_name can not be empty!"
        });
        return
    }
    else {
        let limit_res = await limitCheck(req.body.bot_id)
        user_type = limit_res.type
        if(!limit_res.yuliao_action){
            res.status(200).send({
                ActionType: "FALSE",
                message:"超出套餐容量，请升级套餐"
            });
            return
        }
        let conWhere={
            "bot_id":req.body.bot_id,
            "doc_name":req.body.doc_name
        }
        let conRes = await File.newfind(conWhere);
        if(!conRes){
            res.send({
                ActionType: "FALSE",
                message: "数据查询错误"
            })
            return
        }
        else {
            if(conRes.length > 0){
                res.send({
                    ActionType: "FALSE",
                    message: "文章重复"
                })
                return
            }
        }
    }
    let content = removeEmoji(req.body.content)
    if(user_type === 0 && content.length > 10000){
        res.send({
            ActionType: "FALSE",
            message:"超过套餐内容，请更新套餐"
        });
        return
    }
    else if(user_type === 1 && content.length > 30000){
        res.send({
            ActionType: "FALSE",
            message:"超过套餐内容，请更新套餐"
        });
        return
    }
    else {

    }
    if(content.length > 100000){
        res.send({
            ActionType: "FALSE",
            message:"单个数据内容太大，请联系管理员"
        });
        return
    }
    //console.log(req.body.content)
    const file = new File({
        bot_id: req.body.bot_id,
        doc_name: req.body.doc_name,
        type: req.body.type,
        content: content
    });

    // Save Tutorial in the database
    await File.create(file, async (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the File."
            });
        else {
            try {
               let vdRes= await axiosIns.post("/addVector",
                    {
                        "bot_id": req.body.bot_id,
                        "doc_name":req.body.doc_name,
                        "doc_data": content
                    });

                if(vdRes.ActionType=="OK"){
                    res.send({
                        ActionType: "OK",
                    });
                }
                else {
                    res.send({
                        ActionType: "FALSE",
                        message:"数据更新出错"
                    });
                }
            }
            catch (err){
                res.send({
                    ActionType: "FALSE",
                    message:"数据更新出错"
                });
            }
        }
    });


};
exports.update= async (req, res) =>{
    let where=req.body
    if(!where.id){
        res.status(400).send({
            message: "id can not be empty!"
        });
    }
    else {
        await File.update(where, async (err, data) => {
            if (err){
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            }
            else {
                try {
                    let codition={
                        "id":where.id
                    }
                    File.find(codition, async (err, redata) => {
                        if (err){
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while retrieving tutorials."
                            });
                            return
                        }
                        try {
                            let vdRes= await axiosIns.post("/updateVector",
                                {
                                    "bot_id": redata[0].bot_id,
                                    "doc_name":req.body.doc_name,
                                    "doc_data":req.body.content
                                });
                            if(vdRes.ActionType=="OK"){
                                res.send({
                                    ActionType: "OK",
                                });
                            }
                            else {
                                res.send({
                                    ActionType: "FALSE",
                                    message:"数据更新出错"
                                });
                            }
                        }
                        catch (err){
                            if(req.body.content.length >8000){
                                res.send({
                                    ActionType: "OK",
                                    message:"文字太长，后台处理中"
                                });
                            }
                            else {
                                res.send({
                                    ActionType: "FALSE",
                                    message:"数据更新出错"
                                });
                            }
                        }

                    })
                }
                catch (err){
                    res.send({
                        ActionType: "FALSE",
                        message:"数据更新出错"
                    });
                }
            }
        });
    }
}

exports.findByFile = async (req, res) =>{
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
    await File.find(where, (err, data) => {
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
    console.log("rv post allFile")
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
exports.findByFilePage = (req, res) =>{
    console.log("rv post findByFilePage")
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
        /*else res.send(data);*/
        else {
            res.send({
                ActionType: "OK",
                data: data
            })
        }
    });
}
exports.deleteFileInfo = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const where = req.body;
    //console.log(where)
    try {
        File.find(where, async (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            /*else res.send(data);*/
            else {
                if(data.length<1){
                    res.send({
                        ActionType: "FALSE",
                        message:"未找到需要删除的内容"
                    });
                    return
                }
                else {
                    let vdRes= await axiosIns.post("/deleteVector",
                        {
                            "bot_id": data[0].bot_id,
                            "doc_name":data[0].doc_name,
                            "doc_data": data[0].content
                        });

                    if(vdRes.ActionType=="OK"){
                        File.deleteFileInfo(where, (err, data) => {
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
                    else {
                        res.send({
                            ActionType: "FALSE",
                            message:"删除失败"
                        })
                    }
                }
            }
        });
    }
    catch (err){
        res.send({
            ActionType: "FALSE",
            message:"删除失败"
        });
    }
}
