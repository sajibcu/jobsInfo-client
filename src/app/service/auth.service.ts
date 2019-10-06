import {Injectable, NgZone} from '@angular/core';
import {User} from './user';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {UserService} from './user.service';
import {DOMAIN_NAME} from '../app.constant';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userData: any;


    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone,
        public _userService: UserService
    ) {
    }

    SignIn(email, password): any {

        if (!this.validateEmail(email)) {
            email = email + DOMAIN_NAME;
        }

        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                if (this.afAuth.auth.currentUser.emailVerified === true) {
                    this.ngZone.run(() => {
                        this.router.navigate(['courses/course-list']);
                    });
                    this.setUserData(result.user);
                    // this.userEmail=this.afAuth.auth.currentUser.email
                    // console.log(this.afAuth.auth.currentUser);
                    this.afAuth.authState.subscribe(user => {
                        if (user) {
                            this.userData = user;
                            // localStorage.setItem('user', JSON.stringify(this.userData));
                            // localStorage.setItem('email', this.afAuth.auth.currentUser.email);

                            user.getIdToken().then(idToken => {
                                // Send token to your backend via HTTPS
                                localStorage.setItem('access_token', idToken);

                            }).catch(error => {
                                // Handle error
                            });

                            this._userService.getUserByEmail(this.afAuth.auth.currentUser.email).subscribe(logedUser => {
                                localStorage.setItem('u_type', JSON.stringify(logedUser.userType));
                            });

                            JSON.parse(localStorage.getItem('user'));
                        } else {
                            localStorage.setItem('user', null);
                            //  JSON.parse(localStorage.getItem('user'));
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Your email is not verified yet',
                        type: 'info'
                    });
                }
            }).catch((error) => {
                // window.alert(error.message);
                Swal.fire({
                    type: 'error',
                    title: error.message
                });
            });
    }

    SignUp(email, password): any {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                this.SendVerificationMail();
                Swal.fire({
                    type: 'success',
                    title: 'Please check your email!'
                });
                //  this.setUserData(result.user);
            }).catch((error) => {
                Swal.fire({
                    type: 'error',
                    title: error.message
                });
                // window.alert(error.message);
            });
    }

    SpecialSignUp(email, password): any {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                // this.SendVerificationMail();
                Swal.fire({
                    type: 'success',
                    title: 'you will be notified by email within 2 days!'
                });
                //this.setUserData(result.user);
            }).catch((error) => {
                // window.alert(error.message);
                Swal.fire({
                    type: 'error',
                    title: error.message
                });
            });
    }


    SendVerificationMail(): any {
        return this.afAuth.auth.currentUser.sendEmailVerification()
            .then(() => {
                this.router.navigate(['']);// ******* */route must be given here
            });

    }

    ForgotPassword(passwordResetEmail): any {
        return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                Swal.fire({
                    type: 'success',
                    title: 'Password reset email sent,check your inbox.!'
                });
            }).catch((error) => {
                // window.alert(error);
                Swal.fire({
                    type: 'error',
                    title: error.message
                });
            });
    }

    isLoggedIn(): boolean {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                user.getIdToken().then(idToken => {
                    // Send token to your backend via HTTPS
                    // console.log(idToken);
                    localStorage.setItem('access_token', idToken);

                    // console.log('force Refresh token : ' + idToken);
                    // ...
                }).catch(function (error) {
                    // Handle error
                });

                // JSON.parse(localStorage.getItem('user'));
                // console.log(user);
            } else {
                localStorage.setItem('user', null);
                //   JSON.parse(localStorage.getItem('user'));
            }
        });

        const user = JSON.parse(localStorage.getItem('user'));

        // this.userEmail=this.afAuth.auth.currentUser.email;
        return (user !== null && user.emailVerified !== false) ? true : false;
    }

    GoogleSignIn(): any {
        return this.AuthLogIn(new auth.GoogleAuthProvider());
    }


    AuthLogIn(provider): any {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['/']);
                });
                this.setUserData(result.user);
            }).catch((error) => {
                Swal.fire({
                    type: 'error',
                    title: error.message
                });
            });
    }


    setUserData(user): any {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            emailVerified: user.emailVerified
        };
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        localStorage.setItem('email', this.afAuth.auth.currentUser.email);
        user.getIdToken().then(idToken => {
            // Send token to your backend via HTTPS
            localStorage.setItem('access_token', idToken);
            this._userService.getUserByEmail(this.afAuth.auth.currentUser.email).subscribe(logedUser => {
                localStorage.setItem('u_type', JSON.stringify(logedUser.userType));
            });

        }).catch(function (error) {
            // Handle error
        });

        return userRef.set(userData, {merge: true});
    }

    SignOut(): any {
        return this.afAuth.auth.signOut().then(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            localStorage.removeItem('email');
            localStorage.removeItem('u_type');
            console.log('log out');
            this.router.navigate(['auth/login']);
        });
    }

    getLogedUserType(): any {
        return localStorage.getItem('u_type');
    }

    //  getCurrentUserEmail():string {
    //     return this.userEmail;
    // }


    isLoggedInUser(): boolean {
        const user = this.afAuth.auth.currentUser;
        // this.userEmail=this.afAuth.auth.currentUser.email;
        console.log(user);
        return (user !== null && user.emailVerified !== false) ? true : false;
    }

    validateEmail(email): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

}
