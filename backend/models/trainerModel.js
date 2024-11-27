import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
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
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    certifications: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    Date: {
      type: Number,
    },
  },
  { minimize: false }
);

const trainerModel =
  mongoose.models.trainer || mongoose.model("trainer", trainerSchema);

export default trainerModel;
