const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const JWT = require("./app/util/JWT");
const langChainTool = require("./app/util/langchainTool")
const vectorIns = require("./app/util/vectorIns")
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require('swagger-jsdoc');
const {localSer} = require("./app/config/config.json")
const swaggerOpt = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "amabot backend API",
      version: "1.0.0",
      description: "amabot backend API"
    },
    servers:[
      {
        url:localSer
      }
    ],
  },
  apis:['./app/routes/*/*.js',' ./app/routes/*.js']
};

const specs = swaggerJsdoc(swaggerOpt)
app.use("/api-docs/",swaggerUi.serve,swaggerUi.setup(specs))
app.use(express.json({ limit: '50mb' }))/* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use((req,res,next)=>{
  // 如果token有效 ,next()
  // 如果token过期了, 返回401错误
  if(req.url==="/api-docs"){
    console.log("rv /api-docs")
    next()
    return;
  }
  if(req.url==="/app/user/captcha"){
    console.log("rv /app/user/captcha")
    console.log(req.body)
    next()
    return;
  }
  if(req.url==="/app/user/login"){
    console.log("rv /app/user/login")
    next()
    return;
  }
  if(req.url==="/app/user/register"){
    next()
    return;
  }
  if(req.url==="/app/user/registerNew"){
    next()
    return;
  }
  if(req.url==="/app/user/ai"){
    next()
    return;
  }
  if(req.url==="/app/bot/botPre"){
    next()
    return;
  }
  if(req.url==="/app/bot/botUnst"){
    next()
    return;
  }
  if(req.url==="/app/bot/botInfo"){
    next()
    return;
  }
  if(req.url==="/app/file/botFile"){
    next()
    return;
  }
  if(req.url==="/app/notion/botnotion"){
    next()
    return;
  }
  if(req.url==="/app/log/create"){
    next()
    return;
  }
  if(req.url==="/app/log/botId"){
    next()
    return;
  }
  if(!req.headers["authorization"]){
    res.status(401).send({errCode:"-1",errorInfo:"没有权限"})
  }
  const token = req.headers["authorization"].split(" ")[1]
  if(token){
    var payload = JWT.verify(token)
    // console.log(payload)
    if(payload){
      const newToken = JWT.generate({
        _botid:payload.bot_id,
        email: payload.email,
      },"2d")
      res.header("Authorization",newToken)
      next()
    }else{
      res.status(401).send({errCode:"-1",errorInfo:"token过期"})
    }
  }
})
/*
async function init(){
 await langChainTool.inint();
}
*/

require("./app/routes/app/userRouter")(app);
require("./app/routes/app/botRouter")(app);
require("./app/routes/app/fileRouter")(app);
require("./app/routes/app/notionRouter")(app);
require("./app/routes/app/logRouter")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3003;
vectorIns.inint().then(()=>{
  console.log("finish init");
})
/*init().then(()=>{
  console.log("finish init");
});*/
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
