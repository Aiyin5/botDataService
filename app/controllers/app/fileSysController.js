const File = require("../../models/fileSysModel.js");
// Create and Save a new Tutorial
exports.create = (req, res) => {
    console.log("rec file create")
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    //console.log(req.body.content)
    const file = new File({
        bot_id: req.body.bot_id,
        doc_name: req.body.doc_name,
        type: req.body.type,
        content: req.body.content,
    });

    // Save Tutorial in the database
    File.create(file, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the File."
            });
        else {
            res.send({
                ActionType: "OK",
            });
        }
    });
};

exports.findByFile = (req, res) =>{
    console.log("rv post findByBot")
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
