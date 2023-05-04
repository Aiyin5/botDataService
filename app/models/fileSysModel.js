const sql = require("./db.js");
const vectorIns = require("../util/vectorIns")
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
        console.log(res);
        //增加向量保存
        //1.文本拆分
        //let texts= await vectorIns.getTextSplit().splitText(newFile.content);
        //const texts = docs.map(({ pageContent }) => pageContent);
        //2.计算向量
        //test
        //let embeds=await vectorIns.getEmbeding().embedDocuments(texts);
        //
        //3.保存数据
/*        for(let i=0;i<texts.length;i++){
            let data={
                "bot_id":newFile.bot_id,
                "doc_name":newFile.doc_name,
                "doc_type":newFile.type?newFile.type:1,
                "vector":embeds[i].toString(),
                "content":texts[i]
            }*/
            //res=await sql.insert(vectorName,data);
        //}
        console.log("end")
        result(null, res);
    }
    catch (err){
        console.log(err)
    }
};
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
File.update = async (where,result) =>{
    let condition={
        "id":where.id
    }
    try {
        let res=await sql.update(tablename,where,condition);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
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
File.deleteFileInfo = async (data,result)=>{
    try {
        let doc_name = data.doc_name;
        let res1 = await sql.delete(tablename,data);
        //delete doc vector
        let where={
            "bot_id":data.bot_id,
            "doc_name":doc_name
        }
        //let res2 = await sql.delete(vectorName,where);
        result(null, res1);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
module.exports = File;