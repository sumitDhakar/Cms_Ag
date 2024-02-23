import { HttpEventType } from "@angular/common/http";

export class FileStatus {
    fileName = '';
    fileSize = 0;
    status = 'progress';
    requestType = 'Uploading';
    percent = 0;
    req: any;
    

    subscribe(req: any) {
        this.req = req;
        this.req.subscribe((event: any) => {
           if(event.type === HttpEventType.UploadProgress){
                this.percent = Math.round(100 * event.loaded / event.total!);
                console.log(this.percent);
           }else if(event.type === HttpEventType.Response){
            console.log(event);

            }
            

        })
        console.log("filname " ,this.fileName);
        
    }

    unsubscribe() {
        this.req.unsubscribe();
    }

}
