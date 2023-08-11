const Log = require("../../models/logModel.js");
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Tutorial
    const log = new Log({
        bot_id: req.body.bot_id,
        question: req.body.question,
        answer:req.body.answer,
        comment_type:0,
        other:req.body.other
    });

    // Save Tutorial in the database
    Log.create(log, (err, data) => {
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
    await Log.updateComment(commData,where, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else {
            res.send({
                ActionType: "OK"
            })
        }
    })
}
