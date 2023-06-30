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
        bot_id: req.body.email,
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
                bot_id: req.body.email,

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
    if(!where.checkType){
        where.checkType="Password";
    }
    if(where.checkType ==="Captcha" && (!where.email_check ||!where.email) ){
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
    else if(where.checkType ==="Password"&& ( !where.password || !where.email)){
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
    else if(where.checkType ==="Password"){
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
    else {
        let emailCode=where.email_check;
        let curTime = Date.now();
        console.log(curTime)
        let arr = instance.getMap();
        if(!arr.has(where.email) || arr.get(where.email).randomNumbers!=emailCode || (curTime-arr.get(where.email).time>600000)){
            res.status(401).send({
                ERROR: "验证码错误",
            });
        }
        else {
            instance.deleteItem(where.email);
            let condition={
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
    const register = req.body.register;
    let where={
        email:email
    }
    try {
        let dataRes =await User.findEmail(where)
        if(dataRes.length > 0 && register===1){
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
                html: `<div><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:60px 0;text-align:center;"><div class="mj-column-per-100_kzFl mj-outlook-group-fix_BZpA" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:150;padding-bottom: 30px;"><div height="auto" style="border:0;display:block;outline:none;text-decoration:none;height:32px;width:168px;font-size:13px;"><img  width="auto" height="80" src=data:image/png;base64,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></div></td></tr></tbody></table></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-size:24px; font-weight: 700;line-height:1;text-align:center;color:#000000;">悦问</div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-size:14px;line-height:1;text-align:center;color:#77746E99;">验证码</div></td></tr><tr><td align="center" style="font-size:0px;padding:40px 55px;word-break:break-word;"><div style="font-size:24px;text-align:center;background: #e65c41;height:60px;line-height: 60px;font-weight: 700;cursor: pointer;"><p><span style="border-bottom:1px dashed #ccc;z-index:1;color: #ffffff" t="7" onclick="return false;">${usercodeinfo.randomNumbers}</span></p></div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-size:14px;line-height:1;text-align:center;">访问 <a href="https://aiyin.chat" target="_blank" rel="noopener" style="color:#9B3D20;text-decoration: none;">https://aiyin.chat</a></div></td></tr></tbody></table></div></td></tr></tbody></table></div></div>`,
                subject: "悦问AI验证码"//主题
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
    if(!req.body.org_id){
        res.status(401).send({
            Error: "域名不能为空"
        })
    }
    else {
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
            else{
                res.send({
                    ActionType: "OK"
                })
            }
        }
        catch (err){
            res.status(500).send({
                Error: "Internal Error"
            })
        }
    }
}
exports.emailCheck =async (req, res) => {
    console.log("rv post emailCheck")
    if (!req.body) {
        res.status(400).send({
            message: "Email can not be empty!"
        });
        return;
    }
    console.log(req.body)
    if(!req.body.email){
        res.status(400).send({
            Error: "邮箱不能为空"
        })
    }
    else {
        const email_num = req.body.email;
        let where={
            email:email_num
        }
        try {
            let dataRes =await User.findEmail(where)
            if(dataRes.length > 0){
                res.status(401).send({
                    Error: "邮箱重复"
                })
            }
            else{
                res.send({
                    ActionType: "OK"
                })
            }
        }
        catch (err){
            res.status(500).send({
                Error: "Internal Error"
            })
        }
    }
}