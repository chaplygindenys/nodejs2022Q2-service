import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Album } from '@prisma/client';
import { FavsService } from 'src/favorites/favs/favs.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { TracksService } from 'src/tracks/tracks/tracks.service';
import { v4 as uuidV4 } from 'uuid';
import { CreateAlbumDto } from '../dto/album-create.dto';
import { UpdateAlbumDto } from '../dto/album-update.dto';

@Injectable()
export class AlbumsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
    @Inject(forwardRef(() => TracksService))
    private readonly traksService: TracksService,
  ) {}

  async findAll() {
    return await this.prismaService.album.findMany();
  }

  async findOne(id: string) {
    try {
      const album: Album = await this.prismaService.album.findUnique({
        where: { id },
      });
      return album;
    } catch (error) {
      return null;
    }
  }

  async addOne(createalbumDto: CreateAlbumDto) {
    try {
      const newAlbum: Album = await this.prismaService.album.create({
        data: { ...createalbumDto },
      });
      return newAlbum;
    } catch (error) {
      console.log(error);
    }
  }

  async upPas(id: string, updatealbumDto: UpdateAlbumDto) {
    try {
      const upAlbum: Album = await this.prismaService.album.update({
        where: { id },
        data: { ...updatealbumDto },
      });
      return upAlbum;
    } catch (error) {
      return null;
    }
  }

  async deleteOne(_id: string) {
    const existingAlbum = await this.prismaService.album.findUnique({
      where: { id: _id },
    });
    if (existingAlbum) {
      await this.prismaService.album.delete({
        where: { id: _id },
      });
      return true;
    } else {
      return null;
    }
  }
}
