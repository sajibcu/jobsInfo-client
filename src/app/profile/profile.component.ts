import {Component, OnInit} from '@angular/core';
import {User, UserService} from '../service/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    profileStatus: any;

    user: User;

    constructor(
        private _UserService: UserService
    ) {
    }

    ngOnInit() {
        this.profileStatus = 'view';
    }

    changeProfileView(status): void {
        this.profileStatus = status;
    }

    saveUserInfo(): void {
        this._UserService.addUser(this.user).subscribe(user => {
            console.log(user);
        });
    }

}
