import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Japheth Ongeri Tulaa Test UI';
  public reverseStringResult: string;
  public stringToReverse: string;

  constructor(private http: HttpClient) {
  }

  reverseString(inputString: string) {
    this.http.post(
      environment.apiUrl + '/japheth/ongeri/tulaa/reverseAlpha',
      {inputString: inputString},
      {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    ).subscribe(
      res => {
        if (res) {
          const data = res as any;
          this.reverseStringResult = data.outputString;
        }
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Done reversing string', inputString);
      }
    );
  }
}
