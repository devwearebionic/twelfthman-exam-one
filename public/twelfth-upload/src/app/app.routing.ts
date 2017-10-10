import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ImageAllComponent } from './image_all/image-all.component';
import { ImageDeleteComponent } from './image_delete/image-delete.component';
import { ImageUploadComponent } from './image_upload/image-upload.component';

const routes: Routes = [
	{ path: '', redirectTo: 'image/all', pathMatch: 'full' },
  	{ path: 'image/all', component: ImageAllComponent },
  	{ path: 'image/delete', component: ImageDeleteComponent },
  	{ path: 'image/upload', component: ImageUploadComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}