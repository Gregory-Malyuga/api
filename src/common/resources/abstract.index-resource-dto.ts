export class AbstractIndexResourceDto<Entity> {
  items!: Entity[];
  total!: number;

  constructor(dto: [Entity[], number]) {
    this.items = dto[0];
    this.total = dto[1];
  }
}
