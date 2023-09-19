import { Param,Body, Controller,Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressEntity } from './entities/address.entity';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService:AddressService){}

    
    @Post('/:userId')
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body() createAddress:CreateAddressDto,
        @Param('userId') userId:number
        ):Promise<AddressEntity>{
            return(
                this.addressService.createAddress(createAddress,userId)
            )
    }
}
