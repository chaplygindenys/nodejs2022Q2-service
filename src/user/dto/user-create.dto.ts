import { IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
