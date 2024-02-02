import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';

export const getTestModules: () => any[] = () => [
  CacheModule.register({
    isGlobal: true,
  }),
  JwtModule.register({
    global: true,
  }),
];
