import express from "express";
import cors from "cors"
import morgan from "morgan"
import cookieparser from 'cookie-parser'
import jobsRouter from '../routes/Job.route'
import userRouter from '../routes/User.route'
import authRouter from '../routes/Auth.route'

const app = express();
app.use(cors({credentials: true, origin: ['http://localhost:5000', 'http://localhost:8080', 'http://localhost:8081', 'http://localhost:3000', 'https://jobsposter.herokuapp.com/'],}))
app.use(express.json());
app.use(cookieparser())
app.use(morgan('dev'))

app.use('/jobs', jobsRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.get('/', (_req, res) => {
    res.status(200).send('WELCOME!!')
});

export default app