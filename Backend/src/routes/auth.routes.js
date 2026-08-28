const { Router } = require("express");

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware")
const authRouter = Router();


//router for user register
authRouter.post(
    "/register",
    authController.registerUserController
);


//route for user login
authRouter.post(
    "/login",
    authController.loginUserController
);


//route for user logout
authRouter.get(
    "/logout",
    authController.logoutUserController
)

//route to get the current user details
authRouter.get(
    "/get-me",
    authMiddleware.authUser,authController.getMeController
)

module.exports = authRouter;