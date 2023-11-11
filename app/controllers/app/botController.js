const Bot = require("../../models/botModel")
const ModifiedInfo = require("../../models/modified_info")
const User = require("../../models/userModel");
const JWT = require("../../util/JWT");
const sql = require("../../models/db");
const {VdURL} = require('../../config/config.json')
const AxiosTool = require("../../util/axiosTool");
const Log = require("../../models/logModel");
const {limitCheck} = require("../../util/limitCheck");
const axiosIns=new AxiosTool(VdURL);

exports.addModifiedInfo = async (req, res) => {
    if (!req.body || !req.body.bot_id || !req.body.modified_answer || !req.body.log_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }
    const Info = new ModifiedInfo(
        {
            bot_id:req.body.bot_id,
            modified_answer:req.body.modified_answer,
            log_id:req.body.log_id,
            uuid:req.body.uuid?req.body.uuid:"",
            prompt:req.body.prompt?req.body.prompt:"",
            completion:req.body.completion?req.body.completion:"",
            fix_info: req.body.fix_info?req.body.fix_info:0
        }
    )
    await ModifiedInfo.create_modified_table(Info, (err, data) => {
        if(err){
            res.status(500).send({
                ActionType: "False",
                message: "Internal  error!"
            });
        }
        else {
            res.send({
                ActionType: "OK"
            })
        }
    })
}

exports.deleteModifiedInfo = async (req, res) => {
    console.log(req.params)
    if (!req.params || !req.params.log_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }
    const where = {
        id:req.params.log_id
    }
    await ModifiedInfo.deleteModifiedInfo(where, (err, data) => {
        if(err){
            res.status(500).send({
                ActionType: "False",
                message: "Internal  error!"
            });
        }
        else {
            res.send({
                ActionType: "OK"
            })
        }
    })
}

exports.modifiedInfo = async (req, res) => {
    if (!req.body || !req.body.bot_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }
    const where ={
        bot_id:req.body.bot_id,
        page:req.body.page,
        number:req.body.pageSize,
        orderFlag:req.body.orderFlag
    }
    await ModifiedInfo.getModifiedInfo(where, (err, data) => {
        if(err){
            res.status(500).send({
                ActionType: "False",
                message: "Internal  error!"
            });
        }
        else {
            res.send({
                ActionType: "OK"
            })
        }
    })
}

exports.findById = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    }
    const where = req.body;
    if(!where.bot_id){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    await Bot.find(where, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "内部服务器错误"
            });
        else {
            if (data.length === 0) {
                res.send({
                    code: "-1",
                    error: "没有这个机器人的信息"
                })
            } else {
                res.send({
                    ActionType: "OK",
                    data: data[0]
                })
            }
        }
    });
}


exports.updateBot =async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const botInfo = req.body;
    if(!botInfo.data || !botInfo.where){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
   await Bot.updateBot(botInfo, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "内部服务器错误"
            });
        else {
            res.send({
                ActionType: "OK",
            })
        }
    });
}

exports.addPreInfo = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const botData = req.body;
    if (!botData.bot_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
   await Bot.addPreInfo(botData, (err, data) => {
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

exports.addMultPreInfo =async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const botData = req.body;
    if (botData.length === 0) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    let condWhere = {
        "bot_id":botData[0].bot_id,
        "prompt":botData[0].prompt
    }
    let limit_res = await limitCheck(botData[0].bot_id)
    if(!limit_res.st_action){
        res.status(200).send({
            ActionType: "FALSE",
            message:"超过当前版本容量，请升级版本"
        });
        return
    }
    let conRes = await  Bot.newfind(condWhere)
    if(!condWhere){
        res.status(200).send({
            ActionType: "FALSE",
            message:"内部查询错误"
        });
        return
    }
    if (conRes.length === 0) {
       await Bot.addMultPreInfo(botData, async (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "内部服务器错误"
                });
            else {
                try {
                    let vdRes = await axiosIns.post("/addSt",
                        {
                            "id": data.insertId.toString(),
                            "bot_id": botData[0].bot_id,
                            "question": botData[0].prompt,
                            "answer": botData[0].completion
                        });
                    if (vdRes.ActionType == "OK") {
                        res.send({
                            ActionType: "OK",
                        });
                    } else {
                        res.send({
                            ActionType: "FALSE",
                            message: "数据更新出错"
                        });
                    }
                } catch (err) {
                    res.send({
                        ActionType: "FALSE",
                        message: "数据更新出错"
                    });
                }
            }
        });
    }
    else {
        res.send({
            ActionType: "FALSE",
            message: "问题重复"
        });
    }
}

