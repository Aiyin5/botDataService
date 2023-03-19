const {hostId,userId,password,database,port} =require("../config/config.json");
const MysqlPool=require('../util/dataUitl');
const sqlCon= new MysqlPool({
  host: hostId,
  user: userId,
  password: password,
  database: database,
  port:port
})
module.exports = sqlCon;
