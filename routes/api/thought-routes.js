const router = require("express").Router();
const {totalThoughts, newThought, getThoughtById, addReaction} = require("../../controllers/API/thought-controllers");

router.route("/")
.get(totalThoughts)

router.route("/:thoughtId")
.get(getThoughtById)

router.route("/:userId")
.post(newThought)

router.route("/:thoughtId/reactions")
.post(addReaction)

router.route("/:thoughtId/reactions/:reactionId")
.delete(deleteReaction)

module.exports = router;

