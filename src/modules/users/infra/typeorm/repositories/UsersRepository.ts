import { getRepository, Repository } from 'typeorm'

import IUserRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

import User from '../entities/User'
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO'

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

    public async findByEmail( email: string ): Promise<User | undefined> {
        return await this.ormRepository.findOne({ email })
    }

    public async update({
        id,
        name,
        email,
        password,
        age,
        avatar
    }: IUpdateUserDTO ): Promise<any> {
        await this.ormRepository.update(
            { id }, 
            {
                name,
                email,
                password,
                age,
                avatar
            }
        )
    }

    public async findById( id: string ): Promise<User | undefined> {
        return await this.ormRepository.findOne(id)
    }

    public async destroy( id: string ): Promise<any> {
        await this.ormRepository.softDelete(id)
    }
}