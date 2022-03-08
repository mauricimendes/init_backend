import { Request, Response } from "express"
import { container } from "tsyringe"

import CreateUserService from "@modules/users/services/CreateUserService"
import { instanceToInstance } from "class-transformer"
import UpdateUserService from "@modules/users/services/UpdateUserService"
import DestroyUserService from "@modules/users/services/DestroyUserService"

export default class UsersController {
    public async store ( request: Request, response: Response ): Promise<Response> {
        const {
            name,
            email,
            password,
            age
        } = request.body

        const avatar = request.file?.filename

        const createUser = container.resolve(CreateUserService)

        const user = await createUser.execute({
            name,
            email,
            password,
            age,
            avatar: avatar ? avatar : ''
        })

        return response.json(instanceToInstance(user))
    }

    public async update ( request: Request, response: Response ): Promise<Response> {
        const {
            name,
            email,
            password,
            age
        } = request.body

        const { id } = request.params

        const avatar = request.file?.filename

        const updateUser = container.resolve(UpdateUserService)

        await updateUser.execute({
            id,
            name,
            email,
            password,
            age,
            avatar
        })

        return response.json({ message: 'User changed success.', success: true })
    }

    public async destroy ( request: Request, response: Response ): Promise<Response> {
        const { id } = request.params

        const destroyUser = container.resolve(DestroyUserService)

        await destroyUser.execute(id)

        return response.json({ message: 'User deleted success.', success: true })
    }
}