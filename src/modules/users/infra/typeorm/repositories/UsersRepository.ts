import { getRepository, Repository } from 'typeorm'

import IUserRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

import User from '../entities/User'

export default class UsersRepository implements IUserRepository {
    private ormRepository: Repository<User>

    constructor () {
        this.ormRepository = getRepository(User)
    }

    public async create ( data: ICreateUserDTO ): Promise<User> {
        const user = this.ormRepository.create(data)

        await this.ormRepository.save(user)

        return user
    }

    public async save ( user: User ): Promise<User> {
        return this.ormRepository.save(user)
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return await this.ormRepository.findOne({ email })
    }
}