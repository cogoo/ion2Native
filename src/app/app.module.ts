
import { NumberSplit } from './../pipes/number-split';

import { HomePage } from './../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { CardIoPage } from '../pages/card-io/card-io';

import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import {CloudSettings, CloudModule} from '@ionic/cloud-angular';
import { MyApp } from './app.component';



const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '19e42175'
  }
}


@NgModule({
  declarations: [
    MyApp,

    NumberSplit,    
    CardIoPage,
    LoginPage,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CardIoPage,
    LoginPage,
    HomePage
  ],
  providers: []
})
export class AppModule {}
