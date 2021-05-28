import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  adults: number;
  children: number;
  infants: number;
}

@Component({
  selector: 'app-search-box-popup',
  templateUrl: './search-box-popup.component.html',
  styleUrls: ['./search-box-popup.component.scss']
})
export class SearchBoxPopupComponent {

  constructor(public dialogRef: MatDialogRef<SearchBoxPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
