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
    if (this.trackDB[0] !== undefined) {
      return this.trackDB;
    } else {
      return null;
    }
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

  deleteOne(_id: string) {
    console.log(_id);
    const resalt = this.trackDB.find((track: Track) => {
      if (track.id === _id) {
        this.favsService.deleteOneTrack(_id);
        return true;
      }
    });
    if (resalt) {
      console.log(resalt);
      const tracks = this.trackDB.filter((p) => p.id !== _id);
      this.trackDB = tracks;
      return true;
    } else {
      console.log('null', resalt);
      return null;
    }
  }
}
