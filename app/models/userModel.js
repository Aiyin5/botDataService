const sql = require("./db.js");

// constructor
const User = function(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.bot_id = user.bot_id;
    this.org_id = user.org_id;
    this.level = user.level;
    this.image_url = user.image_url,
    this.html_url=user.html_url;
};
const tablename="user_info";
const tablename2="user_limit";
User.create = async (newUser, result) => {
    try {
        let res=await sql.insert(tablename,newUser);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(err, null);
    }
};
User.find = async (where,result) =>{
    try {
        let res=await sql.selectByWhere(tablename,where);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(err, null);
    }
}
User.findEmail= async (where)=>{
    try {
        let res=await sql.selectByWhere(tablename,where);
        return res;
    }
    catch (err){
        console.log(err)
        return null;
    }
}
User.updateByEmail= async (userData,where)=>{
    try {
        let res=await sql.update(tablename,userData,where);
        return res;
    }
    catch (err){
        console.log(err)
        return null;
    }
}

User.findAll = async (result)=>{
    try {
        let res=await sql.select(tablename);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(err, null);
    }
}

User.findLimt = async (where,result) =>{
    try {
        let res=await sql.selectByWhere(tablename2,where);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(err, null);
    }
}
User.addLimt = async (data,result) =>{
    try {
        let res=await sql.insert(tablename2,data);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(err, null);
    }
}


module.exports = User;