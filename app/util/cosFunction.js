const fs = require("fs")
const COS = require('cos-nodejs-sdk-v5');

class cosInstance {
    CosItem;
    constructor(SecretId,SecretKey) {
        this.CosItem = new COS({
            SecretId: SecretId,
            SecretKey: SecretKey,
        })
    }
    async getItem(path,name){
        try {
            let data = await this.CosItem.getObject({
                Bucket: 'douyin-1316443200', /* 必须 */
                Region: 'ap-shanghai',    /* 必须 */
                Key: name,              /* 必须 */
                Output: path,
            });
            return data;
        } catch (err) {
            console.log(err);
        }
    }
    async upload (path,name){
        try {
            let data = await this.CosItem.putObject({
                Bucket: 'douyin-1316443200', /* 必须 */
                Region: 'ap-shanghai',    /* 必须 */
                Key: name,              /* 必须 */
                Body: fs.createReadStream(path), // 上传文件对象
                ContentLength: fs.statSync(path).size
            });
            return data;
        } catch (err) {
            console.log(err);
        }
    }
    async upload (path,name){
        try {
            let data = await this.CosItem.putObject({
                Bucket: 'douyin-1316443200', /* 必须 */
                Region: 'ap-shanghai',    /* 必须 */
                Key: name,              /* 必须 */
                Body: fs.createReadStream(path), // 上传文件对象
                ContentLength: fs.statSync(path).size
            });
            return data;
        } catch (err) {
            console.log(err);
        }
    }
    async deleteObject(name){
        try {
            return  await this.CosItem.deleteObject({
                Bucket: 'douyin-1316443200', /* 填入您自己的存储桶，必须字段 */
                Region: 'ap-shanghai',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
                Key: name,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
            });
        } catch (err) {
            console.log(err);
            return err
        }
    }
}
module.exports = cosInstance;
