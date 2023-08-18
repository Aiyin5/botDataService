const sql = require("./db2.js");
const User = require("./userModel");

// constructor
const LogInfo = function(log) {
    this.bot_id = log.bot_id;
    this.question = log.question;
    this.answer = log.answer;
    this.other = log.other;
};
const tablename="log_info";
LogInfo.create = async (newLog, result) => {
    try {
        let res=await sql.insert(tablename,newLog);
        let where={
            "bot_id":newLog.bot_id
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

LogInfo.findByPage = async (Item,result)=>{
    let where ={}
    if(!Item.comment_type || Item.comment_type===0){
        where.bot_id=Item.bot_id;
    }
    else {
        where.bot_id=Item.bot_id;
        where.comment_type = Item.comment_type
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
module.exports = LogInfo;