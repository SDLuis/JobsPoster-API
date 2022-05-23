import { role } from '../models/User.model'

export const onlyAdmin = (role: role): string | boolean | undefined => {
    if(role === 'admin'){
        return true
    }else {
        return 'Access denied'
    }
}

export const accessToAdd = (role: role): string | boolean | undefined => {
    if(role === 'poster' || 'admin'){
        return true
    }else {
        return 'Access denied'
    }
}

export const ownerAccess = (user: any, job: any, role: role) => {
    if(user === job || role === 'admin'){
        return true
    }else{
        return 'Access denied'
    }
}
