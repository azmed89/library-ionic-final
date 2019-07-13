export class Book {
  isLent: boolean;
  namePerson: string;

  constructor(public name: string) {
    this.isLent = false;
    this.namePerson = "";
  }
}
