import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AttendanceService} from "../../providers/services/attendance.service";
import {HttpClientModule} from "@angular/common/http";
import {map, tap} from "rxjs";
import SignaturePad from "signature_pad";

interface IStudent  {
  "id": number;
  "presenceState": false;
  "signatureTimestamp": string;
  "signature": any | null;
  "comment": string;
  "dateCreated": string;
  "dateUpdated": string;
  "FIRSTNAME": string;
  "LASTNAME": string;
}

@Component({
  selector: 'app-attendance-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <ul>
      <li *ngFor="let student of studentData ">
        <input type="checkbox">
        <div class="student-data">
          <p>{{student.LASTNAME}} {{student.FIRSTNAME}}</p>
          <p *ngIf="student.signatureTimestamp">{{student.signatureTimestamp|date}}</p>
        </div>
        <div *ngIf="student.presenceState" class="state state--present">Présent</div>
        <div *ngIf="!student.presenceState" class="state state--absent">Absent</div>
        <select name="" id="">
          <option value="">Signer</option>
          <option value="">Absent</option>
          <option value="">Commentaire</option>
        </select>
        <span>X</span>
      </li>
    </ul>

    <canvas #signatureBox id="signature-pad" class="signature-pad" width=400 height=200></canvas>

  `,
  styleUrls: ['./attendance-page.component.scss']
})
export class AttendancePageComponent implements OnInit {

  @ViewChild('signatureBox') signatureBox!: ElementRef;

  attendanceId!: number;

  studentData!: IStudent[];

  constructor(protected attendanceService: AttendanceService) {
  }

  ngOnInit(): void {

    //
    // Normalement, je dirigerais cela directement vers le composant, mais TypeScript
    // renvoyait une erreur 'peut-être nulle' - normalement, la façon de contourner cela est d'utiliser
    // un filter() dans le  pipe() mais je ne me souvenais plus de la syntaxe - dans une situation normale,
    // la plupart de ce code serait conservé dans unservice.
    //
    // Je ne me suis pas non plus unsubscribed() de getAttendanceData$ en raison des limites de temps.
    //
    this.attendanceService.getAttendanceData$()
      .pipe(
        tap((res: any) => this.attendanceId = res.attendanceSheet.ID),
        map((res: any) => {
          return res.attendanceSheet.STUDENTS;
        })
      )
      .subscribe({
      next: (res: any) => {
        console.log('res', res);
        this.studentData = res;
     },
      error: (err: any) => {
        console.error(err);
      },
      complete: () => {
        console.log('completed')
      }
    })
  }
}
