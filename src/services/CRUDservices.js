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
let getAllUser = () => {
    return new Promise(async(resolve,reject) => {
        try {
            let users = await db.User.findAll({
                raw:true
            })
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}
let getUserInfoById = (userId) => {
    return new Promise(async(resolve,reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userId},
                raw:true
            })
            if(user){
                resolve(user)
            }
            else{
                resolve([])
            }
        } catch (error) {
            reject(error)
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: data.id}
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;  
                user.address = data.address;
                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers)
            }
            else{
                resolve();
            }
        } catch (error) {
            reject(error)
        } 
})   
}
let deleteUserById = (userId) => {
    return new Promise(async(resolve,reject) => {
        try {
            let user = await db.User.findOne({
                where:{id:userId}
            })
            if(user){
                await user.destroy();
            }
            resolve()   ;
        } catch (error) {
            reject(error)
            
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser:getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}