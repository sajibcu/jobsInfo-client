import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {FormGroup, FormBuilder} from '@angular/forms';
import {User} from '../service/user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    registerForm: FormGroup;
    private email;
    private password;
    test: Date = new Date();
    focus;
    focus1;
    focus2;

    user: User = new User('', '', '', '', '', '', '', '2', '', '', '', '', '', '', '', true, false);

    constructor(private authService: AuthService,
                //    private _formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
        // this.registerForm=this._formBuilder.group({
        //     email:[''],
        //     password:['']
        // })
    }

    signInWithGoogle(): void {

        this.authService.GoogleSignIn();
    }

    signUp(): void {
        this.authService.SignUp(this.user.email, this.user.password);
    }
}
