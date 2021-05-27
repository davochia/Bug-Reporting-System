import { BugService } from 'src/app/services/bug.service';
import { IComment } from './../../shared/models/bug-comment';
import { IBugs } from './../../shared/models/bug-model';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list-bug',
  templateUrl: './list-bug.component.html',
  styleUrls: ['./list-bug.component.scss'],
})
export class ListBugComponent implements OnInit {
  page = 4;
  bugFormGroup: FormGroup;
  bugForm: IBugs;

  @Input() bugList: IBugs[];
  @Input() commentList: IComment[];

  @Output() editBug = new EventEmitter<IBugs>();
  @Output() deleteBug = new EventEmitter<IBugs>();

  constructor(private fb: FormBuilder, private bugService: BugService) {}

  ngOnInit(): void {
    // this.createBugForm();
  }

  /** Emit bug to edit to parent component */
  onEdit(bug: IBugs) {
    this.bugFormGroup = this.fb.group({
      id: [bug.id],
      title: [bug.title],
      description: [bug.description],
      priority: [bug.priority],
      reporter: [bug.reporter],
      status: [bug.status],
      updatedAt: [Date.now().toString],
      createdAt: [bug.createdAt],
      comments: [bug.comments],
    });
  }

  onSubmit() {
    //this.editBug.emit(this.bugFormGroup.value);
    // console.log(this.bugForm.comments);

    this.bugService.editBug(this.bugFormGroup.value);

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
}
