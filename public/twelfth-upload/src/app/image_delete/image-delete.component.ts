import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { appConfig } from './../app.config';
import { Image } from './../model/image'; 
import { ImageService } from './../service/image.service';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'image-delete',
  templateUrl: './image-delete.component.html',
  styleUrls: ['./image-delete.component.css']
})
export class ImageDeleteComponent {

	selectedImageId:number = 0;
	selectedImageUrl:string;
	actionNav:boolean = false;
	images:Image;
	imageUrl:string;

	constructor(
    public router: Router,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private location: Location
  ) {}


	ngOnInit(): void {

		this.imageService.deleted()
	        .subscribe(
	          data => {
	            this.images = data;
	      });
  	}

	selectImage(selectedImageId:number, selectedImageUrl:string){

		this.selectedImageId = selectedImageId;
		this.selectedImageUrl = selectedImageUrl;
		this.actionNav = true;

		this.imageUrl = appConfig.imageUrl + '/' + this.selectedImageUrl;

	}

	restoreImage(){

		swal({
		  title: 'Restore Image',
		  text: "Are you sure you want to restore this image?",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes'
		}).then( () => {
		  
		  this.imageService.restore(this.selectedImageId)
	      	.subscribe(
	          data => {

				this.imageService.deleted()
				.subscribe(
					data => {
					this.images = data;
				});

				this.actionNav = false;

	          	swal("Restored", "The image has been restored.", "success");

	          });
			

		}).catch(swal.noop);

	}

}
