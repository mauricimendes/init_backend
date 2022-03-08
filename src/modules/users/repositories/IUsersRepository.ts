import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUpdateUserDTO from "../dtos/IUpdateUserDTO";
import User from "../infra/typeorm/entities/User"

export default interface IUserRepository {
    create( data: ICreateUserDTO ): Promise<User>
    save( user: User ): Promise<User>
    findByEmail( email: string ): Promise<User | undefined>
    update( data: IUpdateUserDTO ): Promise<any>
    findById( id: string ): Promise<User | undefined>
    destroy ( id: string ): Promise<any>
}