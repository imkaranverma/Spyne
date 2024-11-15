export module FileUploadInerface {
  export interface FileUploadRequestInerface {
    file: File;
    showUploadProgress?: boolean;
  }
  export interface FileUploadResponseInerface {
    url: string;
    reference_key: string;
  }
}
