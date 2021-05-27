import { BugService } from 'src/app/services/bug.service';
import { IComment } from './../../shared/models/bug-comment';
import { IBugs } from './../../shared/models/bug-model';
import {
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-list-bug',
  templateUrl: './list-bug.component.html',
  styleUrls: ['./list-bug.component.scss'],
})
export class ListBugComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  /**Pigination  */
  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  searchText: string = '';
  previous: string;

  bugFormGroup: FormGroup;
  bugForm: IBugs;

  @Input() bugList: IBugs[];
  @Input() commentList: IComment[];

  @Output() editBug = new EventEmitter<IBugs>();
  @Output() deleteBug = new EventEmitter<IBugs>();

  constructor(
    private fb: FormBuilder,
    private bugService: BugService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.createBugForm();
    this.mdbTable.setDataSource(this.bugList);
    this.previous = this.mdbTable.getDataSource();
  }

  /** Emit bug to edit to parent component */
  onEdit(bug: IBugs) {
    //this.router.navigate(['/edit-report'], { state: { data: { bug } } });

    this.bugForm = bug;

    const dialogRef = this.dialog.open(EditComponent, {
      width: '80%',
      data: { bug },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

  onSubmit() {
    // this.bugFormGroup = this.fb.group({
    //   id: [bug.id],
    //   title: [bug.title],
    //   description: [bug.description],
    //   priority: [bug.priority],
    //   reporter: [bug.reporter],
    //   status: [bug.status],
    //   updatedAt: [Date.now().toString],
    //   createdAt: [bug.createdAt],
    //   comments: [bug.comments],
    // });

    //this.editBug.emit(this.bugFormGroup.value);
    // console.log(this.bugForm.comments);

    //this.bugService.editBug(this.bugFormGroup.value);

    this.bugFormGroup.reset({
      title: '',
      description: '',
      priority: '',
      reporter: '',
      status: '',
      updatedAt: '',
      createdAt: [''],
      comments: '',
    });
  }

  /** Clear form fields */
  cancel() {
    this.bugFormGroup.reset({
      title: '',
      description: '',
      priority: '',
      reporter: '',
      status: '',
      updatedAt: '',
      createdAt: [''],
      comments: '',
    });
  }

  /** Emit bug to delete to parent component */
  onDelete(bug: IBugs) {
    this.deleteBug.emit(bug);
  }

  onAddComment(comment: IComment) {
    this.commentList.push(comment);
  }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.bugList = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.bugList = this.mdbTable.searchLocalDataByMultipleFields(
        this.searchText,
        ['title', 'createdAt']
      );
      this.mdbTable.setDataSource(prev);
    }
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
}
