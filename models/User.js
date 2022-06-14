const { Schema, model, Types } = require('mongoose');

//email validation
const checkEmail = function (email) {
    //will test the below regex pattern, i dont think it should be in a string
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const UserSchema = new Schema({
    username: {
      type: String, 
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter proper email, please!']
    },
    thoughts: [
      { 
        type: Schema.Types.ObjectId,
        ref: "Thought"
      }
    ],
    friends: [
      { 
        type: Schema.Types.ObjectId,
        ref: "User"
      },
    ],
  },
  { 
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
  );

  UserSchema.post("findOneAndDelete", async function (thought){
    console.log("This is a thought" + thought)
    if (thought) {
      const data = await Thought.deleteMany({_id: { $in: [thought.thoughts] } });
      console.log("This is data" + data);
    }
  });

  UserSchema.virtual("friendCount").get(function () { 
    if (this.friends.length > 0) {
      return this.friends.length;
    } else {
      return 0;
    }  
  });

// create the username model using the usernameSchema
const User = model('User', UserSchema);

// export the username model
module.exports = User;