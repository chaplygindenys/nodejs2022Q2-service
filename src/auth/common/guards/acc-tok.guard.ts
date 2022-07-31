import { AuthGuard } from '@nestjs/passport';

export class AccTokGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
