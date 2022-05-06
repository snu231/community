import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppleService } from './apple.service';
import { CreateAppleDto } from './dto/create-apple.dto';
import { UpdateAppleDto } from './dto/update-apple.dto';

@Controller('apple')
export class AppleController {
  constructor(private readonly appleService: AppleService) {}

  @Post()
  create(@Body() createAppleDto: CreateAppleDto) {
    return this.appleService.create(createAppleDto);
  }

  @Get()
  findAll() {
    return this.appleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppleDto: UpdateAppleDto) {
    return this.appleService.update(+id, updateAppleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appleService.remove(+id);
  }
}
