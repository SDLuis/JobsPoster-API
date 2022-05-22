import '../models/db.model'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { userModel, userEntry, NewUserEntry } from '../models/User.model'
import authConfig from '../config/authConfig'

export const getUser = (Users: userEntry[]): userEntry[] => {
    return Users
}

export const addUser = async (newUserEntry: NewUserEntry): Promise<NewUserEntry> => {
    const newUser = {
        First_Name: newUserEntry.First_Name,
        Last_Name: newUserEntry.Last_Name,
        role: newUserEntry.role,
        email: newUserEntry.email,
        password: await bcrypt.hash(newUserEntry.password.toString(), +authConfig.rounds)
    }
    console.log(newUser.password)
    userModel.create(newUser)
    return newUser
}

export const Login = async (authParams: any): Promise<any | undefined> => {
    try {
        const user = await userModel.findOne({ where: { 'email': authParams.email } })
        if (user) {
            const valid_password = await bcrypt.compare(authParams.password.toString(), user.password)
            if (valid_password) {
                const token = jsonwebtoken.sign({ user: user }, authConfig.secret, {
                    expiresIn: '9h'
                });
                return token
            } else {
                const Error: Error = {
                    name: 'Error password',
                    message: ('Invalid or wrong password')
                }
                return Error
            }
        } else {
            const Error: Error = {
                name: 'Error user',
                message: ('Invalid or wrong user')
            }
            return Error
        }
    } catch (e: any) {
        console.log(e.message)
    }
}