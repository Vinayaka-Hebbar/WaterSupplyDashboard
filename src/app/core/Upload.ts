export class Upload {
  name: string;
  url: string;
  file: File;
  progress: number;
  constructor(file: File) {
    this.file = file;
  }
}
