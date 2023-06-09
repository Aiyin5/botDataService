const Bot = require("../../models/botModel")
const User = require("../../models/userModel");
const JWT = require("../../util/JWT");
const sql = require("../../models/db");
const {VdURL} = require('../../config/config.json')
const AxiosTool = require("../../util/axiosTool");
const axiosIns=new AxiosTool(VdURL);

exports.findById = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const where = req.body;
    if(!where.bot_id){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    Bot.find(where, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
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


exports.updateBot = (req, res) => {
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
    Bot.updateBot(botInfo, (err, data) => {
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

exports.addPreInfo = (req, res) => {
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
    Bot.addPreInfo(botData, (err, data) => {
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

exports.addMultPreInfo = (req, res) => {
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
    Bot.addMultPreInfo(botData, async (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else {
            try {

                let vdRes= await axiosIns.post("/addSt",
                    {
                        "id":data.insertId.toString(),
                        "bot_id": botData[0].bot_id,
                        "question":botData[0].prompt,
                        "answer": botData[0].completion
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


exports.deletPreInfo = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const where = req.body;
    Bot.deletPreInfo(where, async (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
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

exports.updatePreInfo = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const botData = req.body;
    console.log(botData)
    Bot.updatePreInfo(botData, async (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
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

exports.getPreInfo = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const where = req.body;
    Bot.getPreInfo(where, (err, data) => {
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

exports.getPreInfoAll = (req, res) => {
    Bot.getPreInfoAll((err, data) => {
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
exports.getPreInfoByPage = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const where = req.body;
    Bot.getPreInfoByPage(where, (err, data) => {
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
exports.searchStandardInfo = (req, res) => {
    if(!req.body.bot_id || !req.body.content) {
        res.status(400).send({
            message: "Content and bot_id can not be empty!"
        });
    }
    else {
        const where = req.body;
        Bot.searchStandardInfo(where, (err, data) => {
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