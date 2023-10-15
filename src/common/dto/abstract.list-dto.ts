export class AbstractListDto<Entity> {
  items: Entity[];
  total: number;

  constructor(list: [Entity[], number]) {
    [this.items, this.total] = list;
  }
}
