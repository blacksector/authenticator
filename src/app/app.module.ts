import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';

import { HttpModule } from '@angular/http';

// AngularFire + Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FirebaseProvider } from './../providers/firebase/firebase';
import { AuthProvider } from '../providers/auth/auth';

import { NgCircleProgressModule } from 'ng-circle-progress';

import otplib from 'otplib';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

// Used for long press detection
import { LongPressModule } from 'ionic-long-press';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    NgCircleProgressModule.forRoot({
      "backgroundColor": "#333333",
      "backgroundOpacity": 1,
      "backgroundStrokeWidth": 0,
      "backgroundPadding": 0,
      "radius": 5,
      "space": 0,
      "maxPercent": 100,
      "unitsColor": "#483500",
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#FFFFFF",
      "outerStrokeLinecap": "butt",
      "innerStrokeColor": "#FFFFFF",
      "innerStrokeWidth": 0,
      "titleColor": "#483500",
      "subtitleColor": "#483500",
      "animation": false,
      "animateTitle": false,
      "animationDuration": 0,
      "showTitle": false,
      "showSubtitle": false,
      "showUnits": false,
      "showInnerStroke": false
    }),
    LongPressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    AuthProvider,
    BarcodeScanner
  ]
})
export class AppModule {}
