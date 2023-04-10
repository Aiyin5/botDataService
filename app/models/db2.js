const {hostId2,userId2,password2,database2,port2} =require("../config/config.json");
const MysqlPool=require('../util/dataUitl');
const sqlCon= new MysqlPool({
    host: hostId2,
    user: userId2,
    password: password2,
    database: database2,
    port:port2
})
module.exports = sqlCon;
