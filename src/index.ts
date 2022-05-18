import express from "express";
import jobsRouter from "./routes/Job.route";
import db from './models/db.model'
const app = express();
app.use(express.json());

const PORT = 5000;

app.use('/jobs', jobsRouter);

app.get('/', (_req, res) => {
    res.status(200).send('WELCOME!!')
});

app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT} in development mode
Press CTRL-C to stop`)

    db.sequelize.authenticate().then(async () => {
        console.log("database connected")
        try {
            await db.sequelize.sync({ force: false })
        } catch (error: any) {
            console.log(error.message)
        }

    }).catch((e: any) => {
        console.log(e.message)
    })
})