exports.addPreInfoWithLog =async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const botData = req.body;
    const logId = req.body.log_id;
    let logWhere ={
        "id":logId
    }
    if (!botData.log_id || !botData.bot_id || !botData.prompt) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    let limit_res = await limitCheck(botData.bot_id)
    if(!limit_res.st_action){
        res.status(200).send({
            ActionType: "FALSE",
            message:"超过当前版本容量，请升级版本"
        });
        return
    }
    let condWhere = {
        "bot_id":botData.bot_id,
        "prompt":botData.prompt
    }
    let conRes = await  Bot.newfind(condWhere)
    if(!condWhere){
        res.status(200).send({
            ActionType: "FALSE",
            message:"内部查询错误"
        });
        return
    }
    let botInfo = {
        "bot_id":botData.bot_id,
        "prompt":botData.prompt,
        "completion":botData.completion
    }
    if (conRes.length === 0) {
        await Bot.addPreInfo(botInfo, async (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "内部服务器错误"
                });
            else {
                try {
                    let vdRes = await axiosIns.post("/addSt",
                        {
                            "id": data.insertId.toString(),
                            "bot_id": botData.bot_id,
                            "question": botData.prompt,
                            "answer": botData.completion
                        });
                    if (vdRes.ActionType == "OK") {
                        //logId update
                        let logData={
                            "fix_info":1
                        }
                        await Log.updateComment(logData,logWhere, (err, data) => {
                            if (err)
                                res.status(200).send({
                                    ActionType: "FALSE",
                                    message: "修正记录添加失败"
                                });
                            else {
                                res.send({
                                    ActionType: "OK"
                                })
                            }
                        })
                    } else {
                        res.send({
                            ActionType: "FALSE",
                            message: "数据更新出错"
                        });
                    }
                } catch (err) {
                    res.send({
                        ActionType: "FALSE",
                        message: "数据更新出错"
                    });
                }
            }
        });
    }
    else {
        res.send({
            ActionType: "FALSE",
            message: "问题重复"
        });
    }
}


exports.deletePreInfo = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const where = req.body;
    await Bot.deletePreInfo(where, async (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "内部服务器错误"
            });
        else {
            try {
                let vdRes= await axiosIns.post("/deleteSt",
                    {
                        "id":req.body.id.toString(),
                        "bot_id": req.body.bot_id,
                        "question":"",
                        "answer": ""
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
}

exports.updatePreInfo = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const botData = req.body;
    console.log(botData)
    await Bot.updatePreInfo(botData, async (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "内部服务器错误"
            });
        else {
            try {
                let vdRes= await axiosIns.post("/updateSt",
                    {
                        "id":req.body.id.toString(),
                        "bot_id": req.body.bot_id,
                        "question":req.body.prompt,
                        "answer": req.body.completion
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
}

exports.getPreInfo = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const where = req.body;
   await Bot.getPreInfo(where, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "内部服务器错误"
            });
        else {
            res.send({
                ActionType: "OK",
                data: data
            })
        }
    });
}

exports.getPreInfoAll = async (req, res) => {
    await Bot.getPreInfoAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "内部服务器错误"
            });
        else {
            res.send({
                ActionType: "OK",
                data: data
            })
        }
    });
}
exports.getPreInfoByPage = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const where = req.body;
    await Bot.getPreInfoByPage(where, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "内部服务器错误."
            });
        else {
            res.send({
                ActionType: "OK",
                data: data
            })
        }
    });
}
exports.searchStandardInfo = async (req, res) => {
    if(!req.body.bot_id || !req.body.content) {
        res.status(400).send({
            message: "Content and bot_id can not be empty!"
        });
    }
    else {
        const where = req.body;
       await Bot.searchStandardInfo(where, (err, data) => {
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
}

exports.getUnstInfo = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const where = req.body;
    Bot.getUnstInfo(where, (err, data) => {
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

exports.addUnstInfo = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const botData = req.body;
    if (!botData.bot_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    Bot.addUnstInfo(botData, (err, data) => {
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

exports.updateUnstInfo = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const botData = req.body;
    Bot.updateUnstInfo(botData, (err, data) => {
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