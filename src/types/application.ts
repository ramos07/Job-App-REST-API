import { Document } from "mongoose"

export interface IApplication extends Document {
    companyName: string
    position: string
    dateApplied: Date
    status: string
}
