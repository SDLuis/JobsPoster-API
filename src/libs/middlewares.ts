import express from "express";
import cors from "cors"
import jobsRouter from '../routes/Job.route'
import userRouter from '../routes/User.route'
import authRouter from '../routes/Auth.route'

const app = express();
app.use(express.json());

app.use('/jobs', jobsRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use(cors({
    credentials: true,
    origin: ['http://localhost:5000', 'http://localhost:8080', 'http://localhost:8081', 'http://localhost:4200'],
}))

app.get('/', (_req, res) => {
    res.status(200).send('WELCOME!!')
});

export default app