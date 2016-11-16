import { NumberSplit } from './../../.tmp/pipes/number-split';
import { NgModule } from '@angular/core';
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
  providers: []
})
export class AppModule {}
