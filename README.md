<h1 align="center">
  <br>
  <a href="https://project52.tech/" target="blank"><img src="https://raw.githubusercontent.com/blacksector/authenticator/master/src/assets/imgs/logo.png" alt="Authenticator Logo" width="80"></a>

  <br>
  Authenticator
  <br>
</h1>

<h4 align="center">An awesome two factor authentication app.</h4>

<h6 align="center">Current Version: 1.0.0</h6>

<p align="center">
  <a href='https://ko-fi.com/V7V65XWA' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi5.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
</p>

<p align="center">
  <a href="#screenshots">Screenshots</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#setup">Setup</a> •
  <a href="#license">License</a>
</p>

## Screenshots
<p align="center">
<img src="https://project52.tech/wp-content/uploads/2018/05/1-1.png" alt="Welcome Screen" width="200">
<img src="https://project52.tech/wp-content/uploads/2018/05/2-1.png" alt="Blank Home Screen" width="200">
<img src="https://project52.tech/wp-content/uploads/2018/05/3-1.png" alt="Add An Account Screen" width="200">
<img src="https://project52.tech/wp-content/uploads/2018/05/4-1.png" alt="Home Screen" width="200">
</p>

## Key Features

Tech Stack:
* Modern Hybrid App (Ionic 7 + Angular 17)
* Capacitor for native functionality

Features:
* **Modern Architecture**: Built with latest Angular 17 and Ionic 7
* **Firebase Integration**: Updated to Firebase v10 with modular SDK
* **TOTP/HOTP Support**: Uses [otplib v12](https://www.npmjs.com/package/otplib) for token generation
* **QR Code Scanning**: Camera integration for easy setup
* **Cross-Platform**: Runs on iOS, Android, and web
* **Dark Mode**: System-based dark mode support
* **Local Storage**: Secure local token storage
* **Provider Logos**: Dynamic logos for common providers

## Recent Updates (v1.0.0)

🎉 **Major Modernization Complete!**

* ⬆️ **Upgraded to Ionic 7 + Angular 17** - Latest stable versions with improved performance
* 🔥 **Firebase v10 Integration** - Modern modular Firebase SDK
* 📱 **Capacitor Migration** - Replaced deprecated Cordova with Capacitor
* 🎨 **Modern UI Components** - Updated to latest Ionic components
* 📐 **TypeScript 5.4** - Strict mode enabled with latest language features
* 🔍 **ESLint Integration** - Replaced TSLint with modern ESLint
* 🏗️ **Angular CLI Build System** - Replaced deprecated ionic-app-scripts
* 📱 **Native Plugins Updated** - Camera, StatusBar, SplashScreen via Capacitor
* 🎯 **Modern Project Structure** - Follows current Ionic/Angular best practices

## Setup

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. You will also need the Ionic CLI and Angular CLI.

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/blacksector/authenticator

# Go into the repository
$ cd authenticator

# Install dependencies
$ npm install

# Install Ionic CLI and Angular CLI globally (if not already installed)
$ npm install -g @ionic/cli @angular/cli

# Run the app in development mode
$ ionic serve

# Or run with live reload for mobile testing
$ ionic serve --lab

# Build for production
$ ionic build --prod

# Add mobile platforms (requires additional setup)
$ ionic capacitor add ios
$ ionic capacitor add android

# Run on mobile device/emulator
$ ionic capacitor run ios
$ ionic capacitor run android
```

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (comes with Node.js)
- **Ionic CLI**: `npm install -g @ionic/cli`
- **Angular CLI**: `npm install -g @angular/cli`
- **For mobile development**:
  - **iOS**: Xcode (macOS only)
  - **Android**: Android Studio with Android SDK

After you have downloaded and run `ionic serve` you may notice a Invalid API key error. You must sign up for a Firebase Account and <a href="https://console.firebase.google.com/u/0/">create a project</a> and add your API keys for the Web SDK into the `src/app/app.module.ts` file.

Replace:
```javascript
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
```
with your keys:
```javascript
const firebaseConfig = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  storageBucket: "<BUCKET>.appspot.com",
  messagingSenderId: "<SENDER_ID>"
};
```

Re-run `ionic serve` and your app should be working now. Don't forget to enable the authentication methods (providers) you want to support from your firebase project panel: https\://console.firebase.google.com/u/0/project/<PROJECT_ID>/authentication/providers

Note: If you would like to remove Firebase entirely you can do that because currently the project doesn't really use Firebase at all, not until a future version anyway.

## License
The Authenticator Logo is Copyright &copy; Omar Quazi. Do not in any way or form reproduce or reuse this logo. If you wish to use the logo, ask me first!

The rest of the code is MIT Licensed:

```
Copyright 2018 Omar Quazi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

---

> [Project 52](https://project52.tech) &nbsp;&middot;&nbsp;
> [Omar Quazi ](https://quazi.co) &nbsp;&middot;&nbsp;
> [@quaziomar ](https://instagram.com/quaziomar)