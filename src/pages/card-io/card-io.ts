import { Auth } from '@ionic/cloud-angular';
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

  cards: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public auth: Auth) { 
    this.cards = [];
  }

  ionViewDidLoad() {

  }

  // Auth Guard
  ionViewCanEnter(){
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }

  flipCard(card) {
    if (card.hover) {
      card.hover = false;
    } else {
      card.hover = true;
    }
  }

  scanCard() {
    CardIO.canScan()
      .then(
      (res: boolean) => {
        if (res) {
          CardIO.scan({
            requireExpiry: true,
            requireCCV: true,
            requirePostalCode: false,
            requireCardholderName: true,
            hideCardIOLogo: true
          }).then(this.scanSuccess.bind(this), this.scanError)
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
    this.cards.push(card);
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
