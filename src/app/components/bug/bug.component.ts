import { IComment } from './../../shared/models/bug-comment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BugService } from 'src/app/services/bug.service';
import { IBugs } from 'src/app/shared/models/bug-model';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.scss'],
})
export class BugComponent implements OnInit {
  bugs: IBugs[] = [];
  comments: IComment[] = [];

  constructor(private bugService: BugService) {}

  ngOnInit(): void {
    this.bugService.getALLBugs(); // Get all bug from backend
    this.bugService.bug$.subscribe((bugs) => {
      //console.log(bugs);
      this.bugs = bugs;
      bugs.map((bug: IBugs) => {
        this.comments = bug.comments;
      });
    });
  }

  /** Add new Bug to the backend */
  onAddBug(bug: IBugs) {
    console.log(bug);
    this.bugService.addBug(bug);
  }

  /** Update Bug in the backend */
  onUpdateBug(data: IBugs) {
    this.bugService.editBug(data);
  }

  /** Delete Bug from the backend */
  onDeleteBug(data: IBugs) {
    //console.log('Delete: ', data);
    this.bugs = this.bugs.filter(
      (bug) =>
        //console.log(bug);
        bug.id != data.id
    );
  }
}
