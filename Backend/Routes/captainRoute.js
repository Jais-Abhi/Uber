import express from "express"
import {body} from "express-validator"
import captainModel from "../Models/captainModel.js"
import { captainProfile, loginController, logoutController, registerController } from "../Controllers/captainController.js"
import captainAuth from "../Middleware/captainMiddleware.js"

const captainRoute = express.Router()

captainRoute.post(
    "/register",
    [
        body("fullName.firstName")
            .notEmpty().withMessage("first name is required")
            .isLength({ min: 3 }).withMessage("first name must at least 3 characters"),
        body("fullName.lastName")
            .optional()
            .isLength({ min: 3 }).withMessage("last name must be at least 3 character"),
        body("email")
            .notEmpty().withMessage("email is required")
            .isEmail().withMessage("email should be valid"),
        body("password")
            .notEmpty().withMessage("password is required")
            .isLength({ min: 6 }).withMessage("password must be at least 6 characters"),
        body("status")
            .optional()
            .isIn(["active", "inactive"]).withMessage("status must be 'active' or 'inactive'"),
        // vehicle validators
        body("vehicle.color")
            .notEmpty().withMessage("vehicle color is required")
            .isLength({ min: 3 }).withMessage("vehicle color must be at least 3 characters"),
        body("vehicle.plate")
            .notEmpty().withMessage("vehicle plate is required"),
        body("vehicle.capacity")
            .notEmpty().withMessage("vehicle capacity is required")
            .isInt({ min: 1, max: 6 }).withMessage("capacity must be between 1 and 6"),
        body("vehicle.type")
            .notEmpty().withMessage("vehicle type is required")
            .isIn(["bike", "taxi", "car"]).withMessage("vehicle type must be bike, taxi or car"),
        // location validators (optional but should be numeric strings or numbers)
        // body("location.latitude")
        //     .optional()
        //     .matches(/^[-+]?\d+(?:\.\d+)?$/).withMessage("latitude must be a valid number string"),
        // body("location.longitude")
        //     .optional()
        //     .matches(/^[-+]?\d+(?:\.\d+)?$/).withMessage("longitude must be a valid number string"),
    ],
    registerController
)

captainRoute.post("/login",[
    body("email")
            .notEmpty().withMessage("email is required")
            .isEmail().withMessage("email should be valid"),
    body("password")
            .notEmpty().withMessage("password is required")
            .isLength({ min: 6 }).withMessage("password must be at least 6 characters"),
    ],
    loginController
)

captainRoute.get("/logout",logoutController)

captainRoute.get("/profile",captainAuth,captainProfile)

export default captainRoute