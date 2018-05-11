import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCodePage } from './add-code';

@NgModule({
  declarations: [
    AddCodePage,
  ],
  imports: [
    IonicPageModule.forChild(AddCodePage),
  ],
})
export class AddCodePageModule {}
