import { Controller,Get } from '@nestjs/common';
import { StateService } from './state.service';
import { ReturnStateDto } from './dtios/returnState.dto';

@Controller('state')
export class StateController {
    constructor(private readonly stateService:StateService){}

    @Get()
    async getAllusers():Promise<ReturnStateDto[]>{
        return ((await this.stateService.getAllState()).map((state)=>new ReturnStateDto(state)))
    }
}
