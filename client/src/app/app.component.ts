import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CookiesService } from './cookies/cookies.service';
import { TransferState, makeStateKey } from '@angular/platform-browser';

const USER_KEY = makeStateKey('USER_KEY');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  user = null;
  email = 'teo@gmail.com';
  password = '';
  constructor(private http: Http, private cookies: CookiesService, private state: TransferState) {}

  signIn() {
    const URL = 'http://localhost:3000/user/signin';
    const { email, password } = this;
    this.http.post(URL, { email, password })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      this.user = resJson.user;
      // localStorage.setItem('token', this.user.token);
      this.cookies.put('token', this.user.token);
    })
    .catch(() => alert('Invalid user info'));
  }

  ngOnInit() {
    this.user = this.state.get(USER_KEY, null);
    if (this.user) { return; }
    const URL = 'http://localhost:3000/user/check';
    const token = this.cookies.get('token');
    const headers = new Headers({ token });
    this.http.get(URL, { headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      this.user = resJson.user;
      this.state.set(USER_KEY, this.user);
    })
    .catch(() => console.log('Invalid token'));
  }

  logOut() {
    // localStorage.removeItem('token');
    this.cookies.remove('token');
    this.user = null;
  }
}
