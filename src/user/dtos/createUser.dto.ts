//dto representa o dado que sera transferido pela requisicao do cliente
export interface CreateUserDto{
    name: string,
    email: string,
    phone: string,
    cpf:string,
    password: string,
}