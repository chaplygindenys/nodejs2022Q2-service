interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
interface UserResponse {
  id: string; // uuid v4
  login: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}
interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}
interface CreateUserDto {
  login: string;
  password: string;
}
interface UpdatePasswordDto {
  oldPassowrd: string; // previous password
  newPassword: string; // new password
}
interface FavoritesRepsonse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
