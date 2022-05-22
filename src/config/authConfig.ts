export default {
    secret: process.env.AUTH_SECRET as string,
    expires: process.env.AUTH_EXPIRES || '1d' as string,
    rounds: process.env.AUTH_ROUNDS || 8 as number
}