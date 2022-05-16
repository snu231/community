import { PartialType } from '@nestjs/mapped-types';
import { CreateLikepostDto } from './create-likepost.dto';

export class UpdateLikepostDto extends PartialType(CreateLikepostDto) {}
