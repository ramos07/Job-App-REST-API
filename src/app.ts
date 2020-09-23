import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import applicationRoutes from "./routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(applicationRoutes)

const mongoUri: string = "mongodb://127.0.0.1:27017/job-applications-api"
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
    .connect(mongoUri, mongoOptions)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        throw error
    })
