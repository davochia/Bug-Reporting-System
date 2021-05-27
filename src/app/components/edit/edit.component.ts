import { IBugs } from 'src/app/shared/models/bug-model';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  bugFormGroup: FormGroup;
  bugForm: IBugs;
  @Output() editBug = new EventEmitter<IBugs>();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditComponent>
  ) {
    this.createBugForm();
  }

  ngOnInit(): void {}

  /** edit new Bug to the backend */
  onSubmit() {
    this.bugForm = this.bugFormGroup.value;
    console.log(this.bugForm);
    this.editBug.emit(this.bugForm);
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
}
