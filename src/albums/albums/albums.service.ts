import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavsService } from 'src/favorites/favs/favs.service';
import { TracksService } from 'src/tracks/tracks/tracks.service';
import { v4 as uuidV4 } from 'uuid';
import { CreateAlbumDto } from '../dto/album-create.dto';
import { UpdateAlbumDto } from '../dto/album-update.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
    @Inject(forwardRef(() => TracksService))
    private readonly traksService: TracksService,
  ) {}
  private albumDB: Album[] = [];

  findAll() {
    return this.albumDB;
  }
  findAllById(ids: string[]) {
    const albumsById: Album[] = ids.reduce((acc, id: string) => {
      const resalt: Album | null = this.findOne(id);
      if (resalt) {
        return [...acc, resalt];
      }
    }, []);

    return albumsById;
  }

  findOne(_id: string) {
    const album: Album = this.albumDB.find((album: Album) =>
      album.id === _id ? album : undefined,
    );
    if (album) {
      return album;
    } else {
      return null;
    }
  }

  addOne(createalbumDto: CreateAlbumDto) {
    const album = {
      id: uuidV4(),
      ...createalbumDto,
    };
    this.albumDB.push(album);
    return album;
  }

  upPas(id: string, updatealbumDto: UpdateAlbumDto) {
    const index = this.albumDB.findIndex((p) => p.id === id);
    if (index >= 0) {
      const upalbum = {
        id,
        name: updatealbumDto.name || this.albumDB[index].name,
        year: updatealbumDto.year || +this.albumDB[index].year,
        artistId: updatealbumDto.artistId || this.albumDB[index].artistId,
      };
      this.albumDB[index] = upalbum;
      return upalbum;
    } else {
      return null;
    }
  }
  setArtistIdtoNull(artistId: string) {
    const index = this.albumDB.findIndex((p) => p.artistId === artistId);
    if (index >= 0) {
      this.albumDB[index].artistId = null;
      return true;
    } else {
      return null;
    }
  }

  deleteOne(_id: string) {
    const resalt = this.albumDB.find((album: Album) => {
      if (album.id === _id) {
        this.favsService.deleteOneAlbum(_id);
        this.traksService.setAlbumIdtoNull(_id);
        return true;
      }
    });
    if (resalt) {
      const albums = this.albumDB.filter((p) => p.id !== _id);
      this.albumDB = albums;
      return true;
    } else {
      return null;
    }
  }
}
