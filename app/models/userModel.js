const sql = require("./db.js");

// constructor
const User = function(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.bot_id = user.bot_id;
    this.org_id = user.org_id;
    this.level = user.level;
    this.image_url = user.image_url
};
const tablename="user_info";
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
User.findEmail= async (where)=>{
    try {
        let res=await sql.selectByWhere(tablename,where);
        return res;
    }
    catch (err){
        console.log(err)
        return err;
    }
}
User.updateByEmail= async (userData,where)=>{
    try {
        let res=await sql.update(tablename,userData,where);
        return res;
    }
    catch (err){
        console.log(err)
        return err;
    }
}
module.exports = User;