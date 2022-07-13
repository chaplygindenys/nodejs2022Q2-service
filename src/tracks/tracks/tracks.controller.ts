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

@Controller('tack')
export class TracksController {
  constructor(private readonly trackService: TracksService) {}

  @Get()
  findAll() {
    const tracks = this.trackService.findAll();
    if (tracks === null) {
      throw new HttpException('track not found', HttpStatus.NOT_FOUND);
    }
    return tracks;
  }

  @Get(':id')
  findOne(@Param() params: FindOneIdParams) {
    const track = this.trackService.findOne(params.id);
    if (track === null) {
      throw new HttpException('track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  @Post()
  @HttpCode(201)
  create(@Body() createTrackDto: CreateTrackDto) {
    const track = this.trackService.addOne(createTrackDto);
    return track;
  }

  @Put(':id')
  update(
    @Body() updateTrackDto: UpdateTrackDto,
    @Param() params: FindOneIdParams,
  ) {
    const track = this.trackService.upPas(params.id, updateTrackDto);
    if (track === null) {
      throw new HttpException('track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneIdParams) {
    console.log(params.id);
    console.log(typeof params.id);
    const track = this.trackService.deleteOne(params.id);
    if (track === null) {
      throw new HttpException('track not found', HttpStatus.NOT_FOUND);
    }
  }
}
