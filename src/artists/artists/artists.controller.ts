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
import { CreateArtistDto } from '../dto/artist-create.dto';
import { UpdateArtistDto } from '../dto/artist-update.dto';
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistService: ArtistsService) {}

  @Get()
  findAll() {
    const artists = this.artistService.findAll();
    if (artists === null) {
      throw new HttpException('artist not found', HttpStatus.NOT_FOUND);
    }
    return artists;
  }

  @Get(':id')
  findOne(@Param() params: FindOneIdParams) {
    const artist = this.artistService.findOne(params.id);
    if (artist === null) {
      throw new HttpException('artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  @Post()
  @HttpCode(201)
  create(@Body() createartistDto: CreateArtistDto) {
    const artist = this.artistService.addOne(createartistDto);
    return artist;
  }

  @Put(':id')
  update(
    @Body() updateartistDto: UpdateArtistDto,
    @Param() params: FindOneIdParams,
  ) {
    const artist = this.artistService.upPas(params.id, updateartistDto);
    if (artist === null) {
      throw new HttpException('artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneIdParams) {
    console.log(params.id);
    console.log(typeof params.id);
    const artist = this.artistService.deleteOne(params.id);
    if (artist === null) {
      throw new HttpException('artist not found', HttpStatus.NOT_FOUND);
    }
  }
}
