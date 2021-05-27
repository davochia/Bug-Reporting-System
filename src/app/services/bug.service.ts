import { IBugs } from './../shared/models/bug-model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({}),
};

@Injectable({
  providedIn: 'root',
})
export class BugService {
  bugURL = environment.baseURL + 'bugs';
  bug: IBugs[] = [
    {
      id: 'test 1',
      title: 'test-1',
      description: 'test 1',
      priority: 3,
      reporter: 'David',
      status: 'test',
      updatedAt: '2021-10-05T14:48:00.000Z',
      createdAt: '2021-10-05T14:48:00.000Z',
      comments: [
        //{ _id: 'com 1', description: 'desc 1', reporter: 'reporter 1' },
      ],
    },
  ];

  bug$ = new BehaviorSubject<IBugs[]>(this.bug);

  constructor(private http: HttpClient) {}

  addBug(bug: IBugs) {
    this.http
      .post<IBugs>(`${this.bugURL}`, bug, httpOptions)
      .subscribe((bug) => {
        //console.log(bug);
        this.getALLBugs();
      });
  }

  getBugByID(id: string) {
    this.http.get<IBugs>(`${this.bugURL}/${id}`);
  }

  editBug(bug: IBugs) {
    console.log(bug);
    this.http
      .put<IBugs>(`${this.bugURL}/${bug.id}`, bug, httpOptions)
      .subscribe((bug) => {
        this.getALLBugs();
      });
  }
  deleteBug(bug: IBugs) {
    this.http.delete<IBugs>(`${this.bugURL}/${bug.id}`).subscribe((bug) => {
      this.getALLBugs();
    });
  }

  getALLBugs() {
    this.http.get(`${this.bugURL}`).subscribe((bug: IBugs[]) => {
      //console.log(bug);
      this.bug$.next(bug);
    });
  }
}
