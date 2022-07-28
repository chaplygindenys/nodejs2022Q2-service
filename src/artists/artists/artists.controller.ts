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
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: FindOneIdParams) {
    const artist = await this.artistService.findOne(params.id);
    if (artist === null) {
      throw new HttpException('artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createartistDto: CreateArtistDto) {
    const artist = await this.artistService.addOne(createartistDto);
    return artist;
  }

  @Put(':id')
  async update(
    @Body() updateartistDto: UpdateArtistDto,
    @Param() params: FindOneIdParams,
  ) {
    const artist = await this.artistService.upPas(params.id, updateartistDto);
    if (artist === null) {
      throw new HttpException('artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param() params: FindOneIdParams) {
    const artist = await this.artistService.deleteOne(params.id);
    if (artist === null) {
      throw new HttpException('artist not found', HttpStatus.NOT_FOUND);
    }
  }
}
