const { Router } = require("express");
const { readCreditId, takeCreditId } = require("../controllers/genrateId.controller");

const router = Router();

router.get("/:productNumber", readCreditId);
router.post("/:productNumber", takeCreditId);

module.exports = router;
