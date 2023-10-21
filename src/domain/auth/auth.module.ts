import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtService],
})
export class AuthModule {}
