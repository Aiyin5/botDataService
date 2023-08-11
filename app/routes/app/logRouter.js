const logs = require("../../controllers/app/logController");
module.exports = app => {
    const logs = require("../../controllers/app/logController");

    var router = require("express").Router();



    /**,
     * @swagger
     * /app/log/logInfo:
     *    post:
     *      tags:
     *      - logInfoAip
     *      summary: 根据机器人id获取历史问答信息
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 历史信息信息  page代表第几页，从1开始，pageSize代表每页的数量，comment_type:0为全部。1为点赞，2为点踩，默认为0
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
     *                 pageSize:
     *                   type: number
     *                 comment_type:
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
     *                        type: array[{id:number//编号  bot_id:string //机器人id question:string //问题  answer:string//答案  create_date:number//创建时间}}]
     *        500:
     *          description: Internal Error
     *        401:
     *          description: 没有权限
     * */
    router.post("/logInfo", logs.findByPage);


    /**,
     * @swagger
     * /app/log/commentInfo:
     *    post:
     *      tags:
     *      - logInfoAip
     *      summary: 根据机器人id和问题信息点赞或者点踩
     *      requestBody:
     *         description: question用户的问题,comment_type:1代表点赞，2代表点踩
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 bot_id:
     *                   type: string
     *                 question:
     *                   type: string
     *                 comment_type:
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
     *        500:
     *          description: Internal Error
     *        400:
     *          description: 请求错误
     * */
    router.post("/commentInfo", logs.commentUpdate);

    router.post("/create", logs.create);

    // Retrieve all Tutorials
    router.post("/botId", logs.findByBotId);

    app.use('/app/log', router);
};
