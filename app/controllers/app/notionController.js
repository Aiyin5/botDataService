const Notion = require("../../models/notionModel.js");
const notionApi =require("../../util/notion")
const File = require("../../models/fileSysModel");
// Create and Save a new Tutorial
exports.create =async (req, res) => {
    console.log("rec notion create")
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    try {
        console.log(req.body)
        console.log("start")
        let content = await notionApi.read_block(req.body.page_id,req.body.token);
        console.log("start Hash")
        let hashcode = await notionApi.getHashFromArticle(content)
        console.log("hash end")
        const notion = new Notion({
            bot_id: req.body.bot_id,
            doc_name: req.body.doc_name,
            type: 2,
            content: content,
            page_id: req.body.page_id,
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
                    data:notion
                });
            }
        });
    }
     catch (err){
        console.log(err);
         res.status(500).send({
             message:
                 err.message || "Some error occurred while creating the File."
         });
     }

    //console.log(req.body.content)

};

exports.findNotionById = (req, res) =>{
    console.log("rv post findNotion")
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
exports.deleteNotionInfo = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
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

