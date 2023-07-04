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
                message:"success"
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
    let arr = instance.getMap();

    if(arr.has(mail)){
        console.log(arr.get(mail).randomNumbers)
        console.log(arr.get(mail).time)
        if(arr.get(mail).randomNumbers!=emailCode || (curTime-arr.get(mail).time>600000)){
            res.status(200).send({
                ActionType: "False",
                message: "验证码错误",
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
                        message:"success"
                    });
                }
            });
        }

    }
    else {
        res.status(200).send({
            ActionType: "False",
            message: "验证码错误",
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
                message: "success",
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
            res.status(200).send({
                message: "验证码不能为空!"
            });
        }
        else {
            res.status(200).send({
                message: "用户信息不能为空!"
            });
        }
    }
    else if(where.checkType ==="Password"&& ( !where.password || !where.email)){
        if(!where.email_check){
            res.status(200).send({
                message: "验证码不能为空!"
            });
        }
        else {
            res.status(200).send({
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
                    res.status(200).send({
                        code: "-1",
                        message: "用户名密码不匹配"
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
                        message: "success",
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
            res.status(200).send({
                ActionType: "False",
                message: "验证码错误",
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
                        res.status(200).send({
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
                            message: "success",
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
            res.status(200).send({
                ActionType: "False",
                message: "邮箱重复"
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
                html: `<div><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:60px 0;text-align:center;"><div class="mj-column-per-100_kzFl mj-outlook-group-fix_BZpA" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:150;padding-bottom: 30px;"><div height="auto" style="border:0;display:block;outline:none;text-decoration:none;height:32px;width:168px;font-size:13px;"><img  width="194" height="80" src="https://plump-stranger-f58.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1dcc443f-049f-43e3-b4fd-dd2a10005696%2Flogo.svg?id=474a7b79-c5fa-46ec-908b-01b6d9db7e98&table=block&spaceId=8b6972cc-0b9e-4acb-91d5-4c078166a328&userId=&cache=v2"></div></td></tr></tbody></table></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-size:24px; font-weight: 700;line-height:1;text-align:center;color:#000000;">悦问</div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-size:14px;line-height:1;text-align:center;color:#77746E99;">验证码</div></td></tr><tr><td align="center" style="font-size:0px;padding:40px 55px;word-break:break-word;"><div style="font-size:24px;text-align:center;background: #e65c41;height:60px;line-height: 60px;font-weight: 700;cursor: pointer;"><p><span style="border-bottom:1px dashed #ccc;z-index:1;color: #ffffff" t="7" onclick="return false;">${usercodeinfo.randomNumbers}</span></p></div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-size:14px;line-height:1;text-align:center;">访问 <a href="https://aiyin.chat" target="_blank" rel="noopener" style="color:#9B3D20;text-decoration: none;">https://aiyin.chat</a></div></td></tr></tbody></table></div></td></tr></tbody></table></div></div>`,
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
                    ActionType: "OK",
                    message: "success"
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
            res.status(200).send({
                ActionType: "False",
                message: "域名重复"
            })
        }
        else{
            res.send({
                ActionType: "OK",
                message: "success"
            })
        }
    }
    catch (err){
        res.status(500).send({
            Error: "Internal Error"
        })
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
                res.status(200).send({
                    ActionType: "False",
                    message: "邮箱重复"
                })
            }
            else{
                res.send({
                    ActionType: "OK",
                    message: "success"
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