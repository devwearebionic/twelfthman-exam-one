import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { appConfig } from './../app.config';
import { Image } from './../model/image'; 
import { ImageService } from './../service/image.service';
import { saveAs } from 'file-saver/FileSaver';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'image-all',
  templateUrl: './image-all.component.html',
  styleUrls: ['./image-all.component.css']
})
export class ImageAllComponent implements OnInit {

	selectedImageId:number = 0;
	selectedImageUrl:string;
	actionNav:boolean = false;
	images:Image;
	imageUrl:string;
	apiImageUrl:string;

	constructor(
    public router: Router,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private location: Location
  ) {}

	ngOnInit(): void {

		this.apiImageUrl = appConfig.imageUrl;

		this.imageService.active()
	        .subscribe(
	          data => {
	            this.images = data;
	      });
  	}

  	hideNav(event){
  		this.actionNav = false;
  	}

	selectImage(selectedImageId:number, selectedImageUrl:string){
		
		this.selectedImageId = selectedImageId;
		this.selectedImageUrl = selectedImageUrl;
		this.actionNav = true;

	}

	downloadImage(){

		this.imageService.download(this.selectedImageId)
	      	.subscribe(
	          data => {

				this.actionNav = false;
				saveAs(data, this.selectedImageUrl);

	          });

	}

	deleteImage(){

		swal({
		  title: 'Delete Image',
		  text: "Are you sure you want to delete this image?",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes'
		}).then( () => {
		  
		  this.imageService.delete(this.selectedImageId)
	      	.subscribe(
	          data => {

				this.imageService.active()
				.subscribe(
					data => {
					this.images = data;
				});

				this.actionNav = false;

	          	swal("Deleted", "The image has been deleted.", "success");

	          });
			

		}).catch(swal.noop);

	}




}
