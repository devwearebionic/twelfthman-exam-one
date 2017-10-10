import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { ImageAllComponent } from './image_all/image-all.component';
import { ImageDeleteComponent } from './image_delete/image-delete.component';
import { ImageUploadComponent } from './image_upload/image-upload.component';

import { ImageService } from './service/image.service';

@NgModule({
  declarations: [
    AppComponent,
    ImageAllComponent,
    ImageDeleteComponent,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
