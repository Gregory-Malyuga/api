import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query('singIn')
  async singIn(
    @Args('login') login: string,
    @Args('password') password: string,
  ) {
    return this.authService.signIn(login, password);
  }
}
