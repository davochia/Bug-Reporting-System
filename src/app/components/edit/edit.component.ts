import { IBugs } from 'src/app/shared/models/bug-model';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BugService } from 'src/app/services/bug.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  bugFormGroup: FormGroup;
  bugForm: IBugs;
  title: string;
  @Output() editBug = new EventEmitter<IBugs>();

  constructor(
    private bugService: BugService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBugs
  ) {
    this.createBugForm();
    this.title = data.title;
  }

  ngOnInit(): void {
    console.log(history.state.data);
  }

  /** edit new Bug to the backend */
  onSubmit() {
    // this.bugForm = this.bugFormGroup.value;
    // console.log(this.bugForm);
    // this.editBug.emit(this.bugForm);

    if (this.bugFormGroup.get('reporter').value == 'QA') {
      this.bugFormGroup.get('status').validator = <any>(
        Validators.compose([Validators.required])
      );
    }
    //this.addNewBug.emit(this.bugFormGroup.value);
    // this.bugService.addBug(this.bugFormGroup.value);
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
    this.dialogRef.close();
  }

  save() {}
  /** Create new bug form */
  createBugForm() {
    this.bugFormGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      reporter: ['', Validators.required],
      status: ['', Validators.required],
      updatedAt: [''],
      createdAt: [''],
      comments: ['', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
