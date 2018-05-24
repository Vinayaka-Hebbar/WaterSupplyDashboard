export class AppUser {
  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  get uid(): string {
    return this._uid;
  }
  set uid(value: string) {
    this._uid = value;
  }
  private _name: string;
  private _uid: string;
  number: number;
  private _address: string;
  pinCode: number;
}
