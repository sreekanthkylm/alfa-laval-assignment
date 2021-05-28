import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_BASE_URL } from 'src/environments/environment';

@Injectable()
export class AmadeusApiService {

    constructor(private http: HttpClient) { }

    getportDetails(keyword) {
        //const params = new HttpParams().set('subType', 'AIRPORT,CITY').set('keyword', keyword);
        const params = new HttpParams().set('subType', 'AIRPORT').set('keyword', keyword);
        return this.http.get(`${API_BASE_URL}/v1/reference-data/locations`, { params });
    }

    getFlightOffers(searchdata) {
        let params = new HttpParams()
            .set('originLocationCode', searchdata.from)
            .set('destinationLocationCode', searchdata.to)
            .set('departureDate', searchdata.startDate)
            .set('adults', searchdata.passengerData.adults)
            .set('children', searchdata.passengerData.children)
            .set('infants', searchdata.passengerData.infants)
            .set('travelClass', searchdata.travelClass)
            .set('max', '50');
        if (searchdata.endDate) {
            params = params.set('returnDate', searchdata.endDate)
        }
        return this.http.get(`${API_BASE_URL}/v2/shopping/flight-offers`, { params });
    }

    /* Other Apis */
    // getFlightDestinations() {
    //     return this.http.get(`${API_BASE_URL}/v1/shopping/flight-destinations?origin=PAR&maxPrice=200`);
    // }

    // getFlightCheapestDate() {
    //     return this.http.get(`${API_BASE_URL}/v1/shopping/flight-dates?origin=SYD&destination=BKK`);
    // }

    // postFlightOffers() {
    //     const data = {};
    //     return this.http.post(`${API_BASE_URL}/v2/shopping/flight-offers`, data);
    // }

}