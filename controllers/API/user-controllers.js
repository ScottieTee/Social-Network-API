const User = require('../../models');

const userControllers = {
    async allUsers(req, res) {
        const users = await User.find({});
        if(!users.length) {
            res.json({message: "No users found."})
        }
        res.json(users);
    }
}, 

//continue this when i come back- starting with async newUser!