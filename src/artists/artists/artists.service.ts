import { Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma/prisma.service';

import { CreateArtistDto } from '../dto/artist-create.dto';
import { UpdateArtistDto } from '../dto/artist-update.dto';

@Injectable()
export class ArtistsService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.artist.findMany();
  }

  async findOne(id: string) {
    try {
      const artist: Artist = await this.prismaService.artist.findUnique({
        where: { id },
      });
      return artist;
    } catch (error) {
      return null;
    }
  }

  async addOne(createartistDto: CreateArtistDto) {
    try {
      const newArtist = await this.prismaService.artist.create({
        data: { ...createartistDto },
      });
      return newArtist;
    } catch (error) {
      return null;
    }
  }

  async upPas(id: string, updateartistDto: UpdateArtistDto) {
    try {
      const upArtist = await this.prismaService.artist.update({
        where: { id },
        data: { ...updateartistDto },
      });
      return upArtist;
    } catch (error) {
      return null;
    }
  }

  async deleteOne(_id: string) {
    const existingArtist = await this.prismaService.artist.findUnique({
      where: { id: _id },
    });

    if (existingArtist) {
      await this.prismaService.artist.delete({
        where: { id: _id },
      });
      return true;
    } else {
      return null;
    }
  }
}
