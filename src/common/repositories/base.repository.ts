import { In, JsonContains, ObjectLiteral, Repository } from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  async findOneOrFailWithProcessWhere(where: object): Promise<T> {
    return await this.processWhere(where).then(() =>
      this.findOneOrFail({
        where,
      }),
    );
  }

  async findAndCountWithProcessWhere(
    where: object,
    skip?: number,
    take?: number,
  ): Promise<[T[], number]> {
    return await this.processWhere(where).then(() =>
      this.findAndCount({
        where,
        skip,
        take,
      }),
    );
  }

  private async processWhere(where: object) {
    Object.keys(where).map((key: string) => {
      const column = this.metadata.findColumnWithPropertyName(key);
      if (column !== undefined) {
        if (column.type === 'json') {
          where[key] = JsonContains(where[key]);
        } else if (Array.isArray(where[key])) {
          where[key] = In(where[key]);
        }
      }
    });
  }
}
