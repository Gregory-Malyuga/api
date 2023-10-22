import { Args, Query, Resolver } from '@nestjs/graphql';
import { Public } from './auth.guards';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Query('singIn')
  async singIn(
    @Args('login') login: string,
    @Args('password') password: string,
  ) {
    return this.authService.signIn(login, password);
  }
}
