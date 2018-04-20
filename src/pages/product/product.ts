import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Product} from "../../model/product";
import {RestProvider} from "../../providers/rest/rest";
import {HomePage} from "../home/home";

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  productObservable:Product;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public rest:RestProvider, public toastCtrl:ToastController) {
    //생성자에서 파라미터를 꺼내서 product 변수에 저장해야 한다.
    this.productObservable = new Product(this.navParams.get("product"))
  }

  ionViewDidLoad() {
    //이 부분에서 파라미터를 꺼내서 product 변수에 저장하면 않된다.
    console.log('ionViewDidLoad ProductPage ');
  }

  saveProduct(product:Product) {
    //수정
    if(product.id) {
      this.rest.updateProduct(product).subscribe(product => {
        this.productObservable = product;
        this.showSuccessMessage("Product " + product.id +" - "+product.name + " Updated");
        this.navCtrl.setRoot(HomePage);
      });
    }else {
      //등록
      this.rest.createProduct(product).subscribe(product => {
        this.productObservable = product;
        this.showSuccessMessage("Product " + product.id +" - "+product.name + " Created");
        this.navCtrl.setRoot(HomePage);
      });
    }
  }//saveProduct

  showSuccessMessage(message:string) {
    this.toastCtrl.create({
      message:message,
      showCloseButton:true,
      duration:3000,
      position:'middle'
    }).present();
  }

  deleteProduct(productId:number) {
    this.rest.deleteProductById(productId).subscribe(product => {
      console.log('>>>> '+ product);
      this.showSuccessMessage("Product " + productId + " Removed");
      this.navCtrl.setRoot(HomePage);
    });
  }

}
