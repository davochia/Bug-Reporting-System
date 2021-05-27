import { IBugs } from 'src/app/shared/models/bug-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BugService } from 'src/app/services/bug.service';

@Component({
  selector: 'app-add-bug',
  templateUrl: './add-bug.component.html',
  styleUrls: ['./add-bug.component.scss'],
})
export class AddBugComponent implements OnInit {
  bugFormGroup: FormGroup;
  bugForm: IBugs;
  addMore: boolean = false;
  @Output() addNewBug = new EventEmitter<IBugs>();
  //@Input() commentList: IComment[];

  constructor(private fb: FormBuilder, private bugService: BugService) {}

  ngOnInit(): void {
    this.createBugForm();
  }

  /** Create new bug form */
  createBugForm() {
    this.bugFormGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      reporter: ['', Validators.required],
      status: [''],
      createdAt: [Date.now().toString],
      comments: [[], [Validators.required, Validators.min(5)]],
    });
  }

  onSubmit() {
    if (this.bugFormGroup.get('reporter').value == 'QA') {
      this.bugFormGroup.get('status').validator = <any>(
        Validators.compose([Validators.required])
      );
    }
    //this.addNewBug.emit(this.bugFormGroup.value);
    this.bugService.addBug(this.bugFormGroup.value);
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

  onAddMoreComment() {
    this.addMore = !this.addMore;
  }
}
