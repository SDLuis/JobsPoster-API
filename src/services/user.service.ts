import '../models/db.model'
import { userModel, userEntry, NotSensistiveInfoUser, NewUserEntry } from '../models/User.model'

export const getUsers = async (): Promise<userEntry[]> => {
    return await userModel
    .findAll()
    .then((result) => {
      return result;
    });
}

export const getUsersWithoutSensitiveInfo = (Jobs: NotSensistiveInfoUser[]): NotSensistiveInfoUser[] => {
    return Jobs.map(({User_ID, First_Name, Last_Name, role, email }) => {
        return {
            User_ID, First_Name, Last_Name, role, email
        }
    })
}

export const editUser = async (id: number, newUserEntry: NewUserEntry[]): Promise<number> => {
    const result = await userModel.update(newUserEntry, { where: { 'User_ID': id } }).then(result => {
        return result
    })
    return +result
}

export const findUser = (id: number): Promise<userEntry[]> | undefined => {
    return userModel.findOne({ where: { 'User_ID': id } }) as any
}

export const deleteUser = (id: number): Promise<number> | undefined => {
    return userModel.destroy({ where: { 'User_ID': id } }) as any
}