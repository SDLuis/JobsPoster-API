import { Router } from "express";
import * as jobsContoller from "../controllers/Job.controller";
import * as authController from "../controllers/Auth.controller";
import * as policies from "../libs/policies";
import sendEmail from "../controllers/Email.controller"
const router = Router();

router.get("/", jobsContoller.getJobs);
router.get("/owner", authController.auth, jobsContoller.ownJob);
router.post(
  "/add",
  authController.auth,
  policies.posterAccess,
  jobsContoller.newJob
);
router.put(
  "/edit/:id",
  authController.auth,
  jobsContoller.reqJob,
  policies.ownerAccess,
  jobsContoller.editJob
);
router.get("/:id", jobsContoller.findJob);
router.get("/:category/list", jobsContoller.findJobByCategory);
router.get("/workTitle/:param", jobsContoller.searchJobs);
router.delete(
  "/delete/:id",
  authController.auth,
  jobsContoller.reqJob,
  policies.ownerAccess,
  jobsContoller.deleteJob
);

router.post("/postulate", sendEmail)

export default router;
