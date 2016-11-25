import { Stripe } from './../providers/stripe';
import { NumberSplit } from '../pipes/number-split';
import { NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { CardIoPage } from '../pages/card-io/card-io';

@NgModule({
  declarations: [
    MyApp,
    CardIoPage,
    NumberSplit
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CardIoPage
  ],
  providers: [Storage, Stripe]
})
export class AppModule { }
