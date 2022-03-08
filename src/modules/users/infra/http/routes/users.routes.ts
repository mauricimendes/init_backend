import { Router, Request, Response } from "express"
import multer from "multer"

import UsersController from "../controllers/UsersController"
import uploadConfig from "@config/upload"
import ensureAuthenticated from "../middlewares/ensureAuthenticated"

const usersRouter = Router()
const usersController = new UsersController
const upload = multer(uploadConfig.multer)

usersRouter.post('/', upload.single('avatar'), usersController.store)
usersRouter.put('/:id', ensureAuthenticated, upload.single('avatar'), usersController.update)
usersRouter.delete('/:id', ensureAuthenticated, usersController.destroy)

export default usersRouter