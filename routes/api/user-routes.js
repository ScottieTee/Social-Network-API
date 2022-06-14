const router = require("express").Router();
const {totalUsers, newUser, getUserById, updateUser, deleteUser, addFriend, removeFriend } = require("../../controllers/API/user-controllers");

router.route("/")
.get(totalUsers)
.post(newUser)

router.route("/:id")
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

router.route("/:userId/friends/:friendId")
.post(addFriend)
.delete(removeFriend)

module.exports = router;