import { Router } from "express"
import {
    getApplications,
    addApplication,
    updateApplication,
    deleteApplication,
} from "../controllers/applications"

const router: Router = Router()

// @route - GET
// @desc - Retrieves all the applications from the database.
router.get("/api/applications", getApplications)

// @route - POST
// @desc - Insert an application into the database.
router.post("/api/add-application", addApplication)

// @route - POST
// @desc - Update an application from the database.
router.post("/api/update-application/:id", updateApplication)

// @route - DELETE
// @desc - Delete an application from the database.
router.delete("/api/delete-application/:id", deleteApplication)

export default router
