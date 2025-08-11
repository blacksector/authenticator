import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// Progress Circle
import { NgCircleProgressModule } from 'ng-circle-progress';

// Capacitor
import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    NgCircleProgressModule.forRoot({
      backgroundColor: "#333333",
      backgroundOpacity: 1,
      backgroundStrokeWidth: 0,
      backgroundPadding: 0,
      radius: 5,
      space: 0,
      maxPercent: 100,
      unitsColor: "#483500",
      outerStrokeWidth: 10,
      outerStrokeColor: "#FFFFFF",
      outerStrokeLinecap: "butt",
      innerStrokeColor: "#FFFFFF",
      innerStrokeWidth: 0,
      titleColor: "#483500",
      subtitleColor: "#483500",
      animation: false,
      animateTitle: false,
      animationDuration: 0,
      showTitle: false,
      showSubtitle: false,
      showUnits: false,
      showInnerStroke: false
    }),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
