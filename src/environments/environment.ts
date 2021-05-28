// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
};

export const API_BASE_URL = 'https://test.api.amadeus.com/';
export const TOKEN_API_URL = 'https://test.api.amadeus.com/v1/security/oauth2/token';
export const AUTH_DETAILS = {
  CLIENT_ID: '2YHFb1t0fWGv3mAakt3TAkOcljwtiVE1',
  CLIENT_SECRET: 'R5uShC7EGkqOwymw',
  CLIENT_CREDNTIALS: 'client_credentials'
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
