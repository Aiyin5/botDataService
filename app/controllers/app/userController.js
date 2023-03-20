const User = require("../../models/userModel.js");
const JWT = require("../../util/JWT");

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Tutorial
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        bot_id: req.body.bot_id,
        level: req.body.level
    });

    // Save Tutorial in the database
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else {
            const token = JWT.generate({
                _botid:user.bot_id,
                email: user.email,
            }, "2d")

            res.header("Authorization", token)
            res.send({
                ActionType: "OK",
            });
        }
    });
};

exports.findByBot = (req, res) =>{
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
    User.find(where, (err, data) => {
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
// Retrieve all Tutorials from the database (with condition).
exports.findByWhere = (req, res) => {
    console.log("rv post login")
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    console.log(req.body)
    const where = req.body;
    if(!where.password || !where.email){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    User.find(where, (err, data) => {

        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        /*else res.send(data);*/
        else {
            if (data.length === 0) {
                res.send({
                    code: "-1",
                    error: "用户名密码不匹配"
                })
            } else {
                //生成token
                const token = JWT.generate({
                    _botid:data[0].bot_id,
                    email: data[0].email
                }, "2d")

                res.header("Authorization", token)
                res.send({
                    ActionType: "OK",
                    data: {
                        name: data[0].name,
                        email: data[0].email,
                        bot_id: data[0].bot_id,
                        level: data[0].level
                    }
                })
            }
        }
    });
};
