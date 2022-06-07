const router = require("express").Router();
const {totalThoughts, newThought, getThoughById} = require("../../controllers/API/thought-controllers");

router.route("/")
.get(totalThoughts)


router.route(":/thoughtid")
.get(getThoughtById)

router.route(":/userId")
.post(newThought)

module.exports = router;

