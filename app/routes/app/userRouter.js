const users = require("../../controllers/app/userController");
const multer = require("multer");
module.exports = app => {
    const upload = multer({
        dest: 'uploads/', // 指定上传文件的目录
        limits: { fileSize: 1 * 1024 * 1024 }
    });
    var router = require("express").Router();
    /**,
     * @swagger
     * /app/user/registerNew:
     *    post:
     *      tags:
     *      - userApi
     *      summary: 用户注册的新接口
     *      requestBody:
     *         description: 用户信息 机器人id 默认为"0" 用户的权限level 默认为2
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 name:
     *                   type: string
     *                 email:
     *                   type: string
     *                 password:
     *                   type: string
     *                 org_id:
     *                   type: string
     *                 email_check:
     *                   type: string
     *                 image_url:
     *                   type: string
     *      responses:
     *        200:
     *          description: successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  ActionType:
     *                    type: string
     *                    example: OK
     *          headers:
     *            Authorization:
     *              type: string
     *              description: 用于其他接口验权
     *        500:
     *          description: Internal Error
     *        400:
     *          description: 请求信息不完整
     *        401:
     *          description: 重其他原因导致用户创建失败
     *        402:
     *          description: 验证码错误
     * */
    router.post("/registerNew", users.createNew);


    /**,
     * @swagger
     * /app/user/register:
     *    post:
     *      tags:
     *      - userApi
     *      summary: 用户注册，只能通过手机号注册
     *      requestBody:
     *         description: 用户信息
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 name:
     *                   type: string
     *                 phone:
     *                   type: string
     *                 password:
     *                   type: string
     *                 org_id:
     *                   type: string
     *                 phone_check:
     *                   type: string
     *                 image_url:
     *                   type: string
     *      responses:
     *        200:
     *          description: successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  ActionType:
     *                    type: string
     *                    example: OK
     *          headers:
     *            Authorization:
     *              type: string
     *              description: 用于其他接口验权
     *        500:
     *          description: Internal Error
     *        400:
     *          description: 请求信息不完整
     *        401:
     *          description: 重其他原因导致用户创建失败
     *        402:
     *          description: 验证码错误
     * */
    router.post("/register", users.createByPhone);


    /**,
     * @swagger
     * /app/user/login:
     *    post:
     *      tags:
     *      - userApi
     *      summary: 用户登录
     *      requestBody:
     *         description: 用户信息 checkType登录方式为Password时代表账号密码登录，Captcha为验证码登录
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 checkType:
     *                   type: string
     *                 email:
     *                   type: string
     *                 password:
     *                   type: string
     *                 email_check:
     *                   type: string
     *      responses:
     *        200:
     *          description: successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  ActionType:
     *                    type: string
     *                    example: OK
     *                  data:
     *                    type: object
     *                    properties:
     *                      name:
     *                        type: string
     *                      email:
     *                        type: string
     *                      org_id:
     *                        type: string
     *                      bot_id:
     *                        type: string
     *                      level:
     *                        type: string
     *                      image_url:
     *                        type: string
     *                      html_url:
     *                        type: string
     *          headers:
     *            Authorization:
     *              type: string
     *              description: 用于其他接口验权
     *        500:
     *          description: Internal Error
     *        400:
     *          description: 邮箱或者密码正确
     * */
    router.post("/login", users.findByWhere);

    /**,
     * @swagger
     * /app/user/loginByPhone:
     *    post:
     *      tags:
     *      - userApi
     *      summary: 用户登录
     *      requestBody:
     *         description: 用户信息 checkType登录方式为Password时代表账号密码登录，Captcha为验证码登录
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 check_type:
     *                   type: string
     *                 phone:
     *                   type: string
     *                 password:
     *                   type: string
     *                 phone_check:
     *                   type: string
     *      responses:
     *        200:
     *          description: successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  ActionType:
     *                    type: string
     *                    example: OK
     *                  data:
     *                    type: object
     *                    properties:
     *                      name:
     *                        type: string
     *                      phone:
     *                        type: string
     *                      org_id:
     *                        type: string
     *                      bot_id:
     *                        type: string
     *                      level:
     *                        type: string
     *                      image_url:
     *                        type: string
     *                      html_url:
     *                        type: string
     *          headers:
     *            Authorization:
     *              type: string
     *              description: 用于其他接口验权
     *        500:
     *          description: Internal Error
     *        400:
     *          description: 邮箱或者密码正确
     * */
    router.post("/loginByPhone", users.findByPhone);

    router.post("/botUser", users.findByBot);

    /**,
     * @swagger
     * /app/user/captcha:
     *    post:
     *      tags:
     *      - userApi
     *      summary: 验证码
     *      requestBody:
     *         description: register为1时表示注册
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *                 register:
     *                   type: number
     *      responses:
     *        200:
     *          description: successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  ActionType:
     *                    type: string
     *                    example: OK
     *                    description: OK证明验证码发送成功.
     *        500:
     *          description: InternalError
     *        400:
     *          description: 请求信息不全
     *        401:
     *          description: 邮箱重复
     * */
    router.post("/captcha", users.captcha);

    /**,
     * @swagger
     * /app/user/ai:
     *    post:
     *      tags:
     *      - userApi
     *      summary: ai域名检测
     *      requestBody:
     *         description: ai域名信息
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 org_id:
     *                   type: string
     *      responses:
     *        200:
     *          description: successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  ActionType:
     *                    type: string
     *                    example: OK
     *                    description: OK证明域名可用.
     *        500:
     *          description: InternalError
     *        400:
     *          description: 请求信息不全
     *        401:
     *          description: 域名重复
     * */
    router.post("/ai", users.aicheck);

    /**,
     * @swagger
     * /app/user/emailCheck:
     *    post:
     *      tags:
     *      - userApi
     *      summary: email域名检测
     *      requestBody:
     *         description: email域名信息
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *      responses:
     *        200:
     *          description: successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  ActionType:
     *                    type: string
     *                    example: OK
     *                    description: OK证明域名可用.
     *        500:
     *          description: InternalError
     *        400:
     *          description: 请求信息不全
     * */
    router.post("/emailCheck", users.emailCheck);

    /**,
     * @swagger
     * /app/user/phoneCheck:
     *    post:
     *      tags:
     *      - userApi
     *      summary: phone唯一性检测
     *      requestBody:
     *         description: phone信息
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 phone:
     *                   type: string
     *      responses:
     *        200:
     *          description: successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  ActionType:
     *                    type: string
     *                    example: OK
     *                    description: OK证明域名可用.
     *        500:
     *          description: InternalError
     *        400:
     *          description: 请求信息不全
     * */
    router.post("/phoneCheck", users.phoneCheck);


    /**,
     * @swagger
     * /app/user/idCheck:
     *    post:
     *      tags:
     *      - userApi
     *      summary: id重复性性检测检测
     *      requestBody:
     *         description: id信息
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *      responses:
     *        200:
     *          description: successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  ActionType:
     *                    type: string
     *                    example: OK
     *                    description: OK证明id存在,False代表id不存在.
     *        500:
     *          description: InternalError
     *        400:
     *          description: 请求信息不全
     * */
    router.post("/idCheck", users.idCheck);



    /**,
     * @swagger
     * /app/user/image:
     *    post:
     *      tags:
     *      - userApi
     *      summary: 接收图片文件上传并返回url
     *      requestBody:
     *         description: 图片信息  file_name //文件名称 采用ai域名信息   file:文件
     *         required: true
     *         content:
     *           multipart/form-data:
     *             schema:
     *               type: object
     *               properties:
     *                 file_name:
     *                   type: string
     *                 file:
     *                   format: binary
     *      responses:
     *        200:
     *          description: successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  ActionType:
     *                    type: string
     *                  image_url:
     *                    type: string
     *        500:
     *          description: Internal Error
     *        400:
     *          description: 请求参数出错
     * */
    router.post("/image",upload.single('file'), users.imageUpload);

    /**,
     * @swagger
     * /app/user/imageUpdate:
     *    post:
     *      tags:
     *      - userApi
     *      summary: 接收图片文件和链接更新图像内容
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 图片信息  image_url //文件链接   file:文件
     *         required: true
     *         content:
     *           multipart/form-data:
     *             schema:
     *               type: object
     *               properties:
     *                 image_url:
     *                   type: string
     *                 file:
     *                   format: binary
     *      responses:
     *        200:
     *          description: successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  ActionType:
     *                    type: string
     *                  image_url:
     *                    type: string
     *        500:
     *          description: Internal Error
     *        400:
     *          description: 请求参数出错
     * */
    router.post("/imageUpdate",upload.single('file'), users.imageUpdate);

    /**,
     * @swagger
     * /app/user/botInfo:
     *    post:
     *      tags:
     *      - userApi
     *      summary: 获取机器人的基本信息
     *      requestBody:
     *         description: 用户基本信息  email //用户邮箱   bot_id //机器人id
     *         required: true
     *         content:
     *           application/json::
     *             schema:
     *               type: object
     *               properties:
     *                 bot_id:
     *                   type: string
     *      responses:
     *        200:
     *          description: successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  ActionType:
     *                    type: string
     *                  image_url:
     *                    type: string
     *                  name:
     *                    type: string
     *                  bgImg_url:
     *                    type: string
     *                  contact:
     *                    type: string
     *                  faq_contents:
     *                    type: string
     *                  welcomes:
     *                    type: string
     *        500:
     *          description: Internal Error
     *        400:
     *          description: 请求参数出错
     * */
    router.post("/botInfo", users.botInfo);

    /**,
     * @swagger
     * /app/user/botInfoUpdate:
     *    post:
     *      tags:
     *      - userApi
     *      summary: 更新机器人的基本信息
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 用户基本信息和机器人基本信息 email //用户邮箱   bot_id //机器人id  image_url //头像链接 name //昵称 bgImg_url//背景图像  contact//二维码链接  faq_contents//常见问题  welcomes//欢迎语
     *         required: true
     *         content:
     *           application/json::
     *             schema:
     *               type: object
     *               properties:
     *                  image_url:
     *                    type: string
     *                  name:
     *                    type: string
     *                  bgImg_url:
     *                    type: string
     *                  contact:
     *                    type: string
     *                  faq_contents:
     *                    type: string
     *                  welcomes:
     *                    type: string
     *      responses:
     *        200:
     *          description: successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  ActionType:
     *                    type: string
     *        500:
     *          description: Internal Error
     *        400:
     *          description: 请求参数出错
     * */
    router.post("/botInfoUpdate", users.botInfoUpdate);

    /**,
     * @swagger
     * /app/user/updateUrl:
     *    post:
     *      tags:
     *      - userApi
     *      summary: 更新机器人的html链接
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description:   bot_id //机器人id
     *         required: true
     *         content:
     *           application/json::
     *             schema:
     *               type: object
     *               properties:
     *                  bot_id:
     *                    type: string
     *                  html_url:
     *                    type: string
     *      responses:
     *        200:
     *          description: successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  ActionType:
     *                    type: string
     *                  message:
     *                    type: string
     *        500:
     *          description: Internal Error
     *        400:
     *          description: 请求参数出错
     * */
    router.post("/updateUrl", users.updateUrl);


    /**,
     * @swagger
     * /app/user/botIdByUrl:
     *    post:
     *      tags:
     *      - userApi
     *      summary: 根据html_url获取bot_id
     *      requestBody:
     *         description:     html_url//子域名地址
     *         required: true
     *         content:
     *           application/json::
     *             schema:
     *               type: object
     *               properties:
     *                  html_url:
     *                    type: string
     *      responses:
     *        200:
     *          description: successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  ActionType:
     *                    type: string
     *                  message:
     *                    type: string
     *                  bot_id:
     *                    type: string
     *        500:
     *          description: Internal Error
     *        400:
     *          description: 请求参数出错
     * */
    router.post("/botIdByUrl", users.botIdByUrl);


    /**,
     * @swagger
     * /app/user/UserLimit:
     *    post:
     *      tags:
     *      - userApi
     *      summary: 根据bot_id获取用户的套餐使用情况
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description:   bot_id //机器人id
     *         required: true
     *         content:
     *           application/json::
     *             schema:
     *               type: object
     *               properties:
     *                  bot_id:
     *                    type: string
     *      responses:
     *        200:
     *          description: successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  ActionType:
     *                    type: string
     *                  message:
     *                    type: string
     *                  userLimt:
     *                    type: object
     *                    properties:
     *                      user_type:
     *                        type: number
     *                      yuliao_count:
     *                        type: number
     *                      standard_count:
     *                        type: number
     *                      answer_count:
     *                        type: number
     *        500:
     *          description: Internal Error
     *        400:
     *          description: 请求参数出错
     * */
    router.post("/UserLimit", users.UserLimit);


    router.post("/limitInside", users.UserLimit);


    /**,
     * @swagger
     * /app/user/phoneCaptcha:
     *    post:
     *      tags:
     *      - userApi
     *      summary: 验证码
     *      requestBody:
     *         description: register为1时表示注册
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 phone:
     *                   type: string
     *                 register:
     *                   type: number
     *      responses:
     *        200:
     *          description: successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  ActionType:
     *                    type: string
     *                    example: OK
     *                    description: OK证明验证码发送成功.
     *        500:
     *          description: InternalError
     *        400:
     *          description: 请求信息不全
     *        401:
     *          description: 手机号重复
     * */
    router.post("/phoneCaptcha", users.phoneCaptcha);


    app.use('/app/user', router);
};
