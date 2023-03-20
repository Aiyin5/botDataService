module.exports = app => {
    const users = require("../../controllers/app/userController");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/register", users.create);

    // Retrieve all Tutorials
    router.post("/login", users.findByWhere);

    router.post("/botUser", users.findByBot);

    app.use('/app/user', router);
};
