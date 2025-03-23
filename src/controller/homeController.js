import db from "../models"
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
module.exports = {
    getHomePage: getHomePage,
    webAboutPage: webAboutPage
}