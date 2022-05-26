import { category, NewJobEntry } from '../models/Job.model'
import { isString, isNumber, isCategory, notEmpty } from '../utils/utils'

const parseWorkTitle = (workTitleFromRequest: any): string => {
    if (!isString(workTitleFromRequest) || notEmpty(workTitleFromRequest)) {
        throw new Error('Invalid Work title')
    }
    return workTitleFromRequest
}
const parseUserId = (userIdFromRequest: any): number => {
    if (!isNumber(userIdFromRequest) || notEmpty(userIdFromRequest)) {
        throw new Error('Invalid User_ID')
    }
    return userIdFromRequest
}
const parseOwnerEmail = (ownerEmailFromRequest: any): string => {
    if (!isString(ownerEmailFromRequest) || notEmpty(ownerEmailFromRequest)) {
        throw new Error('Invalid Email')
    }
    return ownerEmailFromRequest
}

const parseWorkType = (workTypeFromRequest: any): category => {
    if (!isString(workTypeFromRequest) || !isCategory(workTypeFromRequest) || notEmpty(workTypeFromRequest)) {
        throw new Error('Invalid Work Type')
    }
    return workTypeFromRequest
}

const parsePosition = (positionFromRequest: any): string => {
    if (!isString(positionFromRequest) || notEmpty(positionFromRequest)) {
        throw new Error('Invalid Position')
    }
    return positionFromRequest
}

const parseApplyMethod = (applyMethodFromRequest: any): string => {
    if (!isString(applyMethodFromRequest) || notEmpty(applyMethodFromRequest)) {
        throw new Error('Invalid Apply Method')
    }
    return applyMethodFromRequest
}

const parseDescription = (descriptionFromRequest: any): string => {
    if (!isString(descriptionFromRequest) || notEmpty(descriptionFromRequest)) {
        throw new Error('Invalid Description')
    }
    return descriptionFromRequest
}

export const toNewWork = (object: any, userIdFromRequest: any, emailFromRequest: any): NewJobEntry => {
    const newJob: NewJobEntry = {
        work_Title: parseWorkTitle(object.work_Title),
        User_ID: parseUserId(userIdFromRequest),
        owner_Email: parseOwnerEmail(emailFromRequest),
        workType: parseWorkType(object.workType),
        Position: parsePosition(object.Position),
        apply_Method: parseApplyMethod(object.apply_Method),
        description: parseDescription(object.description),
    }
    return newJob
}

