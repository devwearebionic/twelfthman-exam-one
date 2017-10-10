import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';

import { Image } from './../model/image'; 
import { ImageService } from './../service/image.service';
import { appConfig } from './../app.config';

const URL = appConfig.apiUrl + 'image/upload';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

	imageForm: FormGroup;
	imageData: any;
	filename:string;

	public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  	public hasBaseDropZoneOver:boolean = false;

	constructor(
	    public router: Router,
	    private route: ActivatedRoute,
	    private imageService: ImageService,
	    private location: Location,
	    private fb: FormBuilder
	){}

	ngOnInit(): void {

		this.imageForm = this.fb.group({
	      'image': new FormControl(null, []),
	      'description': new FormControl(null, []),
	    });

	    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };

	    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
	        
		  let uploadResponse:any = JSON.parse(response); 
		  this.filename = uploadResponse.filename;

		};

		this.uploader.onCompleteAll = () => {
			this.storeData();
		};


  	}

  	save(data){

  		if (this.imageForm.valid) {

	      this.imageData = data;

	      if( this.uploader.queue.length > 0 ){
	        this.uploader.uploadAll();
	      }
	      else{
	      	swal("Image Required", "The image field is required.", "error");
	      }

	    }

  	}

  	storeData(){

	    let imageData:any = {'url':this.filename};

	    this.imageData = Object.assign(this.imageData,imageData);

	    this.imageService.create(this.imageData)
	    .subscribe(
	        data => {

	        	this.imageForm.patchValue({
		          'image': '',
		          'description': ''
		        });


	        	swal("Image Upload Success", "The image was successfully uploaded.", "success");

	        });


  	}


}
