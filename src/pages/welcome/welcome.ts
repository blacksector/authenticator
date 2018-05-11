import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Nav } from 'ionic-angular';

import { ViewChild } from '@angular/core';


/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  @ViewChild(Slides) slides: Slides;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public nav: Nav) {
  }

  continue() {
    this.nav.setRoot('HomePage', {}, {animation: 'ios-transition', animate: true, direction: "forward"});
  }


}
