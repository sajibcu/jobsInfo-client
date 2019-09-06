import { Injectable, NgZone } from '@angular/core';
import { User } from "./user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userData: any;
    // userEmail='';

    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone
    ) {
       
    }

    SignIn(email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['user-profile']);
                });
                this.setUserData(result.user);
                 console.log( this.afAuth.auth.currentUser);
                this.afAuth.authState.subscribe(user => {
                    if (user) {
                        this.userData = user;
                        localStorage.setItem('user', JSON.stringify(this.userData));
                        localStorage.setItem('email',this.afAuth.auth.currentUser.email);
                        user.getIdToken(/* forceRefresh */ true).then(function (idToken) {
                            localStorage.setItem('access_token', idToken);
                        }).catch(function (error) {
                        });

                        JSON.parse(localStorage.getItem('user'));
                    } else {
                        localStorage.setItem('user', null);
                        JSON.parse(localStorage.getItem('user'));
                    }
                })
            }).catch((error) => {
                window.alert(error.message)
            })
    }

    SignUp(email, password) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                this.SendVerificationMail();
                this.setUserData(result.user);
            }).catch((error) => {
                window.alert(error.message)
            })
    }


    SendVerificationMail() {
        return this.afAuth.auth.currentUser.sendEmailVerification()
            .then(() => {
                this.router.navigate(['']);//******* */route must be given here
            })
           
    }

    ForgotPassword(passwordResetEmail) {
        return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email sent,check your inbox.');
            }).catch((error) => {
                window.alert(error);
            })
    }
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null && user.emailVerified !== false) ? true : false;
    }

    GoogleSignIn() {
        return this.AuthLogIn(new auth.GoogleAuthProvider());
    }


    AuthLogIn(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['user-profile']);
                })
                this.setUserData(result.user);
            }).catch((error) => {
                window.alert(error)
            })
    }


    setUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            emailVerified: user.emailVerified
        }
        return userRef.set(userData, { merge: true })
    }

    SignOut() {
        return this.afAuth.auth.signOut().then(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            localStorage.removeItem('email');
            console.log('log out');
            this.router.navigate(['auth/login'])
        })
    }

    

}