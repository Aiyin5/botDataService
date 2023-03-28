const sql = require("./db.js");

// constructor
const Bot = function(bot) {
    this.name = bot.name;
    this.id = bot.id;
    this.content = bot.content;
    this.type = bot.type;
    this.avator = bot.avator;
};
const bot_table="bot_config";
const pre_table="pre_config";
const unst_table="unst_config";
Bot.create = async (newBot, result) => {
    try {
        let res=await sql.insert(bot_table,newBot);
        result(null, res);
    }
    catch (err){
        console.log(err)
    }
};
Bot.find = async (where,result) =>{
    try {
        let res=await sql.selectByWhere(bot_table,where);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
Bot.updateBot = async (data,result) =>{
    try {
        let res=await sql.update(bot_table,data.data,data.where);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}

Bot.addPreInfo = async (data,result)=>{
    try {
        let res=await sql.insert(pre_table,data);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
Bot.addMultPreInfo = async (data,result)=>{
    try {
        let res;
        for(let item of data){
             res=await sql.insert(pre_table,item);
        }
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
Bot.deletPreInfo = async (data,result)=>{
    try {
        let res = await sql.delete(pre_table,data);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
Bot.updatePreInfo = async (data,result)=>{
    try {
        let res = await sql.update(pre_table,data.data,data.where);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
Bot.getPreInfo = async (where,result)=>{
    try {
        let res = await sql.selectByWhere(pre_table,where);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
Bot.addUnstInfo = async (data,result)=>{
    try {
        let res=await sql.insert(unst_table,data);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
Bot.getUnstInfo = async (where,result)=>{
    try {
        let res = await sql.selectByWhere(unst_table,where);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
Bot.updateUnstInfo = async (data,result)=>{
    try {
        let res = await sql.update(unst_table,data.data,data.where);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
module.exports = Bot;