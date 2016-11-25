import { Stripe } from './../../providers/stripe';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CardIO } from 'ionic-native';

/*
  Generated class for the CardIo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
interface Card {
  cardNumber: number,
  cardType: string,
  cardHolderName: string,
  cvv: number,
  expiryMonth: number,
  expiryYear: number,
  redactedCardNumber: string
}

interface CardStripe {
  number: string,
  cvc: string,
  exp_month: string,
  exp_year: string
}

@Component({
  selector: 'page-card-io',
  templateUrl: 'card-io.html'
})
export class CardIoPage {

  cards: Card[];
  amount: number;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public cardStore: Storage,
    public stripe: Stripe,
    public loadCtrl: LoadingController
  ) {

    this.cardStore.get('cards')
      .then((val) => {
        this.cards = val || [];
      })
  }

  ionViewDidLoad() {
    console.log('Hello CardIoPage Page');
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
    this.cardStore.set('cards', this.cards);
  }

  scanError(err) {
    let alert = this.alertCtrl.create({
      title: 'CardIO',
      message: 'Card scan failed'
    })
    alert.present();
  }

  makePayment(card: Card, amount) {

    let expiry_month = '';
    let loading = this.loadCtrl.create({
      spinner: 'dots',
      content: 'processing payment'
    })

    loading.present();


    if (card.expiryMonth.toString().length == 1) {
      expiry_month = '0' + card.expiryMonth.toString();
    } else {
      expiry_month = card.expiryMonth.toString()
    }

    let stripeCard: CardStripe = {
      number: card.cardNumber.toString(),
      cvc: card.cvv.toString(),
      exp_month: expiry_month,
      exp_year: card.expiryYear.toString()
    }

    this.stripe.generateToken(stripeCard)
      .subscribe(
      (val) => {
        if (val.type == 'StripeCardError' || val.type == 'StripeInvalidRequestError') {
          //error
          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Payment error',
            message: val.message || 'There was an error with proccessing this payment'
          })
          alert.present();
        } else if (val.id) {
          //if success then charge
          let token = val.id;
          let value = amount;
          this.stripe.charge(token, value)
            .subscribe(
            (val) => {
              if (val.type == 'StripeInvalidRequestError' || val.type == 'StripeCardError') {
                //error
                loading.dismiss();
                let alert = this.alertCtrl.create({
                  title: 'Payment error',
                  message: val.message || 'There was an error with proccessing this payment'
                })
                alert.present();
              } else {
                loading.dismiss();
                let alert = this.alertCtrl.create({
                  title: 'Payment success',
                  message: 'Your payment was successful'
                })
                alert.present();
              }
            })
        }

      })
  }

  getAmount(card: Card) {
    let alert = this.alertCtrl.create({
      title: 'Charge amount',
      inputs: [
        {
          name: 'amount',
          placeholder: 'Enter in pence: 100 = £1',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Pay',
          handler: data => {
            this.makePayment(card, data.amount)
          }
        }
      ]
    });
    alert.present();
  }

}
