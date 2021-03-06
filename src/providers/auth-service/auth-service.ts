import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


import 'rxjs/add/operator/map';

let apiUrl = 'https://app.web/api/';

@Injectable()
export class AuthService {
  // private isLoggedIn = false;

  constructor(public http: Http) {}

  login(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+'login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
            // this.isLoggedIn = true;
          }, (err) => {
            reject(err);
          });
    });
  }

  checkPnrAuth(pnr){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.get('http://medurin.com/api/v1/test.php?pnr='+pnr, {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  // register(data) {
  //   return new Promise((resolve, reject) => {
  //       let headers = new Headers();
  //       headers.append('Content-Type', 'application/json');

  //       this.http.post(apiUrl+'guest/signup', JSON.stringify(data), {headers: headers})
  //         .subscribe(res => {
  //           resolve(res.json());
  //         }, (err) => {
  //           reject(err);
  //         });
  //   });
  // }

  // logout(){
  //   return new Promise((resolve, reject) => {
  //       let headers = new Headers();
  //       headers.append('X-Auth-Token', localStorage.getItem('token'));

  //       this.http.post(apiUrl+'logout', {}, {headers: headers})
  //         .subscribe(res => {
  //           localStorage.clear();
  //         }, (err) => {
  //           reject(err);
  //         });
  //   });
  // }

}