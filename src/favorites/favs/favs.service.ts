import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums/albums.service';
import { ArtistsService } from 'src/artists/artists/artists.service';
import { TracksService } from 'src/tracks/tracks/tracks.service';

@Injectable()
export class FavsService {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
  ) {}
  private favsDB: Favorites = {
    artists: [], // favorite artists ids
    albums: [], // favorite albums ids
    tracks: [], // favorite tracks ids
  };

  findAll() {
    const favs: FavoritesRepsonse = {
      artists: [],
      albums: [],
      tracks: [],
    };

    if (this.favsDB.albums[0] !== undefined) {
      favs.albums = this.albumsService.findAllById(this.favsDB.albums);
    }

    if (this.favsDB.artists[0] !== undefined) {
      favs.artists = this.artistsService.findAllById(this.favsDB.artists);
    }

    if (this.favsDB.tracks[0] !== undefined) {
      favs.tracks = this.tracksService.findAllById(this.favsDB.tracks);
    }
    return favs;
  }

  addOneAlbum(id: string) {
    const resalt = this.albumsService.findOne(id);
    if (resalt) {
      this.favsDB.albums.push(id);
      return true;
    } else {
      return null;
    }
  }

  addOneArtist(id: string) {
    const resalt = this.artistsService.findOne(id);
    if (resalt) {
      this.favsDB.artists.push(id);
      return true;
    } else {
      return null;
    }
  }

  addOneTrack(id: string) {
    const resalt = this.tracksService.findOne(id);
    if (resalt) {
      this.favsDB.tracks.push(id);
      return true;
    } else {
      return null;
    }
  }

  deleteOneAlbum(_id: string) {
    const resalt = this.favsDB.albums.find((id: string) => {
      if (id === _id) {
        return true;
      }
    });
    if (resalt) {
      const albums = this.favsDB.albums.filter((id) => id !== _id);
      this.favsDB.albums = albums;
      return true;
    } else {
      return null;
    }
  }

  deleteOneArtist(_id: string) {
    const resalt = this.favsDB.artists.find((id: string) => {
      if (id === _id) {
        return true;
      }
    });
    if (resalt) {
      const artists = this.favsDB.artists.filter((id) => id !== _id);
      this.favsDB.artists = artists;
      return true;
    } else {
      return null;
    }
  }

  deleteOneTrack(_id: string) {
    const resalt = this.favsDB.tracks.find((id: string) => {
      if (id === _id) {
        return true;
      }
    });
    if (resalt) {
      const tracks = this.favsDB.tracks.filter((id) => id !== _id);
      this.favsDB.tracks = tracks;
      return true;
    } else {
      return null;
    }
  }
}
