<h1 align="center">
  <br>
  <a href="https://project52.tech/" target="blank"><img src="https://raw.githubusercontent.com/blacksector/authenticator/master/src/assets/imgs/logo.png" alt="Authenticator Logo" width="80"></a>

  <br>
  Authenticator
  <br>
</h1>

<h4 align="center">An awesome two factor authentication app.</h4>

<h6 align="center">Current Version: 0.0.9</h6>

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
* Hybrid (Ionic 3)

Backend:
* Firebase (Integrated but not yet complete)
* [otplib](https://www.npmjs.com/package/otplib)
* [parseKeyURI](https://github.com/blacksector/parseKeyURI)
* [Clearbit Logo API](https://clearbit.com/logo)

I got a little busy with work and some other stuff so I haven't had the time to finish Firebase integration. The login and signup works perfectly but I have not yet finished creating the backup and restore methods. I have a feeling in the future I will force users to login or sign up before using the app; it just makes everyone's life simpler.

On the other hand, I haven't had a chance to fix hotp integration, every new account/key you add will act as a totp key instead. Going to have to fix that in a possible future release!

Oh and yes, as you can see in the screenshots, based on common "providers" or "issuers" a logo is added beside the card! A default logo is used when the app doesn't know who the issuer is. To grab the logos, I used the free [Clearbit Logo API](https://clearbit.com/logo)

## Setup

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. You will also need Cordova and Ionic, follow the <a href="https://ionicframework.com/getting-started">Ionic getting started</a> guide for more.

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/blacksector/authenticator

# Go into the repository
$ cd authenticator

# Install dependencies
$ npm install

# Run the app - All of the features won't work, I recommend deploying on an emulator
$ ionic serve --lab

```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

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