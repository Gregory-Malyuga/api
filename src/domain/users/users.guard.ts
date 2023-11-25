import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AuthGuard } from 'src/domain/auth/auth.guards';

@Injectable()
export class UserGuard extends AuthGuard {
  async specialCanActivate(context: ExecutionContext): Promise<boolean> {
    return true;
  }
}
