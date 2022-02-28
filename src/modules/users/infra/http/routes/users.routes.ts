import { Router } from "express"
import { celebrate, Joi, Segments } from "celebrate"

import UsersController from "../controllers/UsersController"

const usersRouter = Router()
const usersController = new UsersController

usersRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        age: Joi.number().required(),
        avatar: Joi.string()
    }
}), usersController.store)

export default usersRouter