import { Injectable } from '@nestjs/common';
import { Track } from 'prisma/prisma-client';

import { PrismaService } from 'src/prisma/prisma/prisma.service';

import { CreateTrackDto } from '../dto/track-create.dto';
import { UpdateTrackDto } from '../dto/track-update.dto';

@Injectable()
export class TracksService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.track.findMany();
  }

  async findOne(id: string) {
    try {
      const track: Track = await this.prismaService.track.findUnique({
        where: { id },
      });
      return track;
    } catch (error) {
      return null;
    }
  }

  async addOne(createTrackDto: CreateTrackDto) {
    try {
      const newTrack: Track = await this.prismaService.track.create({
        data: { ...createTrackDto },
      });
      return newTrack;
    } catch (error) {
      console.log(error);
    }
  }

  async upPas(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      const upTrack = await this.prismaService.track.update({
        where: { id },
        data: { ...updateTrackDto },
      });
      return upTrack;
    } catch (error) {
      return null;
    }
  }

  async deleteOne(_id: string) {
    try {
      await this.prismaService.track.delete({
        where: { id: _id },
      });
      return true;
    } catch (error) {
      return null;
    }
  }
}
