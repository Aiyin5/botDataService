const users = require("../../controllers/app/userController");
module.exports = app => {
    const users = require("../../controllers/app/userController");

    var router = require("express").Router();


    /**,
     * @swagger
     * /app/user/registerNew:
     *    post:
     *      tags:
     *      - userApi
     *      summary: 用户注册的新接口
     *      requestBody:
     *         description: 用户信息 机器人id 默认为"0" 用户的权限 默认为2
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
     *                 bot_id:
     *                   type: string
     *                 level:
     *                   type: number
     *                 org_id:
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
     *      summary: 用户注册的老接口
     *      requestBody:
     *         description: 用户信息 机器人id 默认为"0" 用户的权限 默认为2
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
     *                 bot_id:
     *                   type: string
     *                 level:
     *                   type: number
     *                 org_id:
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
    router.post("/register", users.create);

    /**,
     * @swagger
     * /app/user/login:
     *    post:
     *      tags:
     *      - userApi
     *      summary: 用户登录
     *      requestBody:
     *         description: 用户信息
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *                 password:
     *                   type: string
     *                email_check:
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



    router.post("/botUser", users.findByBot);

    /**,
     * @swagger
     * /app/user/captcha:
     *    post:
     *      tags:
     *      - userApi
     *      summary: 验证码
     *      requestBody:
     *         description: 邮箱
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

    app.use('/app/user', router);
};
