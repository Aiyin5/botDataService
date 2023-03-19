/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
const jsonwebtoken = require("jsonwebtoken")
const {secret} = require('../config/config.json')
const JWT = {
    generate(value,exprires){
        return jsonwebtoken.sign(value,secret,{expiresIn:exprires})
    },
    verify(token){
        try{
            return jsonwebtoken.verify(token,secret)
        }catch(e){
            return false
        }
    }
}

module.exports = JWT