import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DatePipe} from '@angular/common';


@Injectable({
    providedIn: 'root'
})

export class CommonService {

    constructor(
        private httpClient: HttpClient,
        private datePipe: DatePipe
    ) {
    }

    public transformDate(date): string {
        return this.datePipe.transform(date, 'yyyy-MM-dd');
    }

    public genarateUniqueId(): string {
        const date = new Date();
        return Math.floor(Math.random() * 1000000) + '' + date.getTime();
    }


}
