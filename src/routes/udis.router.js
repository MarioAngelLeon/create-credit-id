const { Router } = require("express");
const { udisGet } = require("../controllers/udis.controller");

const router = Router();

router.get("/:date", udisGet);

module.exports = router;
