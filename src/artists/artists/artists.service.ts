import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavsService } from 'src/favorites/favs/favs.service';
import { v4 as uuidV4 } from 'uuid';
import { CreateArtistDto } from '../dto/artist-create.dto';
import { UpdateArtistDto } from '../dto/artist-update.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}
  private artistDB: Artist[] = [];

  findAll() {
    if (this.artistDB[0] !== undefined) {
      return this.artistDB;
    } else {
      return null;
    }
  }

  findAllById(ids: string[]) {
    const artistsById: Artist[] = ids.reduce((acc, id: string) => {
      const resalt: Artist | null = this.findOne(id);
      if (resalt) {
        return [...acc, resalt];
      }
    }, []);

    return artistsById;
  }

  findOne(_id: string) {
    const artist: Artist = this.artistDB.find((artist: Artist) =>
      artist.id === _id ? artist : undefined,
    );
    if (artist) {
      return artist;
    } else {
      return null;
    }
  }

  addOne(createartistDto: CreateArtistDto) {
    const artist = {
      id: uuidV4(),
      ...createartistDto,
    };
    this.artistDB.push(artist);
    return artist;
  }

  upPas(id: string, updateartistDto: UpdateArtistDto) {
    const index = this.artistDB.findIndex((p) => p.id === id);
    if (index >= 0) {
      const upArtist = {
        id,
        name: updateartistDto.name || this.artistDB[index].name,
        grammy: updateartistDto.grammy || this.artistDB[index].grammy,
      };
      this.artistDB[index] = upArtist;
      return upArtist;
    } else {
      return null;
    }
  }

  deleteOne(_id: string) {
    console.log(_id);
    const resalt = this.artistDB.find((artist: Artist) => {
      if (artist.id === _id) {
        this.favsService.deleteOneArtist(_id);
        return true;
      }
    });
    if (resalt) {
      console.log(resalt);
      const artists = this.artistDB.filter((p) => p.id !== _id);
      this.artistDB = artists;
      return true;
    } else {
      console.log('null', resalt);
      return null;
    }
  }
}
