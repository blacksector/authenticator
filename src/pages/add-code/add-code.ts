import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController,
  ViewController, ModalController} from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import otplib from 'otplib';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

// Used to grab authentication keys from storage or save to storage
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-add-code',
  templateUrl: 'add-code.html',
})
export class AddCodePage {

  scanData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afAuth: AngularFireAuth, private storage: Storage,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController,
    private barcodeScanner: BarcodeScanner, public viewCtrl: ViewController,
    public modalCtrl: ModalController) {
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

  parseKeyURI(key: any) {

    var keyObj = {};

    // key = key.toLowerCase();
    if (!key.startsWith("otpauth://")) {
      console.log("Invalid key uri.");
      return
    } else {
      var mainKey = key.split('otpauth://')[1];

      // Ok so now our mainKey should look something like this:
      // totp/ACME%20Co:john@example.com?secret=PH2K3UPSTSMHBDYYY5H44OVTNYZ5CP6O&issuer=ACME%20Co&algorithm=SHA1&digits=6&period=30
      // OR
      // hotp/ACME%20Co:john@example.com?secret=PH2K3UPSTSMHBDYYY5H44OVTNYZ5CP6O&issuer=ACME%20Co&algorithm=SHA1&digits=6&period=30&counter=0

      // Lets find the type of key first, totp or hotp:
      var parts = mainKey.split('/'); // Split by '/'
      var type = parts.shift(); // We now have the type of authentication it is
      keyObj['type'] = type; // Save the type ot keyObj.
      parts = parts.join('/'); // Just in case we had other '/' characters join the remaining parts.

      // Ok so now we have our type of authentication, let's get the issuer and account
      var label = parts.split('?')[0];
      var parameters = parts.split('?')[1].split('&');

      if (label.split(':').length < 2) {
        // Maybe the issuer is inside of the parameters?
        keyObj["label"] = decodeURIComponent(label.trim()); // Save the account/label to keyObj.
      } else {
        // Ok so issuer is the first part but we will need to trim off white spaces:
        keyObj["issuer"] = decodeURIComponent(label.split(':')[0].trim()); // Save to keyObj.
        keyObj["label"] = decodeURIComponent(label.split(':')[1].trim()); // Save to keyObj.
      }

      // Ok so we now have the label/issuer (hopefully), lets take apart the parameters,
      // and save into keyObjs. In the event that issuer exists here again, it'll
      // just be overwritten:
      for (var i = 0; i < parameters.length; i++) {
        keyObj[parameters[i].split('=')[0].trim()] = decodeURIComponent(parameters[i].split('=')[1].trim());
      }

      if (type.toLowerCase() == "hotp" && keyObj["counter"] === undefined) {
        // Not valid because counter is required if type is hotp!:
        console.log('Invalid key uri: No counter value for hotp.');
        return
      }

      if (keyObj["secret"] === undefined) {
        // No secret defined? INVALID!
        console.log('Invalid key uri: No secret provided.');
        return
      }

      if (keyObj["label"] === undefined || keyObj["label"] == "") {
        // No label or label is empty? Invalid!
        console.log('Invalid key uri: No label provided.');
        return
      }

      // FINALLY, return it:
      return keyObj;


    }



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

    var accounts = [];
    this.storage.get('accounts').then((val) => {
      if (val != null && val != undefined && val != false) {
        accounts = val;
      }
      accounts.push(data);
      this.storage.set('accounts', accounts);
      this.navCtrl.pop();
    });
  }

  scanWithCamera() {
    this.barcodeScanner.scan().then(barcodeData => {
      var data = this.parseKeyURI(barcodeData.text);
      // If we were successful in parsing the data,
      // save it to storage
      if (data != undefined) {
        this.saveAccount(data);
        //this.scanData = data;

      } else {
        this.createToast('An error occurred, couldn\'t read URI. Possibly invalid?');
      }
    }).catch(err => {
      this.createToast('An error occurred: ' + err);
    });
  }

  manualInput() {
    this.modalCtrl.create('ManualPage').present();
    //this.createToast('Manual input not implemented yet...').present();

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }



}
