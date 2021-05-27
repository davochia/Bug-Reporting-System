import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { WavesModule, TableModule, InputsModule } from 'angular-bootstrap-md';
//import { WavesModule, TableModule, IconsModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddBugComponent } from './components/add-bug/add-bug.component';
import { BugComponent } from './components/bug/bug.component';
import { ListBugComponent } from './components/list-bug/list-bug.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { EditComponent } from './components/edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BugService } from './services/bug.service';
import { SortDirective } from './shared/directive/sort.directive';

@NgModule({
  declarations: [
    AppComponent,
    BugComponent,
    AddBugComponent,
    ListBugComponent,
    HeaderComponent,
    FooterComponent,
    EditComponent,
    PageNotFoundComponent,
    SortDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatPaginatorModule,
    WavesModule,
    TableModule,
    InputsModule,
  ],

  providers: [
    BugService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  entryComponents: [EditComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
