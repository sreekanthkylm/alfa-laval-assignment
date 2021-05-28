import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isDarkTheme;
  @Output() themeChange = new EventEmitter<boolean>();
  btnStyle: boolean = false;

  constructor() { }
  ngOnInit(): void {
  }

  changeTheme(): void {
    if (this.isDarkTheme) {
      this.themeChange.emit(false)
    } else {
      this.themeChange.emit(true)
    }
  }

  togglenav() {
    this.btnStyle = !this.btnStyle;
  }

}
