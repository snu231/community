import { Injectable } from '@nestjs/common';
import { CreateAppleDto } from './dto/create-apple.dto';
import { UpdateAppleDto } from './dto/update-apple.dto';

@Injectable()
export class AppleService {
  create(createAppleDto: CreateAppleDto) {
    return 'This action adds a new apple';
  }

  findAll() {
    return `This action returns all apple`;
  }

  findOne(id: number) {
    return `This action returns a #${id} apple`;
  }

  update(id: number, updateAppleDto: UpdateAppleDto) {
    return `This action updates a #${id} apple`;
  }

  remove(id: number) {
    return `This action removes a #${id} apple`;
  }
}
