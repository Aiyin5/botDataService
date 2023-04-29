const User = require("../../models/userModel.js");
const JWT = require("../../util/JWT");
const random =require("string-random");
const Email = require("../../util/sendmail");
const {emailItem,pass} =require("../../config/config.json");
const instance = require("../../util/caInstance")

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        bot_id: req.body.bot_id,
        level: req.body.level,
        org_id: req.body.org_id
    });

    // Save Tutorial in the database
    User.create(user, (err, data) => {
        if (err)
            res.status(401).send({
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

exports.createNew = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    let mail=req.body.email;
    let emailCode=req.body.email_check;

    let curTime = Date.now();
    console.log(curTime)
    let arr = instance.getMap();
    console.log(mail)
    console.log(emailCode)

    if(arr.has(mail)){
        console.log(arr.get(mail).randomNumbers)
        console.log(arr.get(mail).time)
        if(arr.get(mail).randomNumbers!=emailCode || (curTime-arr.get(mail).time>600000)){
            res.status(401).send({
                ERROR: "验证码错误",
            });
        }
        else {
            instance.deleteItem(mail);
            if(arr.size>100){
                instance.cleanItem()
            }
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                bot_id: "0",
                org_id: req.body.org_id,
                level: 2
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
        }

    }
    else {
        res.status(401).send({
            ERROR: "验证码错误",
        });
    }
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
    if(!where.email_check || !where.password || !where.email){
        if(!where.email_check){
            res.status(400).send({
                message: "验证码不能为空!"
            });
        }
        else {
            res.status(400).send({
                message: "用户信息不能为空!"
            });
        }
    }
    else {
        let emailCode=where.email_check;
        let curTime = Date.now();
        console.log(curTime)
        let arr = instance.getMap();
        if(arr.get(where.email).randomNumbers!=emailCode || (curTime-arr.get(where.email).time>600000)){
            res.status(401).send({
                ERROR: "验证码错误",
            });
        }
        else {
            let condition={
                password:where.password,
                email:where.email
            }
            User.find(condition, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while login."
                    });
                /*else res.send(data);*/
                else {
                    if (data.length === 0) {
                        res.status(400).send({
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
                                org_id: data[0].org_id,
                                level: data[0].level
                            }
                        })
                    }
                }
            });
        }
    }

};


exports.captcha =async (req, res) => {
    console.log("rv post captcha")
    if (!req.body) {
        res.status(400).send({
            message: "Email can not be empty!"
        });
        return;
    }
    console.log(req.body)
    const email = req.body.email;
    let where={
        email:email
    }
    try {
        let dataRes =await User.findEmail(where)
        if(dataRes.length > 0){
            res.status(400).send({
                Error: "邮箱重复"
            })
        }
        else {
            let num = random(5).toLowerCase();
            const usercodeinfo = {
                randomNumbers: num, //生成的验证码
                mailnumber: email,//用户邮箱
                time: Date.now()//生成验证码的时间
            }
            const sendMailobj = {
                html: `<div class="container-box"><h1>尊敬的${usercodeinfo.mailnumber}欢迎使用艾因智能:</h1><p>验证码</p><h2 style="color: red;">${usercodeinfo.randomNumbers}</h2></div></div>`,
                subject: "艾因智能验证码"//主题
            }
            try {
                await new Email(emailItem,
                    pass,
                    usercodeinfo.mailnumber,
                    sendMailobj).sendMail()
                console.log("sucess")
                instance.addItem(email,usercodeinfo)
                res.send({
                    ActionType: "OK"
                })
            }
            catch (err){
                console.log(err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            }
        }
    }
    catch (err){
        res.status(500).send({
            Error: "Internal Error"
        })
    }
}

exports.aicheck =async (req, res) => {
    console.log("rv post aicheck")
    if (!req.body) {
        res.status(400).send({
            message: "Email can not be empty!"
        });
        return;
    }
    console.log(req.body)
    const org_id = req.body.org_id;
    let where={
        org_id:org_id
    }
    try {
        let dataRes =await User.findEmail(where)
        if(dataRes.length > 0){
            res.status(401).send({
                Error: "域名重复"
            })
        }
    }
    catch (err){
        res.status(500).send({
            Error: "Internal Error"
        })
    }
    res.send({
        ActionType: "OK"
    })

}