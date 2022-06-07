const { Schema, model, Types } = require('mongoose');

//email validation
const checkEmail = function (email) {
    //will test the below regex pattern, i dont think it should be in a string
    const re = '^[A-Za-z0-9+_.-]+@(.+)$'
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
      //must match a valid email address - check mongoose matching validation
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

  UserSchema.virtual("friendCount").get(function () { 
    return this.friends.length;
  });

// create the username model using the usernameSchema
const User = model('User', UserSchema);

// export the username model
module.exports = User;