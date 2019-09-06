import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    constructor(private authService: AuthService,
    //    private _formBuilder: FormBuilder,
        ) { }

    ngOnInit() { 
        // this.registerForm=this._formBuilder.group({
        //     email:[''],
        //     password:['']
        // })
    }

    googleSignIn(): void {
        this.authService.GoogleSignIn();
    }
    signUp(): void {
        console.log(this.email)
    }
}
