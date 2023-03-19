const Bot = require("../../models/botModel")
const User = require("../../models/userModel");
const JWT = require("../../util/JWT");
const sql = require("../../models/db");

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
    Bot.addMultPreInfo(botData, (err, data) => {
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


exports.deletPreInfo = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const where = req.body;
    Bot.deletPreInfo(where, (err, data) => {
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

exports.updatePreInfo = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const botData = req.body;
    Bot.updatePreInfo(botData, (err, data) => {
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