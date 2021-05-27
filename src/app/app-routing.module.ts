import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBugComponent } from './components/add-bug/add-bug.component';
import { BugComponent } from './components/bug/bug.component';
import { ListBugComponent } from './components/list-bug/list-bug.component';

const routes: Routes = [
  { path: '', component: ListBugComponent },
  { path: 'add-report', component: AddBugComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
