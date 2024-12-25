import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return this.authType === "local"; // Password required only for local sign up users
    },
  },
  image: {
    type: String,
  },
  authType: {
    type: String,
    enum: ["local", "google"],
    required: true,
  },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
