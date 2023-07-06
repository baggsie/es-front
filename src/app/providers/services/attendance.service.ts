import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  //
  // Idéalement, l'observable devrait être typé à l'aide d'une interface/DTO - en raison des contraintes de temps,
  // je n'ai pas fait cela.
  //
  getAttendanceData$() {
    return this.http.get('http://localhost:3001/attendance')
  }
}
