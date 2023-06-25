 const {DocxLoader} = require ("langchain/document_loaders/fs/docx");
 const { PDFLoader }= require ("langchain/document_loaders/fs/pdf");
 const cosInstance = require("../util/cosFunction")
 const {SecretId,SecretKey}= require("../config/config.json");
async function test(){
    const loader = new DocxLoader(
        "../config/刃长和刃部跳动测量规范.docx"
    );
/*    const pdfloader = new PDFLoader("../config/2023-6-17会议.pdf",{
        splitPages: false,
    });
    const pdf = await pdfloader.load();*/
    const docs = await loader.load();
    console.log(docs)
    //console.log(pdf)
}
test()
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