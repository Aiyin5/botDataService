 const {DocxLoader} = require ("langchain/document_loaders/fs/docx");
 const { PDFLoader }= require ("langchain/document_loaders/fs/pdf");
 const cosInstance = require("../util/cosFunction")
 const {SecretId,SecretKey}= require("../config/config.json");
 const removeEmoji = require("../util/dataTransform");
 const sql = require("../models/db");
 const Bot = require("../models/botModel")
 const avatorCos = require("../util/avatorCos");
 let cos = new avatorCos(SecretId,SecretKey,"aiyin-avator-1316443200","ap-shanghai");
 const crypto = require('crypto');
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
 test233()