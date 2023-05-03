const bots = require("../../controllers/app/botController");
module.exports = app => {
    /**,
     *  components:
     *         securitySchemes:
     *             bearerAuth:            # arbitrary name for the security scheme
     *     type: http
     *     scheme: bearer
     *     bearerFormat: JWT    # optional, arbitrary value for documentation purposes
     */
    const bots = require("../../controllers/app/botController");

    var router = require("express").Router();

    // getBotInfo
    //{input: string
    // res:}
    router.post("/bot", bots.findById);


    // updateBotInfo
    router.post("/updateBot", bots.updateBot);


    // addPreInfo
    router.post("/addPreInfo", bots.addPreInfo);

    /**,
     * @swagger
     * /app/bot/addStandardInfos:
     *    post:
     *      tags:
     *      - botApi
     *      summary: 增加标准问答
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 标准问答信息
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: array[{bot_id:string;prompt:string;completion:string}...]
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
     *        401:
     *          description: 没有权限
     * */
    router.post("/addStandardInfos", bots.addMultPreInfo);

    // addMultPreInfo
    router.post("/addMultPreInfo", bots.addMultPreInfo);

    /**,
     * @swagger
     * /app/bot/deleteStandardInfo:
     *    post:
     *      tags:
     *      - botApi
     *      summary: 删除单个标准问答
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 标准问答信息
     *         required: true
     *         content:
     *           application/json:
     *            schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: number
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
     *        500:
     *          description: Internal Error
     *        401:
     *          description: 没有权限
     * */
    router.post("/deleteStandardInfo", bots.deletPreInfo);

    // deletPreInfo
    router.post("/deletPreInfo", bots.deletPreInfo);


    /**,
     * @swagger
     * /app/bot/updateStandardInfo:
     *    post:
     *      tags:
     *      - botApi
     *      summary: 更新单个标准问答
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 标准问答信息
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: number
     *                 bot_id:
     *                   type: string
     *                 prompt:
     *                   type: string
     *                 completion:
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
     *        500:
     *          description: Internal Error
     *        401:
     *          description: 没有权限
     * */
    router.post("/updateStandardInfo", bots.updatePreInfo);
    // updatePreInfo
    router.post("/updatePreInfo", bots.updatePreInfo);

    // getPreInfo
    router.post("/getPreInfo", bots.getPreInfo);


    /**,
     * @swagger
     * /app/bot/standardInfo:
     *    post:
     *      tags:
     *      - botApi
     *      summary: 获取机器人的标准问答
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 机器人信息  page代表第几页，从1开始，pageNumber代表每页的数量
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 bot_id:
     *                   type: string
     *                 page:
     *                   type: number
     *                 pageNumber:
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
     *                  data:
     *                    type: object
     *                    properties:
     *                      count:
     *                        type: number
     *                      content:
     *                        type: array[{id:number//编号  bot_id:string //机器人id prompt:string //问题  completion:string //回答  org_prompt:string//原始问题  date:number//创建时间}}]
     *        500:
     *          description: Internal Error
     *        401:
     *          description: 没有权限
     * */
    router.post("/standardInfo", bots.getPreInfoByPage);

    // getUnstInfo
    router.post("/getUnstInfo", bots.getUnstInfo);


    /**,
     * @swagger
     * /app/bot/searchStandardInfo:
     *    post:
     *      tags:
     *      - botApi
     *      summary: 搜索机器人的标准问答
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 查询信息 content为搜索的文字内容
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 bot_id:
     *                   type: string
     *                 content:
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
     *                  data:
     *                    type: object
     *                    properties:
     *                      count:
     *                        type: number
     *                      content:
     *                        type: array[{id:number//编号  bot_id:string //机器人id prompt:string //问题  completion:string //回答  org_prompt:string//原始问题  date:number//创建时间}}]
     *        500:
     *          description: Internal Error
     *        401:
     *          description: 没有权限
     * */
    router.post("/searchStandardInfo", bots.searchStandardInfo);

    // addUnstInfo
    router.post("/addUnstInfo", bots.addUnstInfo);

    // updateUnstInfo
    router.post("/updateUnstInfo", bots.updateUnstInfo);

    //for servertest
    router.post("/botUnst", bots.getUnstInfo);
    router.post("/botPre", bots.getPreInfo);
    router.post("/botInfo", bots.findById);

    router.post("/botPrebyPage", bots.searchStandardInfo);
    app.use('/app/bot', router);
};
