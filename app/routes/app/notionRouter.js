module.exports = app => {
    const notions = require("../../controllers/app/notionController");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/creat", notions.create);


    router.post("/botnotion", notions.findNotionById);

    router.post("/deleteNotion", notions.deleteNotionInfo);

    //for server test
    router.post("/botNotion", notions.findNotionById);

    app.use('/app/notion', router);
};
