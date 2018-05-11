import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController,
  LoadingController} from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public emailSignUpForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder,  public auth: AuthProvider,
    public toastCtrl: ToastController, public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {

    this.emailSignUpForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
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


  emailSignUpFormSubmit() {
    // first we check, if the form is valid
    if (!this.emailSignUpForm.valid) {
      this.createToast('Form not valid').present();
      return
    }
    else {
      var that = this;

      var loader = this.createLoading('Signing up...');
      loader.present();

      // if the form is valid, we continue with validation
      this.auth.signUpUser(this.emailSignUpForm.value.email, this.emailSignUpForm.value.password)
        .then((user) => {
          user.updateProfile({'displayName': that.emailSignUpForm.value.name});
          user.sendEmailVerification().then(function() {
            console.log("Verification email sent.");
          }).catch(function(error) {
            console.log("Failed to send verification email: ", error);
          });

          // showing succesfull message
          that.createToast('Signed up with email: ' + that.emailSignUpForm.value.email).present();
          loader.dismiss();
          // closing dialog
          this.navCtrl.pop();
        },
        /**
         * Handle Authentication errors
         * Here you can customise error messages like our example.
         * https://firebase.google.com/docs/reference/js/firebase.auth.Error
         *
         * mismatch with error interface: https://github.com/angular/angularfire2/issues/976
         */
        (error) => {
          that.createToast(error.message).present();
          loader.dismiss();
        })
    }
  }

  login() {
    this.navCtrl.pop();
    this.modalCtrl.create('LoginPage').present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
