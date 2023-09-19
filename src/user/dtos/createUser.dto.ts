import { IsString } from "class-validator"

//dto representa o dado que sera transferido pela requisicao do cliente
export class CreateUserDto{
    @IsString()
    name: string

    @IsString()
    email: string

    @IsString()
    phone: string

    @IsString()
    cpf:string

    @IsString()
    password: string
}