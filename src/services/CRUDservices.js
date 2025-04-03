import bcrypt from "bcryptjs";
import db from "../models"

const salt = bcrypt.genSaltSync(10);
let createNewUser = async(data) => {
    return new Promise(async(resolve, reject) => {
        try {
    let hashPasswordFromBcypt = await hashPassword(data.password)
            await db.User.create({
                email: data.email,
                password:hashPasswordFromBcypt,
                firstName: data.firstname,
                lastName: data.lastname,
                phoneNumber: data.phoneNumber,
                address: data.address,
                gender:data.gender === '1'? true : false,
                roleId: data.roleId,
              
            })
            resolve("create new user successfully");
        } catch (error) {
            reject(error);
        }
    })



    
    
}
let hashPassword = (password) => {
    return new Promise( async(resolve,reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password,salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    }) 
       
}

module.exports = {
    createNewUser: createNewUser
}