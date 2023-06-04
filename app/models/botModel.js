const sql = require("./db.js");
const {removeEmoji} = require("../util/dataTransform");

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
             item.prompt = removeEmoji(item.prompt);
            item.completion = removeEmoji(item.completion);
             res=await sql.insert(pre_table,item);
        }
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
Bot.addMultPreInfo2 = async (data)=>{
    try {
        let res;
        for(let item of data){
            try {
                res = await sql.insert(pre_table, item);
            }
            catch (err){
                console.log(err)
            }
        }
        return res
    }
    catch (err){
        console.log(err)
        return err
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
        let where = {
            "id":data.id
        }
        let res = await sql.update(pre_table,data,where);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
Bot.getPreInfoAll = async (result)=>{
    try {
        let res = await sql.select(pre_table);
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

Bot.getPreInfoByPage = async (Item,result)=>{
    let where ={
        "bot_id":Item.bot_id
    };
    let searchCondition={
        "flag":false,
        "word":""
    };
    if(!Item.searchWord){
        searchCondition.flag=false;
    }
    else {
        searchCondition.flag=true;
        searchCondition.word=Item.searchWord;
    }
    let page = Item.page;
    let number = Item.pageSize;
    try {

        let res = await sql.selectByPage(pre_table,where,page,number,searchCondition);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
Bot.searchStandardInfo= async (Item,result)=>{
    let where ={
        "bot_id":Item.bot_id
    };
    let content = Item.content
    console.log(content)
    try {
        let res = await sql.selectByWhere(pre_table,where);
        if(res.length===0){
            let ret={
                "content":0,
                "data":[]
            }
            result(null, ret);
        }
        else {
            let ret={

            }
            let co=0;
            let arr=[];
            for(let item of res){
                if(item.prompt.includes(content) || item.completion.includes(content)){
                    arr.push(item);
                    co++;
                }
            }
            ret.count=co;
            ret.content=arr;
            result(null, ret);
        }
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