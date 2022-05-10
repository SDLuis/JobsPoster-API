import express from "express";
import jobsRouter from "./routes/Job.route";
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
});

