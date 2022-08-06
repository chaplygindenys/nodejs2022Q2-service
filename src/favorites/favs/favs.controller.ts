import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { FindOneIdParams } from 'src/dto/id-param.dto';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async findAll() {
    const favss = await this.favsService.findAll();
    if (favss === null) {
      throw new HttpException('favs not found', HttpStatus.NOT_FOUND);
    }
    return favss;
  }

  @Post('album/:id')
  @HttpCode(201)
  async createAlbum(@Param() params: FindOneIdParams) {
    const favs = await this.favsService.addOneAlbum(params.id);
    if (favs === null) {
      throw new HttpException(
        'UNPROCESSABLE ENTITY',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return favs;
  }

  @Post('artist/:id')
  @HttpCode(201)
  async createArtist(@Param() params: FindOneIdParams) {
    const favs = await this.favsService.addOneArtist(params.id);
    if (favs === null) {
      throw new HttpException(
        'UNPROCESSABLE ENTITY',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return favs;
  }

  @Post('track/:id')
  @HttpCode(201)
  async createTrack(@Param() params: FindOneIdParams) {
    const favs = await this.favsService.addOneTrack(params.id);
    if (favs === null) {
      throw new HttpException(
        'UNPROCESSABLE ENTITY',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return favs;
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeOneAlbum(@Param() params: FindOneIdParams) {
    const favs = await this.favsService.deleteOneAlbum(params.id);
    if (favs === null) {
      throw new HttpException('favorite not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeOneArtist(@Param() params: FindOneIdParams) {
    const favs = await this.favsService.deleteOneArtist(params.id);
    if (favs === null) {
      throw new HttpException('favorite not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeOneTrack(@Param() params: FindOneIdParams) {
    const favs = await this.favsService.deleteOneTrack(params.id);
    if (favs === null) {
      throw new HttpException('favorite not found', HttpStatus.NOT_FOUND);
    }
  }
}
