module.exports = app => {
    const notions = require("../../controllers/app/notionController");

    var router = require("express").Router();

    /**,
     * @swagger
     * /app/notion/create:
     *    post:
     *      tags:
     *      - notionApi
     *      summary: 根据notion链接和token创建数据
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: notion数据 token为notion的token，pgaeLink为notion对于的文章链接，doc_name为自定义文章标题，subPage代表是否获取子链接。
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 bot_id:
     *                   type: string
     *                 token:
     *                   type: string
     *                 pagelink:
     *                   type: string
     *                 doc_name:
     *                   type: string
     *                 subPage:
     *                   type: boolean
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
     *                      bot_id:
     *                        type: string
     *                      doc_name:
     *                        type: string
     *                      type:
     *                        type: number
     *                      content:
     *                        type: string
     *                      page_id:
     *                        type: string
     *                      doc_hash:
     *                        type: string
     *        500:
     *          description: Internal Error
     *        400:
     *          description: token没有授权或者链接不正确
     *        401:
     *          description: 没有权限
     * */
    router.post("/creat", notions.create);


    //router.post("/botNotion", notions.findNotionById);

    router.post("/deleteNotion", notions.deleteNotionInfo);

    //for server test
    router.post("/botnotion", notions.findNotionById);
    //router.post("/botnotion", notions.create);

    app.use('/app/notion', router);
};
