import mongoose from "mongoose";

const teamsSchema = new mongoose.Schema({
  name:{
    type: String,
    required:true
  },
  domain:{
    type: String,
    required:true
  },
  users: {
    type: [String],
    required: true,
  },
});

const team = mongoose.model("teams", teamsSchema);

export default team;
