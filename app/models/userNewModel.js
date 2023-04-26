const sql = require("./db.js");

// constructor
const User_New = function(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.bot_id = user.bot_id;
    this.level = user.level;
    this.avator = user.avator;
    this.ai_area = user.ai_area;
};
const tablename="user_info_new";
User.create = async (newUser, result) => {
    try {
        let res=await sql.insert(tablename,newUser);
        result(null, res);
    }
    catch (err){
        console.log(err)
    }
};
User.find = async (where,result) =>{
    try {
        let res=await sql.selectByWhere(tablename,where);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}


module.exports = User;