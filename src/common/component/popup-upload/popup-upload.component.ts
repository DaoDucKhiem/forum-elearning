import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ParamDoc } from 'src/app/share/model/param/param-doc';
import { DocumentService } from 'src/app/share/service/document.service';
import { UploadService } from 'src/app/share/service/upload.service';

@Component({
  selector: 'app-popup-upload',
  templateUrl: './popup-upload.component.html',
  styleUrls: ['./popup-upload.component.scss']
})
export class PopupUploadComponent implements OnInit {

  @Input() popupVisible = false;
  @Output() hiddenPopup = new EventEmitter<boolean>();

  files: any = [];

  listCategory = [];

  description = "";
  isDescriptionError = false;

  isDocumentNameError = false;

  currentParam: ParamDoc = new ParamDoc();

  sizeUpload = 0;
  isFileError = false;
  isCategoryError: boolean;

  constructor(private documentSV: DocumentService, private uploadSV: UploadService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listCategory = [
      {
        ID: 1,
        Name: "Giáo trình"
      },
      {
        ID: 2,
        Name: "Đề Thi"
      },
      {
        ID: 3,
        Name: "Phương pháp học tập"
      },
      {
        ID: 4,
        Name: "Tài liệu tham khảo"
      },
    ]
  }

  closePopup() {
    this.hiddenPopup.emit(true);
  }

  /* 
  * upload file lên server stringee
  * ddkhiem
  */
  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      var formData = new FormData();
      formData.set('file', element);

      const size = this.sizeUpload + element.size;
      // nếu tổng số dung lượng các file tải lên nhỏ hơn 5MB thì cho tải lên. ngược lại show toast báo không cho tải lên nữa
      if (size < 5120000) {
        this.uploadSV.uploadFile(formData).subscribe(res => {
          if (res.filename) {
            var file = {
              name: element.name,
              url: res.filename,
              size: element.size
            }
            this.currentParam.DocumentType = file.name.split(".").pop();
            this.sizeUpload += element.size;
            this.currentParam.DocumentLink = res.filename;
            this.currentParam.DocumentSize = (((file.size) / 1024) / 1024).toFixed(5);
            ;
            this.files.push(file);
            this.isFileError = false;
          }
        });
      }
      else {
        this.toastr.error("Đã vượt quá hạn mức quy định");
      }
    }
  }

  deleteAttachment(index) {
    this.files.splice(index, 1)
  }

  validateDescription(e) {
    if (e) {
      if (e.value && e.value.trim() != '') {
        this.isDescriptionError = false;
      }
      else {
        this.isDescriptionError = true;
      }
    }

    this.description = e.value;
  }

  /**
   * ddkhiem
   */
  validateBeforeSave(): boolean {
    if (!this.currentParam.CategoryID) {
      this.isCategoryError = true;
      if (!this.currentParam.DocumentName || this.currentParam.DocumentName.trim() === '') {
        this.isDocumentNameError = true;
      }
      if (!this.description) {
        this.isDescriptionError = true;
      }

      if (this.files.length === 0) {
        this.isFileError = true;
      }
      return false;
    }

    if (!this.currentParam.DocumentName || this.currentParam.DocumentName.trim() === '') {
      this.isDocumentNameError = true;
      if (!this.description) {
        this.isDescriptionError = true;
      }

      if (this.files.length === 0) {
        this.isFileError = true;
      }
      return false;
    }

    if (!this.description) {
      this.isDescriptionError = true;
      if (this.files.length === 0) {
        this.isFileError = true;
      }
      return false;
    }

    if (this.files.length === 0) {
      this.isFileError = true;
      return false;
    }

    return true;
  }

  prepareDataBeforeSave() {
    this.currentParam.Description = this.description.trim();
    this.currentParam.DocumentName = this.currentParam.DocumentName.trim();
    this.currentParam.UserID="64a59a25-2488-54b0-f6b4-c8af08a50cbf"; // fix cứng
  }

  saveDocument() {
    if (this.validateBeforeSave()) {
      this.prepareDataBeforeSave();
      this.documentSV.save(this.currentParam).subscribe(res => {
        if (res && res.Data) {
          this.toastr.success("Đăng tài liệu thành công!");
        }
      });

      this.closePopup();
    }
  }

  setCategory(e) {
    if (e) {
      this.currentParam.CategoryID = e.value;
      this.isCategoryError = false;
    }
  }

  setDocumentName(e) {
    if (e) {
      this.currentParam.DocumentName = e.value;
      if (this.currentParam.DocumentName && this.currentParam.DocumentName.trim() !== '') {
        this.isDocumentNameError = false;
      }
    }
  }
}
