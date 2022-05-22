import { Request, Response } from "express";
import * as authService from '../services/auth.service'
import * as userValidation from '../validations/user.validation'
import * as authValidation from '../validations/auth.validations'

export const register = async (req: Request, res: Response) => {
    try {
        const NewUserEntry = userValidation.toNewUser(req.body)
        const addedUser = await authService.addUser(NewUserEntry)
        res.status(200).send(addedUser)
    } catch (e: any) {
        res.status(400).send(e.message)
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const paramsToLogin = authValidation.toLogin(req.body)
        const response = await authService.Login(paramsToLogin)
        if (typeof response == 'string') { //WORKINGG!!!!!!!
            const token = response
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 0o1 * 60 * 60 * 1000
            })
            res.status(200).send('U RE LOGED')
        } else {
            return (response != undefined)
                ? res.status(400).send(response.message)
                : res.status(400).send('Something went wrong :((')
        }

    } catch (e: any) {
        res.status(400).send(e.message)
    }

}