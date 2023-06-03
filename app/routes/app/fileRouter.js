const files = require("../../controllers/app/fileSysController");
const newfile = require("../../controllers/app/fileController");
const multer = require("multer");
module.exports = app => {
    const files = require("../../controllers/app/fileSysController");
    const newfile = require("../../controllers/app/fileController");
    const multer = require('multer');
    const upload = multer({
        dest: 'uploads/' // 指定上传文件的目录
    });
    var router = require("express").Router();

    /**,
     * @swagger
     * /app/file/create:
     *    post:
     *      tags:
     *      - fileApi
     *      summary: 根据文件内容创建文件
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 文件信息 bot_id //机器人id doc_name //文件名称  type //文件类型  content//文件内容  type代表文件类型1为pdf 2为txt
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 bot_id:
     *                   type: string
     *                 type:
     *                   type: number
     *                 doc_name:
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
     *        500:
     *          description: Internal Error
     *        401:
     *          description: 没有权限
     * */
    router.post("/create", files.create);


    /**,
     * @swagger
     * /app/file/update:
     *    post:
     *      tags:
     *      - fileApi
     *      summary: 手动更新接口
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 手动更新信息 id//主题id doc_name //主题  content//内容
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: number
     *                 doc_name:
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
     *        400:
     *          description: 请求信息不全
     *        500:
     *          description: Internal Error
     *        401:
     *          description: 没有权限
     * */
    router.post("/update", files.update);

    /**,
     * @swagger
     * /app/file/fileInfo:
     *    post:
     *      tags:
     *      - fileApi
     *      summary: 根据机器人id获取文件相关的语料数据
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 机器人信息  page代表第几页，从1开始，pageSize代表每页的数量 type代表文件类型1为pdf 2为txt 3代表手动更新
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 bot_id:
     *                   type: string
     *                 type:
     *                   type: number
     *                 page:
     *                   type: number
     *                 pageSize:
     *                   type: number
     *      responses:
     *        200:
     *          description: successful operation   文件类型type1代表pdf 2代表txt 3代表手动更新
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
     *                        type: array[{id:number//编号  bot_id:string //机器人id doc_name:string //文件名称  type:number //文件类型  content:string//文件内容  date:number//创建时间}}]
     *        500:
     *          description: Internal Error
     *        401:
     *          description: 没有权限
     * */
    router.post("/fileInfo", files.findByFilePage);

    /**,
     * @swagger
     * /app/file/searchFileInfo:
     *    post:
     *      tags:
     *      - fileApi
     *      summary: 文件和手动更新语料查询接口
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 机器人信息  page代表第几页，从1开始，pageSize代表每页的数量 type代表文件类型1为pdf 2为txt 3代表手动更新 searchWord为搜索的文字内容
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 bot_id:
     *                   type: string
     *                 type:
     *                   type: number
     *                 searchWord:
     *                   type: string
     *                 page:
     *                   type: number
     *                 pageSize:
     *                   type: number
     *      responses:
     *        200:
     *          description: successful operation   文件类型type1代表pdf 2代表txt 3代表手动更新
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
     *                        type: array[{id:number//编号  bot_id:string //机器人id doc_name:string //文件名称  type:number //文件类型  content:string//文件内容  date:number//创建时间}}]
     *        500:
     *          description: Internal Error
     *        401:
     *          description: 没有权限
     * */
    router.post("/searchFileInfo", files.findByFilePage);

    //router.post("/botfile", files.findByFile);


    /**,
     * @swagger
     * /app/file/deleteFile:
     *    post:
     *      tags:
     *      - fileApi
     *      summary: 根据条件删除文件
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 文件信息 bot_id //机器人id  id//文件id
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
    router.post("/deleteFile", files.deleteFileInfo);



    /**,
     * @swagger
     * /app/file/searchDocsInfo:
     *    post:
     *      tags:
     *      - docFileApi
     *      summary: DOCS文件查询接口
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 机器人信息  page代表第几页，从1开始，pageSize代表每页的数量  searchWord为搜索的文字内容
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
     *                        type: array[{id:number//编号  bot_id:string //机器人id file_name:string //文件名称    content:string//文件内容  date:number//创建时间}}]
     *        500:
     *          description: Internal Error
     *        401:
     *          description: 没有权限
     * */
    router.post("/searchDocsInfo", newfile.docsInfo);
    /**,
     * @swagger
     * /app/file/docsInfo:
     *    post:
     *      tags:
     *      - docFileApi
     *      summary: 根据机器人id获取docs相关的语料数据
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
     *                        type: array[{id:number//编号  bot_id:string //机器人id file_name:string //文件名称  content:string//文件内容  date:number//创建时间}}]
     *        500:
     *          description: Internal Error
     *        401:
     *          description: 没有权限
     * */
    router.post("/docsInfo", newfile.docsInfo);

    /**,
     * @swagger
     * /app/file/docCreate:
     *    post:
     *      tags:
     *      - docFileApi
     *      summary: 根据文件创建
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 文件信息 bot_id //机器人id  id//文件id
     *         required: true
     *         content:
     *           multipart/form-data:
     *             schema:
     *               type: object
     *               properties:
     *                 bot_id:
     *                   type: string
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
     *        500:
     *          description: Internal Error
     *        401:
     *          description: 没有权限
     * */
    router.post("/docCreate",upload.single('file'), newfile.create);

    /**,
     * @swagger
     * /app/file/docDelete:
     *    post:
     *      tags:
     *      - docFileApi
     *      summary: 根据条件删除
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 文件信息 bot_id //机器人id  id//文件id  file_name//文件名称
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
     *                 file_name:
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
    router.post("/docDelete", newfile.docDelete);


    /**,
     * @swagger
     * /app/file/docDownload:
     *    post:
     *      tags:
     *      - docFileApi
     *      summary: 根据文件信息下载文件
     *      parameters:
     *      - in: header
     *        name: Authorization
     *        schema:
     *          type: string
     *        required: true
     *      requestBody:
     *         description: 文件信息 bot_id //机器人id  id//文件id  file_name//文件名称
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
     *                 file_name:
     *                   type: string
     *      responses:
     *        200:
     *          description: successful operation
     *          content:
     *            multipart/form-data:
     *              schema:
     *                type: object
     *                properties:
     *                  file:
     *                    format: binary
     *        500:
     *          description: Internal Error
     *        401:
     *          description: 没有权限
     * */
    router.post("/docDownload", newfile.download);

    //for server test
    router.post("/botFile", files.findByFile);
    router.post("/allFile", files.allFile);
    //router.post("/botFile", files.findByFilePage);
    app.use('/app/file', router);
};
