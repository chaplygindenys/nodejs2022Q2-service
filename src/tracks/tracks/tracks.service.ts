import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavsService } from 'src/favorites/favs/favs.service';
import { v4 as uuidV4 } from 'uuid';
import { CreateTrackDto } from '../dto/track-create.dto';
import { UpdateTrackDto } from '../dto/track-update.dto';

@Injectable()
export class TracksService {
  constructor(
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
  ) {}
  private trackDB: Track[] = [];

  findAll() {
    return this.trackDB;
  }

  findAllById(ids: string[]) {
    const tracksById: Track[] = ids.reduce((acc, id: string) => {
      const resalt: Track | null = this.findOne(id);
      if (resalt) {
        return [...acc, resalt];
      }
    }, []);

    return tracksById;
  }

  findOne(_id: string) {
    const track: Track = this.trackDB.find((track: Track) =>
      track.id === _id ? track : undefined,
    );
    if (track) {
      return track;
    } else {
      return null;
    }
  }

  addOne(createTrackDto: CreateTrackDto) {
    const track = {
      id: uuidV4(),
      ...createTrackDto,
    };
    this.trackDB.push(track);
    return track;
  }

  upPas(id: string, updateTrackDto: UpdateTrackDto) {
    const index = this.trackDB.findIndex((p) => p.id === id);
    if (index >= 0) {
      const upTrack = {
        id,
        name: updateTrackDto.name || this.trackDB[index].name,
        duration: updateTrackDto.duration || +this.trackDB[index].duration,
        albumId: updateTrackDto.albumId || this.trackDB[index].albumId,
        artistId: updateTrackDto.artistId || this.trackDB[index].artistId,
      };
      this.trackDB[index] = upTrack;
      return upTrack;
    } else {
      return null;
    }
  }

  setArtistIdtoNull(artistId: string) {
    const index = this.trackDB.findIndex((p) => p.artistId === artistId);
    if (index >= 0) {
      this.trackDB[index].artistId = null;
      return true;
    } else {
      return null;
    }
  }

  setAlbumIdtoNull(albumId: string) {
    const index = this.trackDB.findIndex((p) => p.albumId === albumId);
    if (index >= 0) {
      this.trackDB[index].albumId = null;
      return true;
    } else {
      return null;
    }
  }

  deleteOne(_id: string) {
    const resalt = this.trackDB.find((track: Track) => {
      if (track.id === _id) {
        this.favsService.deleteOneTrack(_id);
        return true;
      }
    });
    if (resalt) {
      const tracks = this.trackDB.filter((p) => p.id !== _id);
      this.trackDB = tracks;
      return true;
    } else {
      return null;
    }
  }
}
