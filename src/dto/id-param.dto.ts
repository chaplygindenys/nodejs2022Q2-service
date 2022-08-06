import { IsUUID } from 'class-validator';

export class FindOneIdParams {
  @IsUUID('all', { each: true })
  id: string;
}
