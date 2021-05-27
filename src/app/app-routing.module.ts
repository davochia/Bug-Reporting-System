import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBugComponent } from './components/add-bug/add-bug.component';
import { BugComponent } from './components/bug/bug.component';
import { EditComponent } from './components/edit/edit.component';
import { ListBugComponent } from './components/list-bug/list-bug.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: BugComponent },
  { path: 'add-report', component: AddBugComponent },
  { path: 'edit-report', component: EditComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
