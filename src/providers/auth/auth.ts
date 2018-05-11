import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth) {

  }

  signInUser(newEmail: string, newPassword: string): Promise<void> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  signUpUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  signOutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

}
