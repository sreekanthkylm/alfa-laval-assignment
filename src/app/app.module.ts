import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RefreshTokenInterceptor } from './auth/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LanderComponent } from './components/lander/lander.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchBoxPopupComponent } from './components/search-box-popup/search-box-popup.component';
import { AmadeusApiService } from './services/amadeus-api.service';
import { DatePipe } from '@angular/common';
import { FlightNamePipe } from './pipes/flightname.pipe';

@NgModule({
  declarations: [
    FlightNamePipe, AppComponent, HeaderComponent, FooterComponent, LanderComponent, SearchBoxComponent, SearchResultsComponent, SearchBoxPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    AmadeusApiService,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
