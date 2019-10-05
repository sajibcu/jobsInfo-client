import {Injectable, Injector} from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {AuthService} from './service/auth.service';


@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private injector: Injector,
    ) {
    }

    intercept(req, next) {
        const authService = this.injector.get(AuthService);
        if (authService.isLoggedIn()) {

            const tokenizedReq = req.clone(
                {
                    setHeaders: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                    }
                }
            );
            return next.handle(tokenizedReq);
        } else {
            const tokenizedReq = req.clone(
                {}
            );
            return next.handle(tokenizedReq);
        }

    }
}
