import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { appConfig } from './../app.config';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Image } from './../model/image';

@Injectable()
export class ImageService {

	constructor(private http: Http) { }

	create(image: Image) {
        return this.http.post(appConfig.apiUrl + 'image/create', image);
    }

    active() {

        return this.http.get(appConfig.apiUrl + 'image/active').map((response: Response) => {
            let image = response.json();
            return image.data as Image;
        });

    }

    deleted() {

        return this.http.get(appConfig.apiUrl + 'image/deleted').map((response: Response) => {
            let image = response.json();
            return image.data as Image;
        });

    }

    delete(id:number) {
        
        return this.http.delete(appConfig.apiUrl + 'image/delete/'+id).map((response: Response) => {
            let image = response.json();
            return image.status;
        });

    }

    restore(id:number) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post(appConfig.apiUrl + 'image/restore', JSON.stringify({'id':id}), {headers: headers}).map((response: Response) => {
            let image = response.json();
            return image.status;
        });

    }
    
}