import {category} from '../models/Job.model'
import { role } from '../models/User.model'

export const isString = (string: string): boolean => {
    return  typeof string === 'string'
}

export const notEmpty = (param: any): boolean => {
    return param === ''
}

export const isNumber = (number: number): boolean => {
    return typeof number === 'number'
}

export const isCategory = (param: any): boolean => {
    return Object.values(category).includes(param)
}

export const isRole = (param: any): boolean => {
    return Object.values(role).includes(param)
}