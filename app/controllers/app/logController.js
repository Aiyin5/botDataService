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

exports.findByBotId = (req, res) =>{
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
    Log.find(where, (err, data) => {
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
