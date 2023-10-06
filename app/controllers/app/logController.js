const Log = require("../../models/logModel.js");
// Create and Save a new Tutorial
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    let comment_type = 0;
    let answer_type = 0;
    if(!req.body.comment_type){
        comment_type = 0
    }
    else {
        comment_type = req.body.comment_type;
        answer_type = req.body.answer_type
    }
    if(req.body.answer_type){
        answer_type = req.body.answer_type
    }
    const log = new Log({
        bot_id: req.body.bot_id,
        question: req.body.question,
        answer:req.body.answer,
        comment_type:comment_type,
        answer_type:answer_type,
        uuid:req.body.uuid,
        other:req.body.other
    });

    // Save Tutorial in the database
    await Log.create(log, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else {
            res.send({
                ActionType: "OK",
            });
        }
    });
};

exports.findByBotId =async (req, res) =>{
    console.log("rv post logInfo findByBot")
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
    await Log.find(where, (err, data) => {
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
};
exports.logInfoById = async (req, res) =>{
    console.log("rv post logInfo findByBot")
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const where = req.body;
    if(!where.bot_id || !where.id){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    await Log.findByUid(where, (err, data) => {
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
exports.findByPage = async (req, res) =>{
    console.log("rv post logInfo findByBot")
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
    if(!where.comment_type){
        where.comment_type=0;
    }
    if(!where.page){
        where.page=1;
    }
    if(!where.pageSize){
        where.pageSize=10;
    }
    await Log.findByPage(where, (err, data) => {
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
};
exports.commentUpdate = async (req, res) =>{
    console.log("rv post logInfo commentUpdate")
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    if(!req.body.bot_id || !req.body.question || !req.body.comment_type){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const commData = {
        "comment_type":req.body.comment_type
    };
    let where ={
        "bot_id":req.body.bot_id,
        "question":req.body.question
    }
    await Log.findLast(where,async (err, data) => {
        if(err){
            res.status(500).send({
                message:
                    err.message || "Some error occurred while search."
            });
        }
        else {
            if(data.length<1){
                res.send({
                    ActionType: "False",
                    message: "未找到对应的日志信息"
                })
                return
            }
            let logId = data[0].id
            await Log.updateComment(commData,where, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving tutorials."
                    });
                else {
                    res.send({
                        ActionType: "OK",
                        LogId:logId
                    })
                }
            })
        }
    })

}
