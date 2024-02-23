import { environment } from 'src/environments/environment';

export class ImageUtil {

    BASE_URL = "cmsApi/rise";
    imageUrl = environment.hostUrl + '/auth/file/getImageApi/UserProfile/'

    fileAccess = this.BASE_URL +'/auth/file/getImageApi'
    getImageUrl(){
        return this.imageUrl;
    }

    getFileAccess(){
        return this.fileAccess;
    }
}
