import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StringifyDataPipe, WizardComponent } from './wizard/wizard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule, GridModule, IconModule, InputModule, PaginationModule, ProgressIndicatorModule, TagModule } from 'carbon-components-angular';
import { ButtonModule } from 'carbon-components-angular';
import { DropdownModule } from 'carbon-components-angular';
import { DeleteModule, AddAltModule } from '@carbon/icons-angular';
import { DxDataGridModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WizardComponent,
    StringifyDataPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputModule,
    ButtonModule,
    DropdownModule,
    IconModule,
    DeleteModule,
    AddAltModule,
    PaginationModule,
    DxDataGridModule,
    TagModule,
    GridModule,
    BreadcrumbModule,
    ProgressIndicatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
