import express from "express";
import {
  createExperience,
  deleteExperience,
  getAllExperiences,
  getSingleExperience,
  updateExperience,
} from "./experiences.controllers.mjs";

const router = express.Router();

router.route("/").get(getAllExperiences).post(createExperience);
router.route("/:id").get(getSingleExperience).patch(updateExperience).delete(deleteExperience);

export default router;