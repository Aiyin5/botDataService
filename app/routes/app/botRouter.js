const bots = require("../../controllers/app/botController");

module.exports = app => {
    const bots = require("../../controllers/app/botController");

    var router = require("express").Router();

    // getBotInfo
    router.post("/bot", bots.findById);


    // updateBotInfo
    router.post("/updateBot", bots.updateBot);

    // addPreInfo
    router.post("/addPreInfo", bots.addPreInfo);

    // addMultPreInfo
    router.post("/addMultPreInfo", bots.addMultPreInfo);

    // deletPreInfo
    router.post("/deletPreInfo", bots.deletPreInfo);

    // updatePreInfo
    router.post("/updatePreInfo", bots.updatePreInfo);

    // getPreInfo
    router.post("/getPreInfo", bots.getPreInfo);

    // getUnstInfo
    router.post("/getUnstInfo", bots.getUnstInfo);

    // addUnstInfo
    router.post("/addUnstInfo", bots.addUnstInfo);

    // updateUnstInfo
    router.post("/updateUnstInfo", bots.updateUnstInfo);

    app.use('/app/bot', router);
};
