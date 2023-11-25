export class AbstractListDto<Entity> {
  constructor(
    public items: Entity[],
    public total: number,
  ) {}
}
