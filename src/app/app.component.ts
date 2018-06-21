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
  public tripletsSum: number;
  public tripletsCounts: number;
  public countTripletsIntegersString: string = '';

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

  countTriplets(tripletsSum: number) {
    const integers = this.countTripletsIntegersString.split(',');
    this.http.post(
      environment.apiUrl + '/japheth/ongeri/tulaa/tripletSums',
      {
        distinctIntegers: integers,
        sumValue: tripletsSum
      },
      {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    ).subscribe(
      res => {
        if (res) {
          const data = res as any;
          this.tripletsCounts = data.resultCount;
        }
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('Done counting triplets');
      }
    );
  }

  sanitizeIntegersList() {
    this.tripletsCounts = null;
    // this.countTripletsIntegersString = this.countTripletsIntegersString.replace(/\s/g, '');
    this.countTripletsIntegersString = this.countTripletsIntegersString.replace(/[^\d,-]/g, '');
  }
}
