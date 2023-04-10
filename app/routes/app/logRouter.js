const logs = require("../../controllers/app/logController");
module.exports = app => {
    const logs = require("../../controllers/app/logController");

    var router = require("express").Router();

    router.post("/create", logs.create);

    // Retrieve all Tutorials
    router.post("/botId", logs.findByBotId);

    app.use('/app/log', router);
};
