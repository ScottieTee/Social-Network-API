const res = require('express/lib/response');
const User = require('../../models');

const userControllers = {
    async totalUsers(req, res) {
        const users = await User.find({});
        if(!users.length) {
            res.json({message: "No users found."})
        }
        res.json(users);
    }, 

async newUser({ body }, res) {
    const newUser = await User.create(body);
    if(!newUser) {
        res.status(503).json({message: "User not created."});
    }
    res.json(newUser);
}, 

async getUserById({ params }, res) {
    const userData = await User.findOne({ _id:params.id }).populate('thoughts').select("-_v");
    if(!userData) {
        res.json({message: "User not found."});
    }
    res.json(userData);
}, 

async updateUser({ params, body }, res) {
    const userData = await User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
    });
    res.json(userData);
  },

  async deleteUser({ params }, res) {
    const userData = await User.findOneAndDelete(
      { _id: params.id },
      { new: true }
    );

    if(!userData) {
        res.json({message: "User not found."})
    }

    res.json(userData);
  },
};

module.exports = userControllers;