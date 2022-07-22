// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Post,
//   Put,
//   HttpCode,
//   HttpStatus,
//   HttpException,
// } from '@nestjs/common';

// import { FindOneIdParams } from 'src/dto/id-param.dto';
// import { CreateAlbumDto } from '../dto/album-create.dto';
// import { UpdateAlbumDto } from '../dto/album-update.dto';
// import { AlbumsService } from './albums.service';

// @Controller('album')
// export class AlbumsController {
//   constructor(private readonly albumService: AlbumsService) {}

//   @Get()
//   findAll() {
//     return this.albumService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param() params: FindOneIdParams) {
//     const album = this.albumService.findOne(params.id);
//     if (album === null) {
//       throw new HttpException('album not found', HttpStatus.NOT_FOUND);
//     }
//     return album;
//   }

//   @Post()
//   @HttpCode(201)
//   create(@Body() createalbumDto: CreateAlbumDto) {
//     const album = this.albumService.addOne(createalbumDto);
//     return album;
//   }

//   @Put(':id')
//   update(
//     @Body() updatealbumDto: UpdateAlbumDto,
//     @Param() params: FindOneIdParams,
//   ) {
//     const album = this.albumService.upPas(params.id, updatealbumDto);
//     if (album === null) {
//       throw new HttpException('album not found', HttpStatus.NOT_FOUND);
//     }
//     return album;
//   }

//   @Delete(':id')
//   @HttpCode(204)
//   remove(@Param() params: FindOneIdParams) {
//     const album = this.albumService.deleteOne(params.id);
//     if (album === null) {
//       throw new HttpException('album not found', HttpStatus.NOT_FOUND);
//     }
//   }
// }
