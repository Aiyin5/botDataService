const users = require("../../controllers/app/userController");
module.exports = app => {
    const users = require("../../controllers/app/userController");

    var router = require("express").Router();

    router.post("/register", users.create);

    // Retrieve all Tutorials
    router.post("/login", users.findByWhere);

    router.post("/botUser", users.findByBot);

    router.post("/captcha", users.captcha);

    app.use('/app/user', router);
};
