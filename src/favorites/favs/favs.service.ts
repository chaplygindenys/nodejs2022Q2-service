import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class FavsService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    try {
      const favsDB = await this.prismaService.favorites.findFirst({
        select: {
          albums: {
            select: { id: true, artistId: true, year: true, name: true },
          },
          artists: { select: { id: true, name: true, grammy: true } },
          tracks: {
            select: {
              id: true,
              albumId: true,
              artistId: true,
              name: true,
              duration: true,
            },
          },
        },
      });

      return favsDB;
    } catch (error) {
      return null;
    }
  }

  async findId() {
    const favsDB = await this.prismaService.favorites.findMany();
    if (!favsDB.length) {
      const emptryFavs = await this.prismaService.favorites.create({
        data: {},
      });
      return emptryFavs.id;
    } else {
      return favsDB[0].id;
    }
  }

  async addOneAlbum(id: string) {
    try {
      const favsId = await this.findId();
      const albums = await this.prismaService.favorites.update({
        where: {
          id: favsId,
        },
        data: {
          albums: {
            connect: { id: id },
          },
        },
        select: {
          albums: {
            select: { id: true, artistId: true, year: true, name: true },
          },
        },
      });
      return albums.albums.find((album) => album.id === id);
    } catch (error) {
      return null;
    }
  }

  async addOneArtist(id: string) {
    const favsId = await this.findId();
    try {
      const artists = await this.prismaService.favorites.update({
        where: {
          id: favsId,
        },
        data: {
          artists: {
            connect: { id: id },
          },
        },
        select: {
          artists: {
            select: { id: true, name: true, grammy: true },
          },
        },
      });
      const artist = artists.artists.find((artist) => artist.id === id);

      return artist;
    } catch (error) {
      return null;
    }
  }

  async addOneTrack(id: string) {
    const favsId = await this.findId();
    try {
      const tracks: { tracks: Track[] } =
        await this.prismaService.favorites.update({
          where: {
            id: favsId,
          },
          data: {
            tracks: {
              connect: { id: id },
            },
          },
          select: {
            tracks: {
              select: {
                id: true,
                albumId: true,
                artistId: true,
                name: true,
                duration: true,
              },
            },
          },
        });
      const track = tracks.tracks.find((track) => track.id === id);

      return track;
    } catch (error) {
      return null;
    }
  }

  async deleteOneAlbum(id: string) {
    const favsId = await this.findId();
    try {
      const resalt = await this.prismaService.favorites.update({
        where: {
          id: favsId,
        },
        data: {
          albums: {
            disconnect: { id: id },
          },
        },
      });

      return resalt;
    } catch (error) {
      return null;
    }
  }

  async deleteOneArtist(id: string) {
    const favsId = await this.findId();
    try {
      const resalt = await this.prismaService.favorites.update({
        where: {
          id: favsId,
        },
        data: {
          artists: {
            disconnect: { id: id },
          },
        },
      });

      return resalt;
    } catch (error) {
      return null;
    }
  }

  async deleteOneTrack(id: string) {
    const favsId = await this.findId();
    try {
      const resalt = await this.prismaService.favorites.update({
        where: {
          id: favsId,
        },
        data: {
          tracks: {
            disconnect: { id: id },
          },
        },
      });

      return resalt;
    } catch (error) {
      return null;
    }
  }
}
