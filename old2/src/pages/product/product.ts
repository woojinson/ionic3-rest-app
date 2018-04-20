import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from './../../models/product';
@IonicPage()
@Component({
selector: 'page-product',
templateUrl: 'product.html',
})
export class ProductPage {
product:Product;
constructor(public navCtrl: NavController, public navParams: NavParams) {
this.product = new Product(this.navParams.get('product'));
}
}

