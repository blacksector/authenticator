import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,
  LoadingController, ToastController, ActionSheetController,
  AlertController } from 'ionic-angular';

// Used to grab authentication keys from storage or save to storage
import { Storage } from '@ionic/storage';

// Used for logging in users.
import { AngularFireAuth } from 'angularfire2/auth';

// OTPLib is used for token generation
import otplib from 'otplib';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  loggedIn: boolean = true;

  public accounts: any = [];

  timing: any;

  start: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public afAuth: AngularFireAuth,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController,
    private storage: Storage, public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController) {

    afAuth.authState.subscribe(user => {
      if (!user) {
        // User is not logged in:
        this.loggedIn = false;
      } else {
        // User is logged in:
        this.loggedIn = true;
      }

      // Call get accounts:
      this.getAccounts();

      // Start the timer:
      this.start = Date.now() - 1000; // The "start" time
      setInterval(this.timer, 1000, this);

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

  login() {
    this.modalCtrl.create('LoginPage').present();
  }


  settings() {
    this.modalCtrl.create('SettingsPage').present();
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.createToast('Signed out').present();
      // TODO: Remove data from storage? Ask user with prompt.
    });

  }

  // This function grabs all of the keys from storage or database if logged in:

  getAccounts() {
    if (this.loggedIn == true) {
      // Grab accounts/keys from firebase
    } else {
      // Grab accounts/keys from storage
      var that = this;
      this.storage.get('accounts').then((val) => {
        if (val != false && val != undefined && val != null) {
          // Ok so there is an accounts variable in our "database", let's use it!
          var data = val;
          that.accounts = data;
          this.setIssuerURL();
        } else {
          console.log("Empty");
          // Nothing exists in our database, just set it to a blank array then.
          that.accounts = [];
        }
      });
    }

  }


  timer(that: any) {
    // NOTE: The app needs to be in focus for this to work?
    // Will this cause issues?
    if (!Array.isArray(that.accounts)) {
      // Not an array? Or doesn't exist? Dont continue:
      return;
    }
    for (var i = 0; i < that.accounts.length; i++) {
      // Find the current time minus what we started with and see if its time
      // to regenerate the code or not:

      // Algorithm is not set, set to SHA1 (Google Authenticator does too)
      if (that.accounts[i].algorithm  === undefined) {
        that.accounts[i]["algorithm"] = 'SHA1';
      }
      // Digits is not defined, set to 6
      if (that.accounts[i].digits === undefined) {
        that.accounts[i]["digits"] = 6;
      }
      // Time is not given, set it to 30 seconds
      if (that.accounts[i].period === undefined) {
        that.accounts[i]["period"] = 30;
      }

      var diff = (Date.now() - that.start) % that.accounts[i].period;
      that.accounts[i].timer = (((Date.now() / 1000) % that.accounts[i].period ) * 100) / that.accounts[i].period;
      // console.log((Date.now() - that.start) / that.accounts[i].period / 10);
      if (that.accounts[i].timer < 2 || that.accounts[i].code === undefined) {
        that.start = Date.now();
        if (that.accounts[i].type == "totp") {
          // If the type is totp we use this method:
          // Note the parameter "period" is referenced as "step" in otplib:
          otplib.authenticator.options = {
            algorithm: that.accounts[i].algorithm,
            digits: parseInt(that.accounts[i].digits),
            step: parseInt(that.accounts[i].period),
            window: 0
          }
          that.accounts[i]["code"] = otplib.authenticator.generate(that.accounts[i].secret);
        } else if (that.accounts[i].type == "hotp") {
          // The type is hotp
          // TODO
        }
      }
    }
  }


  addCodeModal() {
    let addCodePage = this.modalCtrl.create('AddCodePage');
    addCodePage.onDidDismiss(() => {
     this.getAccounts();
   });
   addCodePage.present();
  }

  pressed(index: any) {
    let actionSheet = this.actionSheetCtrl.create({
     title: 'Edit ' + this.accounts[index].label,
     buttons: [
       {
         text: 'Delete',
         role: 'destructive',
         handler: () => {

           let alert = this.alertCtrl.create({
              title: 'Confirm',
              message: 'Are you sure you want to delete "' + this.accounts[index].label +'"? This cannot be undone!',
              buttons: [
                {
                  text: 'Never mind',
                  role: 'cancel',
                  handler: () => {
                    // Do nothing
                  }
                },
                {
                  text: 'Yes',
                  handler: () => {
                    this.createToast('Deleting ' + this.accounts[index].label).present();
                    this.removeAccount(index);
                  }
                }
              ]
            });
            alert.present();
         }
       },
       {
         text: 'Edit',
         handler: () => {
           //this.createToast('Editing ' + this.accounts[index].label).present();
           this.editAccount(index);
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           // Do nothing
         }
       }
     ]
   });

   actionSheet.present();
  }

  removeAccount(index: any) {
    this.accounts.splice(index, 1);
    // Set the modified array to memory
    this.storage.set('accounts', this.accounts);
  }

  editAccount(index: any) {
    let editPage = this.modalCtrl.create('EditPage', {index: index, data: this.accounts[index]});
    editPage.onDidDismiss((index, data) => {
      // Returned will be the modified data and index of the data in
      // this.accounts.



      this.getAccounts();
   });
   editPage.present();
  }

  setIssuerURL() {
    if (!Array.isArray(this.accounts)) {
      // Not an array? Or doesn't exist? Dont continue:
      return;
    }
    for (var i = 0; i < this.accounts.length; i++) {
      var issuer = this.accounts[i].issuer.toLowerCase();
      if (issuer == "google" || issuer == "gmail" || issuer == "google.com") {
        this.accounts[i]["link"] = "https://google.com";
      } else if (issuer == "facebook" || issuer == "fb" || issuer == "facebook.com") {
        this.accounts[i]["link"] = "https://facebook.com";
      } else if (issuer == "instagram" || issuer == "ig" || issuer == "instagram.com") {
        this.accounts[i]["link"] = "https://instagram.com";
      } else if (issuer == "youtube" || issuer == "yt") {
        this.accounts[i]["link"] = "https://youtube.com";
      }
    }
  }

}
