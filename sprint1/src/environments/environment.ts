// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  firebaseConfig: {
    apiKey: 'AIzaSyCjTZNvlto0gxD035-RzCCbaNHR-jS_jlw',
    authDomain: 'test-baithi.firebaseapp.com',
    projectId: 'test-baithi',
    storageBucket: 'test-baithi.appspot.com',
    messagingSenderId: '163072618401',
    appId: '1:163072618401:web:8140beb8269a41b379e5e0',
    measurementId: 'G-B8BP0V137T'
  },
  adminChat: {
    name: 'ADMIN',
    uuid: 'ADMIN-C12'
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
