import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { FindOneIdParams } from 'src/dto/id-param.dto';
import { CreateTrackDto } from '../dto/track-create.dto';
import { UpdateTrackDto } from '../dto/track-update.dto';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @Get()
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: FindOneIdParams) {
    const track = await this.trackService.findOne(params.id);
    if (track === null) {
      throw new HttpException('track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createTrackDto: CreateTrackDto) {
    const track = await this.trackService.addOne(createTrackDto);
    return track;
  }

  @Put(':id')
  async update(
    @Body() updateTrackDto: UpdateTrackDto,
    @Param() params: FindOneIdParams,
  ) {
    const track = await this.trackService.upPas(params.id, updateTrackDto);
    if (track === null) {
      throw new HttpException('track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() params: FindOneIdParams) {
    const track = await this.trackService.deleteOne(params.id);
    if (track === null) {
      throw new HttpException('track not found', HttpStatus.NOT_FOUND);
    }
  }
}
