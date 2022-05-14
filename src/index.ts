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

db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop database and resync");
    app.listen(PORT, () => {
        console.log(`App is running at http://localhost:${PORT} in development mode
Press CTRL-C to stop`)
    })
})
