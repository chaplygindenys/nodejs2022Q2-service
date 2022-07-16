import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string | null;

  @IsNumber()
  @IsOptional()
  year: number;
}
