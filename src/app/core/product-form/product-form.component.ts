import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UploadService} from '../upload.service';
import {Upload} from '../Upload';
import * as firebase from 'firebase';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {ProductItem} from '../Product';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  formProduct: FormGroup;
  selectedFiles: FileList;
  upload: Upload;
  type = 'add';
  product: any;
  productCollection: AngularFirestoreCollection<ProductItem>;

  constructor(private fb: FormBuilder, private bsf: BsModalRef, private us: UploadService, private fs: AngularFirestore) {

  }

  ngOnInit() {
    this.buildForm();
    this.getProducts();
  }

  closeModal() {
    this.bsf.hide();
  }

  onSubmit() {
    const product = {
      name: this.formProduct.get('productName').value,
      price: this.formProduct.get('productPrice').value,
      id: this.formProduct.get('productId').value,
      imageUrl: this.formProduct.get('productImageUrl').value,
      desc: this.formProduct.get('productDesc').value,
      type: this.formProduct.get('productType').value
    };
    if (this.type === 'add') {
      this.productCollection.add(product);
    } else {
      this.productCollection.doc(this.product.key).update(product);
    }
    this.bsf.hide();
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  setValues(product) {
    this.type = 'edit';
    this.product = product;
    this.formProduct.get('productName').setValue(product.name);
    this.formProduct.get('productPrice').setValue(product.price);
    this.formProduct.get('productId').setValue(product.id);
    this.formProduct.get('productImageUrl').setValue(product.imageUrl);
    this.formProduct.get('productDesc').setValue(product.desc);
    this.formProduct.get('productType').setValue(product.type);
  }

  onUpload() {
    this.upload = new Upload(this.selectedFiles.item(0));
    const task = this.us.uploadFile(this.upload);
    task.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: UploadTaskSnapshot) => {
        this.upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.upload.url = task.snapshot.downloadURL;
        this.upload.name = this.upload.file.name;
        this.formProduct.get('productImageUrl').setValue(this.upload.url);
      });
  }

  private getProducts() {
    this.productCollection = this.fs.collection('products');
  }

  private buildForm() {
    this.formProduct = this.fb.group({
      'productName': ['', [
        Validators.required
      ]],
      'productId': ['', [
        Validators.required
      ]],
      'productPrice': ['', [
        Validators.required
      ]],
      'productDesc': ['', [
        Validators.required
      ]],
      'productImageUrl': ['', [
        Validators.required
      ]],
      'productType': ['', [
        Validators.required
      ]]
    });
  }
}
