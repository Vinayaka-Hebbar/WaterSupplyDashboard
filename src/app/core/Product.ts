export class Product {
  get desc(): string {
    return this._desc;
  }

  set desc(value: string) {
    this._desc = value;
  }
  get imageUrl(): string {
    return this._imageUrl;
  }

  set imageUrl(value: string) {
    this._imageUrl = value;
  }
  name: string;
  id: number;
  price: number;
  private _imageUrl: string;
  private _desc: string;
  private _key: string;

  get key(): string {
    return this._key;
  }

  set key(value: string) {
    this._key = value;
  }

  private _status: string;

  get status(): string {
    if (this._status == null) {
      return 'Pending';
    }
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  private _quantity: number;

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  get image(): string {
    switch (this.id) {
      case 1:
        return 'assets/can_2.png';
      case 2:
        return 'assets/can_3.png';
      case 3:
        return 'assets/can_4.png';
      default:
        return 'assets/can_1.png';
    }
  }

  private _drawable: number;

  get drawable(): number {
    return this._drawable;
  }

  set drawable(value: number) {
    this._drawable = value;
  }

  public getImage() {
    return 'ok';
  }
}
export interface ProductItem {
  name: string;
  id: number;
  price: number;
  desc: string;
  type: string;
  imageUrl: string;
  key?: string;
}
