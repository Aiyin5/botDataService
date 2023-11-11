const sql = require("./db.js");

const ModifiedInfo = function(Info) {
    this.uuid = Info.uuid;
    this.bot_id = Info.bot_id;
    this.prompt = Info.prompt;
    this.completion = Info.completion;
    this.modified_answer = Info.modified_answer;
    this.log_id = Info.log_id;
    this.fix_info = Info.fix_info;
};
const modified_table ="modified_info";

ModifiedInfo.create_modified_table  = async (newInfo, result) => {
    try {
        let res=await sql.insert(modified_table,newInfo);
        result(null, res);
    }
    catch (err){
        result(err, null);
    }
}
ModifiedInfo.deleteModifiedInfo = async (where, result) => {
    try {
        let res=await sql.delete(modified_table,where);
        result(null, res);
    }
    catch (err){
        result(err, null);
    }
}

ModifiedInfo.getModifiedInfo = async (where, result) => {
    let condition = {
        id:where.id
    }
    let page = 1;
    if(where.page){
        page = where.page;
    }
    let pagerSize = 10;
    if(where.pagerSize){
        pagerSize = where.pagerSize;
    }
    let orderFlag = false;
    if(where.orderFlag){
        orderFlag = where.orderFlag;
    }
    try {
        let res=await sql.modifiedInfoByPageOrder(modified_table,condition,page,pagerSize,orderFlag);
        result(null, res);
    }
    catch (err){
        result(err, null);
    }
}

module.exports = ModifiedInfo;