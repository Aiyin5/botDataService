const sql = require("./db.js");
// constructor
const Notion = function(notion) {
    this.bot_id = notion.bot_id;
    this.doc_name = notion.doc_name;
    this.type = notion.type;
    this.content = notion.content;
    this.page_id = notion.page_id;
    this.doc_hash = notion.doc_hash;
};
const tablename="yuliao_notion";
//const vectorName="vector_v0";
Notion.create = async (NotionFile, result) => {
    try {
        let res=await sql.insert(tablename,NotionFile);
       /* console.log(res);
        //增加向量保存
        //1.文本拆分
        let texts= await vectorIns.getTextSplit().splitText(newFile.content);
        //const texts = docs.map(({ pageContent }) => pageContent);
        //2.计算向量
        //test
        let embeds=await vectorIns.getEmbeding().embedDocuments(texts);
        //
        //3.保存数据
        for(let i=0;i<texts.length;i++){
            let data={
                "bot_id":newFile.bot_id,
                "doc_name":newFile.doc_name,
                "doc_type":newFile.type?newFile.type:1,
                "vector":embeds[i].toString(),
                "content":texts[i]
            }
            res=await sql.insert(vectorName,data);
        }
        console.log("end")*/
        result(null, res);
    }
    catch (err){
        console.log(err)
    }
};
Notion.find = async (where,result) =>{
    try {
        let res=await sql.selectByWhere(tablename,where);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
Notion.findByPage = async (Item,result) =>{
    let where={
        "bot_id":Item.bot_id
    }
    let searchCondition={
        "flag":false,
        "word":""
    }
    if(!Item.searchWord){
        searchCondition.flag=false;
    }
    else {
        searchCondition.flag=true;
        searchCondition.word=Item.searchWord;
    }
    try {
        let res=await sql.fileByPage(tablename,where,Item.page,Item.pageSize,searchCondition);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}

Notion.deleteNotionInfo = async (data,result)=>{
    try {
        let doc_name = data.doc_name;
        let res = await sql.delete(tablename,data);
        //delete doc vector
        /*let where={
            "doc_name":doc_name
        }
        res = await sql.delete(vectorName,where);*/
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
Notion.findAll = async (result) =>{
    try {
        let res=await sql.select(tablename);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
module.exports = Notion;