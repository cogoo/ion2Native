import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { CardIO } from 'ionic-native';

/*
  Generated class for the CardIo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-card-io',
  templateUrl: 'card-io.html'
})
export class CardIoPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) { }

  ionViewDidLoad() {
    console.log('Hello CardIoPage Page');
  }

  scanCard() {
    CardIO.canScan()
      .then(
      (res: boolean) => {
        if (res) {
          CardIO.scan({
            requireExpiry: true,
            requireCCV: true,
            requirePostalCode: true,
            requireCardholderName: true,
            hideCardIOLogo: true
          }).then(this.scanSuccess, this.scanError)
        } else {
          let alert = this.alertCtrl.create({
            title: 'CardIO',
            message: 'Card scan not available'
          })
          alert.present();
        }
      }
      )
  }

  scanSuccess(card) {
    console.log(card)
  }

  scanError(err) {
    let alert = this.alertCtrl.create({
      title: 'CardIO',
      message: 'Card scan failed'
    })
    alert.present();
  }

}
