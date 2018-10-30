import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  user = null;
  email = 'teo@gmail.com';
  password = '';
  constructor(private http: Http) {}

  signIn() {
    const URL = 'http://localhost:3000/user/signin';
    const { email, password } = this;
    this.http.post(URL, { email, password })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      this.user = resJson.user;
      localStorage.setItem('token', this.user.token);
    })
    .catch(() => alert('Invalid user info'));
  }

  ngOnInit() {
    const URL = 'http://localhost:3000/user/check';
    const headers = new Headers({ token: localStorage.getItem('token') });
    this.http.get(URL, { headers })
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      this.user = resJson.user;
    })
    .catch(() => console.log('Invalid token'));
  }

  logOut() {
    localStorage.removeItem('token');
    this.user = null;
  }
}
