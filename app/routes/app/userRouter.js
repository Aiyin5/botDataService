module.exports = app => {
    const users = require("../../controllers/app/userController");

    var router = require("express").Router();

    // Create a new Tutorial
    /**
     * @api {post} /app/user/
     * @apiName registerUser
     * @apiGroup User
     *
     * @apiPermission none
     * @apiBody {String} name=Caroline Name of the User
     *
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "firstname": "John",
     *       "lastname": "Doe"
     *     }
     *
     */
    router.post("/register", users.create);

    // Retrieve all Tutorials
    router.post("/login", users.findByWhere);

    router.post("/botUser", users.findByBot);

    app.use('/app/user', router);
};
