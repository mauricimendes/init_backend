import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from 'typeorm'

import { Exclude, Expose } from 'class-transformer'
import uploadConfig from '@config/upload'

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    @Exclude()
    password: string

    @Column()
    email: string

    @Column()
    age: Number

    @Column()
    avatar: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | 'teste 1' | 'teste 2' {
        if ( !this.avatar ) {
            return 'teste 1'
        }

        switch ( uploadConfig.driver ) {
            case 'disk':
                return `http://localhost:3333/files/${this.avatar}`
            default:
                return 'teste 2'
        }
    }
}