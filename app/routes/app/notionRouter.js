const notions = require("../../controllers/app/notionController");
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
    router.post("/create", notions.create);


    /**,
     * @swagger
     * /app/notion/notions:
     *    post:
     *      tags:
     *      - notionApi
     *      summary: 根据机器人id获取notion相关的语料数据
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 机器人信息  page代表第几页，从1开始，pageSize代表每页的数量
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
     *                        type: array[{id:number//编号  bot_id:string //机器人id doc_name:string //文件名称  type:number //文件类型  content:string//文件内容 page_id:string doc_hash:string//文件哈希  date:number//创建时间}}]
     *        500:
     *          description: Internal Error
     *        401:
     *          description: 没有权限
     * */
    router.post("/notions", notions.getNotionPage);
    //router.post("/botNotion", notions.findNotionById);

    /**,
     * @swagger
     * /app/notion/searchNotion:
     *    post:
     *      tags:
     *      - notionApi
     *      summary: 根据关键字查询notion语料
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 机器人信息  page代表第几页，从1开始，pageSize代表每页的数量 searchWord为搜索的文字内容
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 bot_id:
     *                   type: string
     *                 searchWord:
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
     *                        type: array[{id:number//编号  bot_id:string //机器人id doc_name:string //文件名称  type:number //文件类型  content:string//文件内容 page_id:string doc_hash:string//文件哈希  date:number//创建时间}}]
     *        500:
     *          description: Internal Error
     *        401:
     *          description: 没有权限
     * */
    router.post("/searchNotion", notions.getNotionPage);

    /**,
     * @swagger
     * /app/notion/deleteNotion:
     *    post:
     *      tags:
     *      - notionApi
     *      summary: 根据条件删除notion
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 文件信息 bot_id //机器人id  id//notion id
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 bot_id:
     *                   type: string
     *                 id:
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
     *        401:
     *          description: 没有权限
     * */
    router.post("/deleteNotion", notions.deleteNotionInfo);

    //for server test
    router.post("/botnotion", notions.findNotionById);
    router.post("/allNotion", notions.allNotion);
    //router.post("/botnotion", notions.create);

    app.use('/app/notion', router);
};
