const res = require('express/lib/response');
const User = require('../../models');

  const userControllers = {
    async totalUsers(req, res) {
      try {
        const users = await User.find({});
        if (!users.length) {
          res.json({ message: "No users found." });
          return;
        }
        res.json(users);
      } catch (error) {
        res.json(error);
      }
    },

    async newUser({ body }, res) {
      try {
        const newUser = await User.create(body);
        if (!newUser) {
          res.status(503).json({ message: "User not created." });
        }
        res.json(newUser);
      } catch (error) {
        res.json(error);
      }
    },

    async getUserById({ params }, res) {
      try {
        const userData = await User.findOne({ _id: params.id })
          .populate('thoughts')
          .populate('friends')
          .select(["-_v", "-_id", "-email"]);
        if (!userData) {
          res.json({ message: "User not found." });
          return;
        }
        res.json(userData);
      } catch (error) {
        res.json(error);
      }
    },

    async updateUser({ params, body }, res) {
      try {
        const userData = await User.findOneAndUpdate({ _id: params.id }, body, {
          new: true,
        });
        res.json(userData);
      } catch (error) {
        res.json(error);
      }
    },

    async deleteUser({ params }, res) {
      try {
        const userData = await User.findOneAndDelete(
          { _id: params.id },
          { new: true }
        );

        if (!userData) {
          res.json({ message: "User not found." })
        }

        res.json(userData);
      } catch (error) {
        res.json(error);
      }
    },

    async addFriend({ params }, res) {
      try {
        const friendData = await User.findOne({ _id: params.friendId });
        const userData = await User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: friendData._id } },
          { new: true }
        ).populate("friends");

        res.json(userData);
      } catch (error) {
        res.json(error);
      }
    },

    async removeFriend({ params }, res) {
      try {
        const userData = await User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { friends: { $in: [params.friendId] } } },
          { new: true }
        ).populate("friends");
        await userData.save();
        res.json(userData);
      } catch (error) {
        res.json(error);
      }
    },
  };


  module.exports = userControllers;