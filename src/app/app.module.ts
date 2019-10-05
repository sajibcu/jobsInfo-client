import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
import {SignupComponent} from './signup/signup.component';
import {LandingComponent} from './landing/landing.component';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FooterComponent} from './shared/footer/footer.component';

import {HomeModule} from './home/home.module';
import {LoginComponent} from './login/login.component';


// Firebase services + enviorment module
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptorService} from './token-interceptor.service';
import {DatePipe} from '@angular/common';
import {AuthService} from './service/auth.service';

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        LandingComponent,
        ProfileComponent,
        NavbarComponent,
        FooterComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        FormsModule,
        RouterModule,
        AppRoutingModule,
        HomeModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true,

    },
        DatePipe,
        [AuthService],
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
