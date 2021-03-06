import { container } from "tsyringe"

import '@modules/users/providers'
import './providers'

import IUserRepository from "@modules/users/repositories/IUsersRepository"
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository"

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository'

container.registerSingleton<IUserRepository>(
    'UsersRepository',
    UsersRepository
)

container.registerSingleton<IUserTokensRepository>(
    'UserTokensRepository',
    UserTokensRepository
)