const nodemailer =  require('nodemailer');
/**
    * 
    * @param {*} userAccount 个人邮箱的账号 ex. xxxx@qq.com
    * @param {*} pass        邮箱开启SMTP服务后得到的授权码
    * @param {*} to          邮件接收者邮箱账号
    * @param {*} params 
    * @param {*} params.subject 邮件的主题
    * @param {*} params.text    邮件的文本内容 可以为空 为空的话，是一个内容为空白的邮件
    * @param {*} params.html    邮件的HTML内容 可以为空
    */
class Email {
  constructor(userAccount, pass, to, params) {
    if (!userAccount || !pass) {
      throw new Error('个人邮箱账号或邮箱授权码不能为空')
    }
    this.userAccount = userAccount
    this.pass = pass
    if (!to) {
      throw new Error('邮件接收者邮箱账号不能为空')
    }
    this.to = to
    if (!params || params === {}) {
      throw new Error('邮件内容信息不能为空')
    }
    this.mailOptions = params
  }
  sendMail() {
   return new Promise((resolve, reject) => {
      var transporter = nodemailer.createTransport({
        // 邮箱服务的host: qq: smtp.qq.com; 163: smtp.163.com
        host: 'smtp.126.com',
        // 开启安全连接，这个开不开都可以，对安全性有要求的话，最好开启
        secureConnection: true,
        // SMTP协议端口号
        port: 465,
        auth: {
          user: this.userAccount,
          pass: this.pass,
        },
        tls: {
          rejectUnauthorized: false, // 拒绝认证就行了， 不然会报证书问题
        },
      });
      // 配置发送内容
      var mailOptions = {
        // 发件人邮箱
        from: this.userAccount,
        // 收件人邮箱, 多个邮箱地址用逗号隔开
        to: this.to,
        // 邮件主题
        subject: this.mailOptions.subject,
        html: this.mailOptions.html ? this.mailOptions.html : undefined,
      }
      console.log(mailOptions)
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      });
    })
  }
}
module.exports = Email;