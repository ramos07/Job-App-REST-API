import { IApplication } from "../types/application"
import { model, Schema } from "mongoose"

const applicationSchema: Schema = new Schema({
    companyName: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    dateApplied: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: [
            "pending",
            "ghosted",
            "rejected",
            "interviewed",
            "no offer",
            "offered",
            "no response",
        ],
        default: "pending",
    },
})

export default model<IApplication>("Application", applicationSchema)
