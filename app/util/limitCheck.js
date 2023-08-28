const User = require("../models/userModel");

exports.limitCheck = async (bot_id)=>{
    console.log(bot_id)
    let ans = {
        action:true,
        type:0
    }
    let where = {
        "bot_id":bot_id
    }
    await User.findLimt(where,(err, data)=>{
        if (err){
            console.log(err)
            ans.action =  false
        }
        else {
            console.log(data)
            if(data.length==1){
                ans.type = data[0].user_type;
                if(data[0].user_type === 0){
                    //console.log("type 0")
                    if(data[0].yuliao_count> 10000 || data[0].standard_count> 30 ){
                        ans.action =  false
                    }
                }
                else if(data[0].user_type === 1){
                    //console.log("type 1")
                    if(data[0].yuliao_count> 50000 || data[0].standard_count> 999){
                        ans.action =  false
                    }
                }
                else if(data[0].user_type === 2){
                    //console.log("type 2")
                    if(data[0].yuliao_count> 300000 ){
                        ans.action =  false
                    }
                }
                else if(data[0].user_type === 3){
                    //console.log("type 2")
                    if(data[0].yuliao_count> 1000000 ){
                        ans.action =  false
                    }
                }
            }
            else {
                //console.log("type err")
                ans.action =  false
            }
        }
    })
    return ans
}
