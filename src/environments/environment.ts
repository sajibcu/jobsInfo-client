// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    CAPTCHA_SITE_KEY: '6LdutaoUAAAAAGAhApG-Idwg1QaFfRZa5i6CR0qR',
    SERVER_API_URL: 'http://' + window.location.hostname + ':808/',
    firebase: {
        apiKey: 'AIzaSyCY7K223j-HVOCliDcKwjr7df31K3jfhCY',
        authDomain: 'jobsinfo-d61a8.firebaseapp.com',
        databaseURL: 'https://jobsinfo-d61a8.firebaseio.com',
        projectId: 'jobsinfo-d61a8',
        storageBucket: '',
        messagingSenderId: '1092441648469',
        appId: '1:1092441648469:web:ff3872a84cfce07edc13dc',
        measurementId: 'G-7Y5H73RJEB'

    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
