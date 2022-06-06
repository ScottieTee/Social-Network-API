const router = require("express").Router();
const {totalUsers, newUser, getUserById, updateUser, deleteUser} = require("../../controllers/API/user-controllers");

router.route("/")
.get(totalUsers)
.post(newUser)

router.route(":/id")
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

module.exports = router;