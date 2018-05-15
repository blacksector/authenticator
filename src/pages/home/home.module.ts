import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import { NgCircleProgressModule } from 'ng-circle-progress';

// Used for long press detection
import { LongPressModule } from 'ionic-long-press';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    NgCircleProgressModule,
    LongPressModule
  ],

})
export class HomePageModule {}
