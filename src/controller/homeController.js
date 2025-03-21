let getHomePage = (req,res) => {
    return res.render('homePage.ejs')
}
let  webAboutPage = (req,res) => {
    return res.render('test/about.ejs')
}
module.exports = {
    getHomePage: getHomePage,
    webAboutPage: webAboutPage
}