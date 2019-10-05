import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common/common.service';
import {SERVER_API_URL} from '../app.constant';

export class User {
    constructor(
        public id: any,
        public firstName: any,
        public lastName: any,
        public dob: any,
        public gender: any,
        public mobile: any,
        public telephone: any,
        public email: any,
        public userType: any,
        public institutionId: any,
        public nid: any,
        public passport: any,
        public password: any,
        public address: any,
        public city: any,
        public state: any,
        public postCode: any,
        public country: any,
        public activated: boolean,
        public locked: boolean,
        public recaptchaResponse: any,
    ) {

    }
}

export class Role {
    constructor(
        public id: any,
        public role: any
    ) {
    }
}

export class Country {
    constructor(
        public id: any,
        public name: any,
        public code: any,
        public iDialing: any,
        public block: boolean
    ) {
    }
}

export class UserChangePasswordEntity {

    constructor(
        public email: any,
        public password: any
    ) {
    }
}

@Injectable({
    providedIn: 'root'
})

export class UserService {
    public userRole = 'all';

    constructor(
        private httpClient: HttpClient,
        private commonService: CommonService
    ) {
    }


    public getAllRole(): any {

        return this.httpClient.get<Role[]>(SERVER_API_URL + 'api/auth/users/role');
    }

    public getAllActiveCountry(): any { // active country

        return this.httpClient.get<Country[]>(SERVER_API_URL + 'api/users/country');
    }

    public updateUser(user: User): any {
        user.dob = this.commonService.transformDate(user.dob);
        return this.httpClient.put<User>(SERVER_API_URL + 'api/auth/users/update', user);
    }

    public changeUserPassword(email, password): any {
        return this.httpClient.put(SERVER_API_URL + 'api/auth/users/update/password?email=' + email + '&password=' + password, new UserChangePasswordEntity(email, password));
    }

    public getCurrentUser(): any {
        return this.httpClient.get<User>(SERVER_API_URL + 'api/auth/users/current');
    }

    public getUserByEmail(email): any {
        return this.httpClient.get<User>(SERVER_API_URL + 'api/users/email?email=' + email);
    }

    public addUser(user: User): any {
        user.dob = this.commonService.transformDate(user.dob);
        return this.httpClient.post<User>(SERVER_API_URL + 'api/users', user);
    }

    public getUserbyId(id): any {
        return this.httpClient.get<User>(SERVER_API_URL + 'api/auth/users/' + id);
    }


}
