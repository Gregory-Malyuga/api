export class AbstractRangeDto {
  begin: number;
  end: number;

  get skip() {
    return this.begin ? this.begin : 0;
  }

  get take() {
    return this.end ? this.end - this.skip + 1 : 20;
  }
}
