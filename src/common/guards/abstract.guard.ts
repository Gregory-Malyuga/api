import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { AuthGuard } from 'src/domain/auth/auth.guards';
import { UserRepository } from 'src/domain/users/users.repository';
import { BaseEntity } from 'typeorm';
import { BaseRepository } from '../repositories/base.repository';

@Injectable()
export abstract class AbstractGuard<T extends BaseEntity> extends AuthGuard {
  constructor(
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
    protected reflector: Reflector,
    protected repoUser: UserRepository,
    protected repo: BaseRepository<T>,
  ) {
    super(cacheManager, reflector, repoUser);
  }

  abstract specialCanActivate(context: ExecutionContext): Promise<boolean>;
}
