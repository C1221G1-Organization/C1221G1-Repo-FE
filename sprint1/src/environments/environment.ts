// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  url8080retail: 'http://localhost:8080/api/manager-sale/invoiceMedicines',
  url8080prescription: 'http://localhost:8080/api/manager-prescription/prescriptions',
  firebaseConfig: {
    apiKey: 'AIzaSyAyMrBGwsFyKO3vaKNu_U9LtdJbGiFP2gA',
    databaseURL: 'https://fir-chat-9b119-default-rtdb.asia-southeast1.firebasedatabase.app'
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
