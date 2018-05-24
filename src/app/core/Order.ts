import {Status} from './Status';

export class Order {
  private _price: number;

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  private _imageUrl: string;

  get imageUrl(): string {
    return this._imageUrl;
  }

  set imageUrl(value: string) {
    this._imageUrl = value;
  }

  private _dest: string;

  get dest(): string {
    return this._dest;
  }

  set dest(value: string) {
    this._dest = value;
  }

  private _quantity: number;

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  private _time: string;

  get time(): string {
    return this._time;
  }

  set time(value: string) {
    this._time = value;
  }

  private _date: string;

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  private _status: Status;

  get status(): Status {
    if (this._status == null) {
      return {
        value: 'Pending'
      };
    }
    return this._status;
  }

  set status(value: Status) {
    this._status = value;
  }

  private _uid: string;

  get uid(): string {
    return this._uid;
  }

  set uid(value: string) {
    this._uid = value;
  }

  private _key: string;

  get key(): string {
    return this._key;
  }

  set key(value: string) {
    this._key = value;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  private _id: number;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
}
