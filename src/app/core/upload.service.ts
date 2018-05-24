import {Injectable} from '@angular/core';
import {AngularFireStorage} from 'angularfire2/storage';
import {Upload} from './Upload';

@Injectable()
export class UploadService {

  private basePath = '/uploads';

  constructor(private fs: AngularFireStorage) {
  }

  public uploadFile(upload: Upload) {
    const storageRef = this.fs.storage.ref();
    return storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
  }

}
