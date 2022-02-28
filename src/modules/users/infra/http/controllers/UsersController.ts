import { Request, response, Response } from "express"
import { container } from "tsyringe"

import CreateUserService from "@modules/users/services/CreateUserService"
import { instanceToInstance } from "class-transformer"

export default class UsersController {
    public async store ( request: Request, response: Response ): Promise<Response> {
        const {
            name,
            email,
            password,
            age,
            avatar
        } = request.body

        const createUser = container.resolve(CreateUserService)

        const user = await createUser.execute({
            name,
            email,
            password,
            age,
            avatar
        })

        return response.json(instanceToInstance(user))
    }
}