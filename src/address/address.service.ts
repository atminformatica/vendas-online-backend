import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import { AddressEntity } from './entities/address.entity';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressEntity)
        private readonly AddressRepository: Repository<AddressEntity>,
        private readonly userService: UserService,
        private readonly cityService: CityService,
    ){}

    async createAddress(createAddressDto:CreateAddressDto,userId:number): Promise<AddressEntity>{
        await this.userService.findUserById(userId);
        await this.cityService.findCityById(createAddressDto.cityId);
        return (
            this.AddressRepository.save({
                ...createAddressDto,
                userId,
            })
        )
    }
}
