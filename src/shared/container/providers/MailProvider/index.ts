import { container } from 'tsyringe'

import IMailProvider from './models/IMailProvider'
import MailProvider from './implementations/MailProvider'

container.registerSingleton<IMailProvider>(
    'MailProvider',
    MailProvider
)