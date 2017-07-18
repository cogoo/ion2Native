import { Stripe } from './../providers/stripe';
import { NumberSplit } from '../pipes/number-split';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { CardIoPage } from '../pages/card-io/card-io';
import { CardIO } from '@ionic-native/card-io';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    CardIoPage,
    NumberSplit
  ],
  imports: [
  BrowserModule,
  HttpModule,
  IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      mode:'md'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CardIoPage
  ],
  providers: [Stripe, CardIO, StatusBar, SplashScreen]
})
export class AppModule { }
