import { Injectable } from '@nestjs/common';
import { CreateLikepostDto } from './dto/create-likepost.dto';
import { UpdateLikepostDto } from './dto/update-likepost.dto';

@Injectable()
export class LikepostsService {
  create(createLikepostDto: CreateLikepostDto) {
    return 'This action adds a new likepost';
  }

  findAll() {
    return `This action returns all likeposts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} likepost`;
  }

  update(id: number, updateLikepostDto: UpdateLikepostDto) {
    return `This action updates a #${id} likepost`;
  }

  remove(id: number) {
    return `This action removes a #${id} likepost`;
  }
}
