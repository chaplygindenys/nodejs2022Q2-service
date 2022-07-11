import { IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  oldPassowrd: string;

  @IsString()
  newPassword: string;
}
