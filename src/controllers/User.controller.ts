import { Request, Response } from "express";
import * as userService from '../services/user.service'
import { userModel } from "../models/User.model";


export const getUser = async (_req: Request, res: Response) => {
    try {
        await userModel.findAll().then(result => {
            res.status(200).send(userService.getUsersWithoutSensitiveInfo(result))
        })
    } catch (e: any) {
        res.status(400).send(e.message)
    }
}

export const editUser = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id
        const User = await userService.editUser(id, req.body)
        if (+User == 1) {
            res.status(200).send('User Edit')
        } else {
            res.status(400).send('Error')
        }
    } catch (e: any) {
        res.status(400).send(e.message)

    }
}

export const findUser = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id
        const user = await userService.findUser(id)
        res.status(200).send(user)
    } catch (e: any) {
        res.status(400).send(e.message)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id
        await userService.deleteUser(id)?.then(result => {
            if (result == 1) {
                res.status(200).send('User deleted')
            }
            else {
                res.status(400).send('Error')
            }
        })
    } catch (e: any) {
        res.status(400).send(e.message)
    }
}