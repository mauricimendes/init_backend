import { inject, injectable } from "tsyringe"
import path from 'path'

import IUserRepository from "../repositories/IUsersRepository"
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider"
import IUserTokenRepository from "../repositories/IUserTokensRepository"
import AppError from "@shared/errors/AppError"

@injectable()
export default class SendForgotPasswordEmailSerivce {
    constructor (
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokenRepository
    ) {}

    public async execute( email: string ): Promise<void> {
        const user = await this.usersRepository.findByEmail(email)

        if ( !user ) throw new AppError('User not found.', 404)

        const { token } = await this.userTokensRepository.generate(user.id)

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs'
        )

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: '[Cryptos] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3333/reset-password?token=${token}`
                }
            }
        })
    }
}