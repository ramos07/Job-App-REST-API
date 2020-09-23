import { Response, Request } from "express"
import { IApplication } from "../../types/application"
import Application from "../../models/application"

/**
 * Fetch ALL the applications from the MongoDB.
 * @param req - Request that will get the applications from MongoDB.
 * @param res - Response that will return a status code 200 along with the applications in JSON format.
 */
const getApplications = async (req: Request, res: Response): Promise<void> => {
    try {
        const applications: IApplication[] = await Application.find()
        res.status(200).json({ applications })
    } catch (error) {
        throw error
    }
}

/**
 * Add an application to MongoDB.
 * @param req - Request that contains body object data entered by the user which will be saved to MongoDB.
 * @param res - Response that will return a status code of 200 along with the newly inserted application and all of the applications in JSON format.
 */
const addApplication = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<
            IApplication,
            "companyName" | "position" | "dateApplied" | "status"
        >

        const application: IApplication = new Application({
            companyName: body.companyName,
            position: body.position,
            dateApplied: body.dateApplied,
            status: body.status,
        })

        const newApplication: IApplication = await application.save()
        const allApplications: IApplication[] = await Application.find()

        res.status(200).json({
            message: "Successfully added new application.",
            application: newApplication,
            applications: allApplications,
        })
    } catch (error) {
        throw error
    }
}

/**
 * Update a single application from MongoDB.
 * @param req - Request that contains an id parameters as well as body object entered by user to update an application in MongoDB.
 * @param res - Response that sends out a status code of 200 if successful and sends updated application and all applications as JSON data.
 */
const updateApplication = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        const updateApplication: IApplication | null = await Application.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allApplications: IApplication[] = await Application.find()
        res.status(200).json({
            message: "Application has been updated.",
            application: updateApplication,
            applications: allApplications,
        })
    } catch (error) {
        throw error
    }
}

/**
 * Find an application inside MongoDB and delete that application.
 * @param req - Request that contains an id so that we can find that application by id in MongoDB and delete it.
 * @param res - Response that sends out a status code of 200 if successful along with the deleted application and all the applications in JSON format.
 */
const deleteApplication = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const deleteApplication: IApplication | null = await Application.findByIdAndDelete(
            req.params.id
        )
        const allApplications: IApplication[] = await Application.find()
        res.status(200).json({
            message: "Application has been deleted.",
            application: deleteApplication,
            applications: allApplications,
        })
    } catch (error) {
        throw error
    }
}

export { getApplications, addApplication, updateApplication, deleteApplication }
