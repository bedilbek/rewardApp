import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { DemoMaterialModule } from './shared/demo-material-module';

@NgModule({
  declarations: [
    AppComponent,
    AppBlankComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,  
    HttpClientModule,
    SharedModule,  
    RouterModule.forRoot(AppRoutes)  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
