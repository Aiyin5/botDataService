const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const JWT = require("./app/util/JWT");

const app = express();

app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use((req,res,next)=>{
  // 如果token有效 ,next()
  // 如果token过期了, 返回401错误
  if(req.url==="/app/user/login"){
    console.log("rv /app/user/login")
    next()
    return;
  }
  if(req.url==="/app/user/register"){
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
        _id: payload.id,
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

require("./app/routes/app/userRouter")(app);
require("./app/routes/app/botRouter")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
