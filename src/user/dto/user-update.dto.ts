import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  oldPassowrd: string;

  @IsString()
  newPassword: string;
}
