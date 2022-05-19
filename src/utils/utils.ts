import {category} from '../models/Job.model'

export const isString = (string: string) :boolean => {
    return  typeof string === 'string'
}

export const isNumber = (number: number) :boolean => {
    return typeof number === 'number'
}

export const isCategory = (param: any): boolean =>{
    return Object.values(category).includes(param)
}