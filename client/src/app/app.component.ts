import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';

const TODO_KEY = makeStateKey('TODO_KEY');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'tnv-universal';
  data = null;

  constructor(private http: Http, private state: TransferState) {}

  ngOnInit() {
    this.data = this.state.get(TODO_KEY, null);
    if (this.data) { return; }
    const URL = 'https://jsonplaceholder.typicode.com/todos/1';
    this.http.get(URL)
    .toPromise()
    .then(res => res.json())
    .then(resJson => {
      this.data = resJson;
      this.state.set(TODO_KEY, resJson);
    });
  }
}
