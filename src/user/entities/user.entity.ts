import { AddressEntity } from "src/address/entities/address.entity"
import { Column, 
    Entity, 
    PrimaryGeneratedColumn ,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm"

@Entity({name: 'user'})
export class UserEntity{
    @PrimaryGeneratedColumn('rowid')
    id: number

    @Column({name:'name', nullable: false})
    name: string="q"
    
    @Column({name:'email', nullable: false})
    email: string

    @Column({name:'phone'})
    phone: string

    @Column({name:'cpf', nullable: false})
    cpf:string

    @Column({name:'password', nullable: false})
    password: string

    @Column({ name: 'type_user', nullable: false })
    typeUser: number;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    //1 usuario pode ter varios enderecos
    //que serao armazenados em addresses[]
    @OneToMany(() => AddressEntity, (address) => address.user)
    addresses?: AddressEntity[];
}