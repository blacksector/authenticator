import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private router: Router,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
    await this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();

    await StatusBar.setStyle({ style: Style.Default });
    
    const firstUse = await this.storage.get('firstUse');
    
    if (firstUse === false) {
      this.router.navigate(['/home']);
    } else {
      await this.storage.set('firstUse', false);
      this.router.navigate(['/welcome']);
    }
    
    await SplashScreen.hide();
  }
}
