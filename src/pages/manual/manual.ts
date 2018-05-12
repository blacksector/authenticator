import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController,
  ViewController} from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import otplib from 'otplib';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

// Used to grab authentication keys from storage or save to storage
import { Storage } from '@ionic/storage';

// For handling form validation, email address validation, etc.
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the ManualPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manual',
  templateUrl: 'manual.html',
})
export class ManualPage {

  public manualInput: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afAuth: AngularFireAuth, private storage: Storage, private formBuilder: FormBuilder,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController,
    private barcodeScanner: BarcodeScanner, public viewCtrl: ViewController) {


    // building the form
    this.manualInput = formBuilder.group({
      issuer: [''],
      label: ['', Validators.compose([Validators.required])],
      secret: ['', Validators.compose([Validators.required])],
      type: ['', Validators.compose([Validators.required])]
    });

  }

  createToast(message: string) {
    return this.toastCtrl.create({
      message,
      duration: 3000
    })
  }


  createLoading(message: string) {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: message
    });
    return loading;
  }

  saveAccount(data: any) {
    // Algorithm is not set, set to SHA1 (Google Authenticator does too)
    if (data.algorithm  === undefined) {
      data["algorithm"] = 'SHA1';
    }
    // Digits is not defined, set to 6
    if (data.digits === undefined) {
      data["digits"] = 6;
    }
    // Time is not given, set it to 30 seconds
    if (data.period === undefined) {
      data["period"] = 30;
    }
    // If type is hotp, set counter to 0
    if (data.type == "hotp") {
      data["counter"] = 0;
    }

    var accounts = [];
    this.storage.get('accounts').then((val) => {
      if (val != null && val != undefined && val != false) {
        accounts = val;
      }
      accounts.push(data);
      this.storage.set('accounts', accounts);
      this.navCtrl.pop();
      this.navCtrl.pop();
    });
  }

  saveKey() {
    // this.signInForm.value.email, this.signInForm.value.password
     // first we check, if the form is valid
     if (!this.manualInput.valid) {
       this.createToast('Ooops, form not valid...').present();
       return
     } else {
       var loader = this.createLoading('Saving...');
       loader.present();
       let data = {
         issuer: this.manualInput.value.issuer,
         label: this.manualInput.value.label,
         secret: this.manualInput.value.secret
       };
       if (this.manualInput.value.type === "hotp") {
         data["type"] = "hotp";
         data["counter"] = 0;
       } else {
         data["type"] = "totp";
       }
       this.saveAccount(data);
       loader.dismiss();

     }
   }

  ionViewDidLoad() {
    // console.log(otplib.authenticator.generate('HOZ'));
  }

}
