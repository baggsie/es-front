import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AttendancePageComponent} from "./components/attendance-page/attendance-page.component";
import {HttpClientModule} from "@angular/common/http";
import {AttendanceTableComponent} from './attendance-table/attendance-table.component';

@NgModule({
  declarations: [
    AppComponent, AttendanceTableComponent
  ],
    imports: [
        BrowserModule,
        AttendancePageComponent
    ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
