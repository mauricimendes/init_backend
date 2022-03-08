interface IMailConfig {
    driver: 'ethereal'

    defaults: {
        from: {
            email: string
            name: string
        }
    }
}

export default {
    driver: 'ethereal',

    defaults: {
        from: {
            email: 'email@domain.com.br',
            name: 'Nome e domain'
        }
    }
} as IMailConfig