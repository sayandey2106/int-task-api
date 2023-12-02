import mongoose from "mongoose";

const strReq = {
  type: String,
  required: true,
};

const userSchema = new mongoose.Schema({
  first_name: strReq,
  last_name: strReq,
  email: strReq,
  gender: String,
  avatar: String,
  domain: String,
  available: Boolean,
});

const user = mongoose.model("users", userSchema);

export default user;
