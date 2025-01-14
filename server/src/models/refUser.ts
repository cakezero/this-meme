import mongoose from "mongoose";
const schema = mongoose.Schema

const userSchema = new schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true
  },
  solBalance: {
    type: Number,
    default: 0
  },
  refId: {
    type: String,
    required: true,
    unique: true
  },
  referrals: {
    type: Number,
    default: 0
  },
  referrer: {
    type: String,
  },
  points: {
    type: Number,
    default: 0
  },
  thisBalance: {
    type: Number,
    default: 0
  }
})

const userModel = mongoose.model("refUser", userSchema)

export default userModel;