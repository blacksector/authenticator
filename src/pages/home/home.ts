import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,
  LoadingController, ToastController} from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import otplib from 'otplib';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {


  loggedIn: boolean = true;

  accounts: any = [
    {
      type: 'totp',
      issuer: "Google",
      label: "omar@quazi.co",
      secret: "GFXG6OL2G5BVCSZVNU4XASLMJVIECMLZ",
      digits: 6,
      seconds: 30,
      timer: 0,
      link: "https://google.com",
      code: "Click to reveal"
    },
    {
      type: 'totp',
      issuer: "Facebook",
      label: "omar.quazi.3",
      secret: "33hhm3r7z6l3k4s3fighvllpuwdhuqbb",
      digits: 6,
      seconds: 30,
      timer: 0,
      link: "https://facebook.com/",
      code: "Click to reveal"
    },
    {
      type: 'totp',
      issuer: "Instagram",
      label: "quaziomar",
      secret: "33hhm3r7z6l3k4s3fighvllpuwdhuqbb",
      digits: 6,
      seconds: 60,
      timer: 0,
      link: "https://instagram.com",
      code: "Click to reveal"
    }
  ];

  scanData: any;

  timing: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public afAuth: AngularFireAuth,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController,
    private barcodeScanner: BarcodeScanner) {

    afAuth.authState.subscribe(user => {
      if (!user) {
        // User is not logged in:
        this.loggedIn = false;
      } else {
        // User is logged in:
        this.loggedIn = true;
      }
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


  startTimer(duration, index) {
    var that = this;
    var start = Date.now(),
        diff;
    function timer() {
        // get the number of seconds that have elapsed since
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // Set the timer so that circle progress can use it to show percentage
        // for expiration
        that.accounts[index].timer = ((diff/that.accounts[index].seconds)*100);


        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
            for (var i = 0; i < that.accounts.length; i++) {

              otplib.authenticator.options = {
                algorithm: that.accounts[i].algorithm,
                digits: parseInt(that.accounts[i].digits),
                step: parseInt(that.accounts[i].period)
              }
              that.accounts[i].code = otplib.authenticator.generate(that.accounts[i].secret);
            }
        }

    };

    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);

  }

  login() {
    this.modalCtrl.create('LoginPage').present();
  }

  addCodeModal() {
    this.modalCtrl.create('AddCodePage').present();
  }

  // accountDetails(index: any) {
  //
  //   if (this.accounts[index].code === "Click to reveal") {
  //     this.accounts[index].code = otplib.authenticator.generate(this.accounts[index].secret);
  //     this.startTimer(this.accounts[index].seconds, index);
  //   } else {
  //     //this.startTimer(this.accounts[index].seconds, index);
  //   }
  //   this.createToast("Getting " + this.accounts[index].issuer + " details...").present();
  // }


  addCode() {
    this.barcodeScanner.scan().then(barcodeData => {
     this.scanData = this.parseKeyURI(barcodeData.text);
     console.log(this.parseKeyURI(barcodeData.text));
    }).catch(err => {
      this.scanData = err;
    });
  }

  ionViewDidLoad() {
    for (var i = 0; i < this.accounts.length; i++) {
      // TODO: Move this to add-code.ts
      // Algorithm is not set, set to SHA1 (Google Authenticator does too)
      if (this.accounts[i].algorithm  === undefined) {
        this.accounts[i]["algorithm"] = 'SHA1';
      }
      // Digits is not defined, set to 6
      if (this.accounts[i].digits === undefined) {
        this.accounts[i]["digits"] = 6;
      }
      // Time is not given, set it to 30 seconds
      if (this.accounts[i].period === undefined) {
        this.accounts[i]["period"] = 30;
      }
      otplib.authenticator.options = {
        algorithm: this.accounts[i].algorithm,
        digits: parseInt(this.accounts[i].digits),
        step: parseInt(this.accounts[i].period),
        window: 1
      }
      this.accounts[i].code = otplib.authenticator.generate(this.accounts[i].secret);
      //this.startCountdown();
      this.startTimer(this.accounts[i].seconds, i);
    }
  }

}
