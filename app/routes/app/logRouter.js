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
     *         description: 历史信息信息  page代表第几页，从1开始，pageSize代表每页的数量
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




    router.post("/create", logs.create);

    // Retrieve all Tutorials
    router.post("/botId", logs.findByBotId);

    app.use('/app/log', router);
};
