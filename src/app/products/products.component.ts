import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {ProductFormComponent} from '../core/product-form/product-form.component';
import {ProductItem} from '../core/Product';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<ProductItem> = [];

  constructor(private modal: BsModalService, private fs: AngularFirestore) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  onAddClick() {
    const modal = this.modal.show(ProductFormComponent);
  }

  editProduct(product) {
    const modal = this.modal.show(ProductFormComponent);
    modal.content.setValues(product);
  }

  private loadProducts() {
    this.fs.collection<ProductItem>('products').snapshotChanges(['added', 'modified', 'removed']).subscribe((snapshot) => {
      this.products = [];
      snapshot.forEach(value => {
        const product = value.payload.doc.data() as ProductItem;
        product.key = value.payload.doc.id;
        this.products.push(product);
      });
    });
  }

  removeProduct(product) {
    this.fs.collection('products').doc(product.key).delete();
  }
}
