// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs-sms");
const {SecretId,SecretKey}= require("../config/config.json");
const SmsClient = tencentcloud.sms.v20210111.Client;
const clientConfig = {
    credential: {
        secretId: SecretId,
        secretKey: SecretKey,
    },
    region: "ap-nanjing",
    profile: {
        httpProfile: {
            endpoint: "sms.tencentcloudapi.com",
        },
    },
};
class smsInstance {
    SmsItem;
    constructor() {
        this.SmsItem = new SmsClient(clientConfig)
    }
    async sendRegister(num,code){
        const params = {
            "PhoneNumberSet": [
                num
            ],
            "SmsSdkAppId": "1400848626",
            "SignName": "深海蓝鳍科技",
            "TemplateId": "1905196",
            "TemplateParamSet": [
                code,
                "5"
            ]
        };
        let res=""
       await this.SmsItem.SendSms(params).then(
            (data) => {
                console.log(data);
                res =  data
            },
            (err) => {
                console.error("error", err);
                res = null
            }
        );
        return res
    }
    async sendLogin (num,code){
        const params = {
            "PhoneNumberSet": [
                num
            ],
            "SmsSdkAppId": "1400848626",
            "SignName": "深海蓝鳍科技",
            "TemplateId": "1905195",
            "TemplateParamSet": [
                code,
                "5"
            ]
        };
        let res=""
        await this.SmsItem.SendSms(params).then(
            (data) => {
                console.log(data);
                res =  data
            },
            (err) => {
                console.error("error", err);
                res = null
            }
        );
        return res
    }
}
module.exports = smsInstance;


