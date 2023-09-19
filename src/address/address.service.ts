import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import { AddressEntity } from './entities/address.entity';
import { CreateAddressDto } from './dtos/createAddress.dto';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressEntity)
        private readonly AddressRepository: Repository<AddressEntity>
    ){}

    async createAddress(createAddressDto:CreateAddressDto,userId:number): Promise<AddressEntity>{
        return (
            this.AddressRepository.save({
                ...createAddressDto,
                userId,
            })
        )
    }
}
