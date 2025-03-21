import express from 'express';
import homeController from '../controller/homeController';

let router = express.Router();

let initWebRoutes = (app) => {
    //API routes
    router.get('/', homeController.getHomePage)
    router.get('/about', homeController.webAboutPage)
    return app.use("/", router);
}
export default initWebRoutes;