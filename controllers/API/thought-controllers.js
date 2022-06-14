const { Thought, User } = require('../../models');

const thoughtControllers = {
    async totalThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            if (!thoughts.length){
                res.json({ message: 'Could not find any thoughts!'});
                return;
            }
            res.json(thoughts);
        } catch (error) {
            res.json(error);
        }
},

async newThought({ params, body }, res) {
    try {
    const newThought = await Thought.create(body);
    const userData = await User.findOneAndUpdate(
        { _id: params.userId }, 
        { $push: {thoughts: newTHought._id } }, 
        { new: true }
        );

        newThought.user = userData;
        await newThought.save();

    res.send(newThought);
} catch(error) {
    res.json(error);
}
},

async getThoughtById({ params }, res) {
    try{
    const thoughtData = await Thought.findOne({ 
        _id: params.thoughtId, 
    }).populate("user");
    res.json(thoughtData);
} catch(error) {
    res.json(error);
}
},

async addReaction({ params, body }, res) {
    try {
    const thoughtData = await Thought.findOneAndUpdate(
        { _id:params.thoughtId },
        { $push: {reactions: body } }
    ).populate("reactions");
    thoughtData.save();
    res.json(thoughtData);
} catch(error) {
    res.json(error);
}
},

async deleteReaction({ params }, res) {
    try {
        const thoughtData = awaitthought.findOneAndUpdate(
            { _id:params.thoughtId },
            { $pull: { reactions: { _id: params.reactionId } } }
        ).populate("reactions");
        await thoughtData.save();
        res.json(thoughtData); 
       } catch (error)  {
         res.json(error);
       } 
    },    
};

module.exports = thoughtControllers;
