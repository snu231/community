import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class BoardStatusValidationPipe implements PipeTransform{



    transform(value: any, metadata: ArgumentMetadata){
        /*
        value = value.toUpperCase();
        if( !this.isStatusValid(value) ){
            throw new BadRequestException(`${value} is not in the status option`);
        }
        
        console.log('value',value);
        console.log('metadata', metadata);
        return value;*/
    }
/*
    private isStatusValid(status: any){
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }*/

}