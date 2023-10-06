const sql = require("./db2.js");
const User = require("./userModel");

// constructor
const LogInfo = function(log) {
    this.bot_id = log.bot_id;
    this.question = log.question;
    this.answer = log.answer;
    this.other = log.other;
    this.comment_type = log.comment_type;
    this.answer_type = log.answer_type;
    this.uuid = log.uuid;
};
const tablename="log_info";
LogInfo.create = async (newLog, result) => {
    try {
        let res=await sql.insert(tablename,newLog);
        let where={
            "bot_id":newLog.bot_id
        }
        if(newLog.bot_id === newLog.uuid){
            return
        }
        let updateData={
            "columnName":"answer_count",
            "increaseAmount" :1
        }
        await User.updateLimit(updateData,where, (err, data)=>{
            if(err){
                result(err, null);
            }
            else {
                result(null, data);
            }
        })
    }
    catch (err){
        console.log(err)
        result(err, null);
    }
};
LogInfo.find = async (where,result) =>{
    try {
        let res=await sql.selectByWhere(tablename,where);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}

LogInfo.findAll = async (result) =>{
    try {
        let res=await sql.select(tablename);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
LogInfo.findByUid = async (Item,result)=>{
    let where ={}
    where.bot_id=Item.bot_id;
    where.uuid = Item.uuid;
    try {
        let res = await sql.selectByPageId(tablename,where,1,5,Item.id);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
LogInfo.findByPage = async (Item,result)=>{
    let where ={}
    if(!Item.comment_type || Item.comment_type===0){
        where.bot_id=Item.bot_id;
        if(Item.answer_type){
            where.answer_type = Item.answer_type
        }
    }
    else {
        where.bot_id=Item.bot_id;
        where.comment_type = Item.comment_type
        if(Item.answer_type){
            where.answer_type = Item.answer_type
        }
    }
    // let where ={
    //     "bot_id":Item.bot_id,
    //     "comment_type":Item.comment_type
    // };
    let page = Item.page;
    let number = Item.pageSize;
    let searchCondition={
        "flag":false,
        "word":""
    };
    try {
        let res = await sql.selectByPage(tablename,where,page,number,searchCondition);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}

LogInfo.updateComment = async (commentData,where,result) =>{
    try {
        let res=await sql.updateFirst(tablename,commentData,where);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(err, null);
    }
}
LogInfo.findLast = async (where,result) =>{
    try {
        let res=await sql.selectFirst(tablename,where);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(err, null);
    }
}
module.exports = LogInfo;