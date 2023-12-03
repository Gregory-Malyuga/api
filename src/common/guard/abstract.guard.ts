import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { AuthGuard } from 'src/domain/auth/auth.guards';
import { UserRepository } from 'src/domain/users/users.repository';
import { In, JsonContains, Repository } from 'typeorm';

@Injectable()
export abstract class AbstractGuard<Entity> extends AuthGuard {
  constructor(
    protected userRepository: UserRepository,
    protected reflector: Reflector,
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
    protected repository: Repository<Entity>,
  ) {
    super(userRepository, reflector, cacheManager);
  }

  abstract specialCanActivate(context: ExecutionContext): Promise<boolean>;

  protected processFilter(filter: any): object {
    const where = {};
    this.repository.metadata.columns.map((column) => {
      if (filter[column.propertyName]) {
        if (column.type === 'json') {
          filter[column.propertyName] = JsonContains(
            where[column.propertyName],
          );
        } else if (Array.isArray(filter[column.propertyName])) {
          where[column.propertyName] = In(filter[column.propertyName]);
        } else {
          where[column.propertyName] = filter[column.propertyName];
        }
      }
    });
    return where;
  }
}
