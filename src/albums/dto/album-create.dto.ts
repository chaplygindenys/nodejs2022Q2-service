import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string | null;

  @IsNumber()
  @IsNotEmpty()
  year: number;
}
