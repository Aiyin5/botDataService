const fs = require("fs")
const COS = require('cos-nodejs-sdk-v5');

class avatorCos {
    CosItem;
    Bucket;
    Region;

    constructor(SecretId,SecretKey,bucket,region) {
        this.CosItem = new COS({
            SecretId: SecretId,
            SecretKey: SecretKey,
        })
        this.Bucket=bucket
        this.Region=region
    }
    async getItem(path,name){
        try {
            let data = await this.CosItem.getObject({
                Bucket: this.Bucket, /* 必须 */
                Region: this.Region,    /* 必须 */
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
                Bucket: this.Bucket, /* 必须 */
                Region: this.Region,    /* 必须 */
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
                Bucket: this.Bucket, /* 必须 */
                Region: this.Region,    /* 必须 */
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
                Bucket: this.Bucket, /* 填入您自己的存储桶，必须字段 */
                Region: this.Region,  /* 存储桶所在地域，例如ap-beijing，必须字段 */
                Key: name,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
            });
        } catch (err) {
            console.log(err);
            return err
        }
    }
    async getObjectUrl(name){
        try {
            let data = await this.CosItem.getObjectUrl({
                Bucket: this.Bucket, /* 必须 */
                Region: this.Region,    /* 必须 */
                Key: name,              /* 必须 */
                Sign: true,
            });
            return data;
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = avatorCos;
