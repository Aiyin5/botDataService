const files = require("../../controllers/app/fileSysController");
module.exports = app => {
    const files = require("../../controllers/app/fileSysController");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/creat", files.create);


    router.post("/botfile", files.findByFile);

    router.post("/deleteFile", files.deleteFileInfo);

    //for server test
    router.post("/botFile", files.findByFile);

    app.use('/app/file', router);
};
