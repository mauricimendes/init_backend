import AppError from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import IUserRepository from "../repositories/IUsersRepository"

@injectable()
export default class DestroyUserService {
    constructor (
        @inject('UsersRepository')
        private usersRepository: IUserRepository
    ) {}

    public async execute ( id: string ): Promise<any> {
        const checkUserExists = await this.usersRepository.findById(id)

        if ( !checkUserExists ) throw new AppError('User not found.', 404)

        await this.usersRepository.destroy(id)
    }
}