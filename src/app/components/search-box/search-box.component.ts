import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SearchBoxPopupComponent } from '../search-box-popup/search-box-popup.component';
import { AmadeusApiService } from '../../services/amadeus-api.service';
import { MatOptionSelectionChange } from '@angular/material/core';
import { debounceTime, filter, distinctUntilChanged } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

export interface DialogData {
  adults: number;
  children: number;
  infants: number;
}

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  isOneWay: boolean = true;
  selectedCabin: string = 'ECONOMY';
  passengerData: DialogData = { adults: 1, children: 0, infants: 0 };
  passengerCount: number = 1;
  orginLocControl = new FormControl();
  destinationLocControl = new FormControl();
  filteredFromOptions: Observable<any[]>;
  filteredToOptions: Observable<any[]>;
  fromOptions = [];
  toOptions = [];
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  startDate = new FormControl();
  autoLoading: boolean = false;
  apiLoading: boolean = false;
  debounceTime: number = 300;
  searchdata: any = {};
  flights = [];
  dictionaries = [];
  resultCount: number;
  errorMessage: string;

  constructor(
    private amadeusApiService: AmadeusApiService,
    public dialog: MatDialog,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.orginLocControl.valueChanges.pipe(filter(v => v.length > 2), distinctUntilChanged(), debounceTime(this.debounceTime)).subscribe(newvalue =>
      this.getFromPortDetails(newvalue)
    );
    this.destinationLocControl.valueChanges.pipe(filter(v => v.length > 2), distinctUntilChanged(), debounceTime(this.debounceTime)).subscribe(newvalue =>
      this.getToPortDetails(newvalue)
    );
  }

  getFromPortDetails($event) {
    this.autoLoading = true;
    this.amadeusApiService.getportDetails($event).subscribe((response: any) => {
      if (response.data) {
        const options = [];
        response.data.forEach(function (item) {
          options.push(item);
        });
        this.fromOptions = options;
      }
      this.filteredFromOptions = this.orginLocControl.valueChanges.pipe(startWith(''), map(value => this._from_filter(value)));
      this.autoLoading = false;
    })
  }

  getToPortDetails($event) {
    this.autoLoading = true;
    this.amadeusApiService.getportDetails($event).subscribe((response: any) => {
      if (response.data) {
        const options = [];
        response.data.forEach(function (item) {
          options.push(item);
        });
        this.toOptions = options;
      }
      this.filteredToOptions = this.destinationLocControl.valueChanges.pipe(startWith(''), map(value => this._to_filter(value)));
      this.autoLoading = false;
    })
  }

  private _from_filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.fromOptions.filter((option: any) => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _to_filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.toOptions.filter((option: any) => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onJourneyOptionChange($event) {
    this.isOneWay = $event.checked;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SearchBoxPopupComponent, {
      width: '220px',
      data: this.passengerData
    });

    dialogRef.afterClosed().subscribe(result => {
      this.passengerData.adults = result.adults;
      this.passengerData.children = result.children;
      this.passengerData.infants = result.infants;
      this.passengerCount = this.passengerData.adults + this.passengerData.children + this.passengerData.infants;
    });
  }

  searchFlightOffers() {
    this.setSearchData();
    this.amadeusApiService.getFlightOffers(this.searchdata).subscribe((response: any) => {
      this.apiLoading = false;
      if (response.data) {
        this.flights = response.data;
        this.dictionaries = response.dictionaries;
        this.resultCount = response.meta.count;
      }
    }, (error) => {
      this.errorMessage = 'Something went wrong. Please Try Again';
      this.apiLoading = false;
    })
  }

  setSearchData() {
    this.apiLoading = true;
    this.errorMessage = '';
    this.resultCount = null;
    this.flights = [];
    this.searchdata = {
      passengerData: this.passengerData,
      travelClass: this.selectedCabin,
      from: this.orginLocControl.value,
      to: this.destinationLocControl.value
    }
    if (!this.isOneWay) {
      this.searchdata.startDate = this.datePipe.transform(this.dateRange.value.start, 'yyyy-MM-dd');
      this.searchdata.endDate = this.datePipe.transform(this.dateRange.value.end, 'yyyy-MM-dd');
    }
    else {
      this.searchdata.startDate = this.datePipe.transform(this.startDate.value, 'yyyy-MM-dd');
    }
  }

}