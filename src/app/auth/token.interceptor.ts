import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, tap, filter, take, finalize } from 'rxjs/operators';
import { TOKEN_API_URL, AUTH_DETAILS } from 'src/environments/environment';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private http: HttpClient) { }

    /**
     * 
     * @param request HttpRequest
     * @param next HttpHandler
     * @description intercept method which calls every time before sending requst to server
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Taking an access token
        const accessToken = sessionStorage.getItem('ACCESS_TOKEN');
        // cloing a request and adding Authorization header with token
        request = this.addToken(request, accessToken);
        // sending request to server and checking for error with status 401 unauthorized
        return next.handle(request).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    // calling refresh token api and if got success extracting token from response and calling failed api due to 401                    
                    return this.handle401Error(request, next);
                } // If api not throwing 401 but gives an error throwing error
                else {
                    return throwError(error);
                }
            }));
    }

    /**
     * 
     * @param request HttpRequest<any>
     * @param token token to in Authorization header
     */
    private addToken(request: HttpRequest<any>, token: string) {
        if (token) {
            return request.clone({
                setHeaders: { 'Authorization': `Bearer ${token}` }
            });
        }
        else {
            return request.clone({});
        }
    }

    /**
     * This method will called when any api fails due to 401 and calls for refresh token
     */
    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        // If Refresh token api is not already in progress
        if (this.isRefreshing) {
            // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
            // – which means the new token is ready and we can retry the request again
            return this.refreshTokenSubject
                .pipe(
                    filter(token => token != null),
                    take(1),
                    switchMap(jwt => {
                        return next.handle(this.addToken(request, jwt))
                    }));
        } else {
            // updating variable with api is in progress
            this.isRefreshing = true;
            // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
            this.refreshTokenSubject.next(null);
            const tokenDataString = `client_id=${AUTH_DETAILS.CLIENT_ID}&client_secret=${AUTH_DETAILS.CLIENT_SECRET}&grant_type=${AUTH_DETAILS.CLIENT_CREDNTIALS}`;
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            };
            return this.http.post<any>(TOKEN_API_URL, tokenDataString, httpOptions)
                .pipe(switchMap((tokens) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(tokens.access_token);
                    // updating value of expires in variable                    
                    sessionStorage.setItem('ACCESS_TOKEN', tokens.access_token);
                    return next.handle(this.addToken(request, tokens.access_token));
                }));
        }
    }
}