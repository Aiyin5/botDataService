const sql = require("./db2.js");

// constructor
const LogInfo = function(log) {
    this.bot_id = log.bot_id;
    this.question = log.question;
    this.answer = log.answer;
    this.other = log.other;
};
const tablename="log_info";
LogInfo.create = async (newLog, result) => {
    try {
        let res=await sql.insert(tablename,newLog);
        result(null, res);
    }
    catch (err){
        console.log(err)
    }
};
LogInfo.find = async (where,result) =>{
    try {
        let res=await sql.selectByWhere(tablename,where);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
module.exports = LogInfo;