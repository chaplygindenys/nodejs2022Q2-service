import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string | null;

  @IsString()
  @IsOptional()
  albumId: string | null;

  @IsNumber()
  @IsOptional()
  duration: number;
}
