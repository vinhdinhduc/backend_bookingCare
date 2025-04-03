import db from "../models"
import CRUDservices from "../services/CRUDservices";
let getHomePage = async(req,res) => {
    try {
        let data = await db.User.findAll();
        
        
    return res.render('homePage.ejs',{
        data: JSON.stringify(data)
    });
    } catch (error) {
        console.log(error);
        
    }

}
let  webAboutPage = (req,res) => {
    return res.render('test/about.ejs')
}
let getCRUD = (req, res) => {
    res.render('crud.ejs')
}
let postCRUD = async(req, res) => {
    let message = await CRUDservices.createNewUser(req.body)
    console.log(message);
    
    
    return res.send("Đức Vình post CRUD")
    

}
module.exports = {
    getHomePage: getHomePage,
    webAboutPage: webAboutPage,
    getCRUD: getCRUD,
    postCRUD:postCRUD,
}