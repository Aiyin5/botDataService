 const {DocxLoader} = require ("langchain/document_loaders/fs/docx");
 const { PDFLoader }= require ("langchain/document_loaders/fs/pdf");
 const cosInstance = require("../util/cosFunction")
 const {SecretId,SecretKey}= require("../config/config.json");
 const removeEmoji = require("../util/dataTransform");
 const sql = require("../models/db2");
 const Bot = require("../models/botModel")
 const Uesr = require("../models/userModel")
 const avatorCos = require("../util/avatorCos");
 let cos = new avatorCos(SecretId,SecretKey,"aiyin-avator-1316443200","ap-shanghai");
 const crypto = require('crypto');
 const smsInstance = require("../util/smsTool");
 const JWT = require("../util/JWT");
 const Log = require("../models/logModel");
 const LogInfo = require("../models/logModel");
 const {limitCheck} = require("../util/limitCheck");
 const {selectByPageId} = require("../util/dataUitl")
async function test(){
//     const loader = new DocxLoader(
//         "../config/刃长和刃部跳动测量规范.docx"
//     );
    const pdfloader = new PDFLoader("../config/2020-01-17__江苏安靠智能输电工程科技股份有限公司__300617__安靠智电__2019年__年度报告.pdf",{
        splitPages: false,
    });
    const pdf = await pdfloader.load();
    //const docs = await loader.load();
    console.log(pdf)
    //console.log(pdf)
    console.log(pdf[0].pageContent.length)
}
//test()
 async function test02(){
     let cos = new cosInstance(SecretId,SecretKey);
     let flag = await cos.getObjectUrl("0victor.doc")
     console.log(flag)
     if(flag.statusCode===200){
         let downloadUrl = flag.Url
         console.log(downloadUrl)
     }
     else {
         console.log(flag.statusCode)
         let downloadUrl = flag.Url
         console.log(downloadUrl)
     }
 }
// test02()
 async function sdqlTest(){
     Bot.addMultPreInfo ([{"bot_id":"suosuo1221@126.com","prompt":"测试","completion":"测试"}], (err, data) => {
         if (err){
             console.log(err)
         }
         else {
             console.log(data.insertId)
             console.log(data)
         }
     });
 }
 //sdqlTest()

 async function testavator(){
     let sttr="E889BEE59BA0E6B58BE8AF95412E889BEE59BA0251689492347385"
     let imageRes = await cos.getItem("../config/222222.jpeg",sttr)
     //let imageRes = await cos.upload("../config/126.jpeg","test123.png")
     console.log(imageRes)
     console.log("https://"+imageRes.Location)
 }
 //testavator()

 async function test233(){
     let ans=null
     const utf8Bytes = Buffer.from(ans, "utf8");
     console.log(utf8Bytes)

 }
 //test233()

 async function test23333(){
     let curTime = Date.now();
     const key = crypto.randomBytes(4).toString('hex');
     let timest = curTime.toString()+key
     console.log(timest)
 }
 //test23333()
 async function sdqlTest2() {
     let curData;
     await Uesr.findAll((err, data) => {
         if (err) {
             console.log(err)
         } else {
             curData = data
             console.log(data)
         }
     });
     for (let item of curData) {
         console.log(item.bot_id)
         let tepData = {
             "bot_id": item.bot_id
         }
         await Uesr.addLimt(tepData, (err, data) => {
             if (err) {
                 console.log(err)
             } else {
                 console.log(data)
             }
         })
     }
 }

 //sdqlTest2()


 async function smsTest(){
    let smsTool = new smsInstance();
    // let res = await smsTool.sendRegister("18817830136","456");
    // console.log(res);
    let res2 = await smsTool.sendLogin("18817830136","789");
    console.log(res2);
 }
// smsTest()

 async function lys(){
     const commData = {
         "comment_type":1
     };
     let where ={
         "bot_id":"3",
         "question":"测试问题3"
     }
     await Log.findLast(where, (err, data) => {
         if (err){
             console.log(err)
         }
             // res.status(500).send({
             //     message:
             //         err.message || "Some error occurred while retrieving tutorials."
             // });
         else {
             console.log(data)
             console.log(data[0].id)
         }
     })
 }
 //lys()

 async function commentUpdate(){
     await LogInfo.findAll(async (err, data) => {
         if(err){
             console.log(err)
         }
         else {
             //console.log(data)
             for (let item of data){
                 //console.log(item)
                 if(item.answer.includes('抱歉') || item.answer.includes('sorry') || item.answer.includes('无法回答') ){
                     console.log(item)
                     if(item.bot_id){
                         let logData={
                             "comment_type":3
                         }
                         let logWhere ={
                             "id":item.id
                         }
                         await LogInfo.updateComment(logData,logWhere,(err, data)=>{
                                if(err){
                                    console.log(err)
                                }
                                else {
                                    console.log(data)
                                }
                         })
                     }
                 }
             }
         }
     })
 }
 //commentUpdate()

 async function limitCheck2(){
     const tableName="log_info";
     let where={
         uuid:"",
         bot_id:"1"
     }
     let data = await sql.selectByPageId(tableName,where,1,5,100)
     console.log(data)
 }
 limitCheck2()
