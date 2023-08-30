const sql = require("./db.js");
const vectorIns = require("../util/vectorIns")
const User = require("./userModel");
const {limitCheck, limitCheckByLen} = require("../util/limitCheck");
// constructor
const File = function(file) {
    this.bot_id = file.bot_id;
    this.doc_name = file.doc_name;
    this.type = file.type;
    this.content = file.content;
};
const tablename="yuliao_text";
const vectorName="vector_v0";
File.create = async (newFile, result) => {
    try {
        let res=await sql.insert(tablename,newFile);
        let trimmedStr = newFile.content.replace(/\s/g, ""); // 使用正则表达式去除空格
        let con_length = trimmedStr.length;
        let where={
            "bot_id":newFile.bot_id
        }
        let updateData={
            "columnName":"yuliao_count",
            "increaseAmount" :con_length
        }
        await User.updateLimit(updateData,where, (err, data)=> {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        })
    }
    catch (err){
        console.log(err)
    }
};
File.findAll= async(result) =>{
    try {
        let res=await sql.select(tablename);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}

File.find = async (where,result) =>{
    try {
        let res=await sql.selectByWhere(tablename,where);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
File.newfind =async function (where){
    try {
        let res=await sql.selectByWhere(tablename,where);
        return  res;
    }
    catch (err){
        console.log(err)
        return null;
    }
}
File.update = async (where,result) =>{
    let condition={
        "id":where.id
    }
    try {
        let data1 = await sql.selectByWhere(tablename,condition);
        if(data1.length!=1){
            result("查询出错，请联系管理员",null);
        }
        else {

            let trimmedStr1 = data1[0].content.replace(/\s/g, ""); // 使用正则表达式去除空格
            let doc_len = trimmedStr1.length;
            let trimmedStr2 = where.content.replace(/\s/g, ""); // 使用正则表达式去除空格
            let doc_len2 = trimmedStr2.length;
            if(doc_len2>doc_len)
            {
                let limit_res = await limitCheckByLen(data1[0].bot_id,doc_len2-doc_len)
                if(!limit_res.yuliao_action){
                    let err={
                        action:"OK",
                        message:"超过当前版本容量，请升级版本"
                    }
                    result(err, null);
                    return
                }
            }
            let res=await sql.update(tablename,where,condition);
            let whereCon={
                "bot_id":data1[0].bot_id
            }
            let updateData={
                "columnName":"yuliao_count",
                "increaseAmount" :doc_len2-doc_len
            }
            await User.updateLimit(updateData,whereCon, (err, data)=>{
                if(err){
                    result(err, null);
                }
                else {
                    result(null, res);
                }
            })
        }
    }
    catch (err){
        console.log(err)
        result(err, null);
    }
}

File.findByPage = async (where,result) =>{
    let condition={
        "bot_id":where.bot_id,
        "type":where.type
    }
    let searchCondition={
        "flag":false,
        "word":""
    }
    if(!where.searchWord){
        searchCondition.flag=false;
    }
    else {
        searchCondition.flag=true;
        searchCondition.word=where.searchWord;
    }
    try {
        let res=await sql.fileByPage(tablename,condition,where.page,where.pageSize,searchCondition);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
File.deleteFileInfo = async (data,limitInfo,result)=>{
    try {
        let doc_name = data.doc_name;
        let res1 = await sql.delete(tablename,data);
        //delete doc vector
        let where={
            "bot_id":limitInfo.bot_id
        }
        let updateData={
            "columnName":"yuliao_count",
            "increaseAmount" :0-limitInfo.doc_length
        }
        await User.updateLimit(updateData,where, (err, data)=>{
            if(err){
                result(err, null);
            }
            else {
                result(null, res1);
            }
        })
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
module.exports = File;