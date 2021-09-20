import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseUrl = environment.apiUrl;
  public imageUrl = environment.imgUrl;

  constructor(private http: HttpClient) { }

  public get(url, params = null): Observable<any> {
    if (params) {
      return this.http
        .get(this.baseUrl + url, {
          params
        })
        .pipe(
          map(this.handleResponse),
          catchError(this.handleError)
        );
    }
    return this.http.get(this.baseUrl + url).pipe(
      map(this.handleResponse),
      catchError(this.handleError)
    );
  }
  public getProduct(url): Observable<any> {
    return this.http
      .get(url)
      .pipe(
        map(this.handleResponse),
        catchError(this.handleError)
      );
  }

  public post(url, params): Observable<any> {
    return this.http.post(this.baseUrl + url, params).pipe(
      map(this.handleResponse),
      catchError(this.handleError)
    );
  }

  public put(url, params): Observable<any> {
    return this.http.put(this.baseUrl + url, params).pipe(
      map(this.handleResponse),
      catchError(this.handleError)
    );
  }

  public delete(url): Observable<any> {
    return this.http.delete(this.baseUrl + url).pipe(
      map(this.handleResponse),
      catchError(this.handleError)
    );
  }

  public handleResponse(data) {
    //console.log('server sent this data' + JSON.stringify(data));
    if (
      data &&
      data.status_code &&
      (data.status_code === 401)
    ) {

      window.location.href = "/login";

    }
    return data;
  }

  public handleError(error) {
    return throwError(error);
  }
  public numberFormat(number, decimals, dec_point, thousands_sep) {
    var n = number,
      prec = decimals;

    var toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return (Math.round(n * k) / k).toString();
    };

    n = !isFinite(+n) ? 0 : +n;
    prec = !isFinite(+prec) ? 0 : Math.abs(prec);
    var sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep;
    var dec = typeof dec_point === 'undefined' ? '.' : dec_point;

    var s = prec > 0 ? toFixedFix(n, prec) : toFixedFix(Math.round(n), prec);
    //fix for IE parseFloat(0.55).toFixed(0) = 0;

    var abs = toFixedFix(Math.abs(n), prec);
    var _, i;

    if (abs >= '1000') {
      _ = abs.split(/\D/);
      i = _[0].length % 3 || 3;

      _[0] =
        s.slice(0, i + (n < 0)) + _[0].slice(i).replace(/(\d{3})/g, sep + '$1');
      s = _.join(dec);
    } else {
      s = s.replace('.', dec);
    }

    var decPos = s.indexOf(dec);
    if (prec >= 1 && decPos !== -1 && s.length - decPos - 1 < prec) {
      s += new Array(prec - (s.length - decPos - 1)).join('0') + '0';
    } else if (prec >= 1 && decPos === -1) {
      s += dec + new Array(prec).join('0') + '0';
    }
    return s;
  }
  dateFormat(date) {
    return moment(date).format('MM-DD-yyyy');
  }
  
}
