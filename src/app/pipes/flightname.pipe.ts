import {
    Pipe,
    PipeTransform
} from '@angular/core';

@Pipe({
    name: 'FlightName',
    pure: true
})
export class FlightNamePipe implements PipeTransform {

    transform(value: string, args?: any): any {
        return this.getFlightName(value, args);
    }

    getFlightName(value, obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (prop === value) {
                    return obj[prop];
                }

            }
        }
    }
}