import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ParamDoc } from 'src/app/share/model/param/param-doc';
import { DataTransferService } from 'src/app/share/service/data-transfer.service';
import { DocumentService } from 'src/app/share/service/document.service';
import { UploadService } from 'src/app/share/service/upload.service';
import { UserService } from 'src/app/share/service/user.service';

declare var $: any;

@Component({
  selector: 'app-popup-upload',
  templateUrl: './popup-upload.component.html',
  styleUrls: ['./popup-upload.component.scss']
})
export class PopupUploadComponent implements OnInit {

  @Input() popupVisible = false;
  @Input() title: string;
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
  imageLoading = false;

  constructor(
    private documentSV: DocumentService,
    private uploadSV: UploadService,
    private toastr: ToastrService,
    private datatransferSV: DataTransferService,
    private userSV: UserService
  ) { }

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
        Name: "Tài liệu"
      },
      {
        ID: 4,
        Name: "Phương pháp"
      },
    ]

    this.getUser();
  }

  getUser() {
    const user = this.userSV.getUserInfor();
    if (user) {
      this.currentParam.UserID = user.UserID;
      this.currentParam.UserName = user.FullName;
    }
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
      if (size < 51200000) {
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

  /**
   * upload avatar cho tài liệu
   * @param event 
   * ddkhiem
   */
  uploadImageFeature(event) {
    this.imageLoading = true;
    const file: File = event[0];
    var formData = new FormData();
    formData.set('file', file);
    this.uploadSV.uploadFile(formData).subscribe(res => {
      if (res.filename) {
        this.currentParam.ImageFeature = res.filename;
      }
      setTimeout(() => {
        this.imageLoading = false;
      }, 200);
    });
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
    this.currentParam.ImageFeature = null;
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
      $(".document-name").find("input").focus();
      return false;
    }

    if (!this.description) {
      this.isDescriptionError = true;
      if (this.files.length === 0) {
        this.isFileError = true;
      }
      $("dx-text-area").find("textarea").focus();
      return false;
    }

    if (this.files.length === 0) {
      this.isFileError = true;
      return false;
    }

    return true;
  }

  caculationPointDoc() {
    if (this.currentParam.DocumentSize < 1) {
      this.currentParam.Point = 1;
    }
    else if (this.currentParam.DocumentSize < 4) {
      this.currentParam.Point = 2;
    }
    else if (this.currentParam.DocumentSize < 8) {
      this.currentParam.Point = 4;
    }
    else if (this.currentParam.DocumentSize < 15) {
      this.currentParam.Point = 8
    }
    else if (this.currentParam.DocumentSize < 30) {
      this.currentParam.Point = 16
    }
    else if (this.currentParam.DocumentSize < 50) {
      this.currentParam.Point = 31
    }
  }

  prepareDataBeforeSave() {
    this.currentParam.Description = this.description.trim();
    this.currentParam.DocumentName = this.currentParam.DocumentName.trim();
    this.currentParam.CreatedDate = new Date();
    this.caculationPointDoc();
  }

  saveDocument() {
    if (this.validateBeforeSave()) {
      this.prepareDataBeforeSave();
      this.documentSV.save(this.currentParam).subscribe(res => {
        if (res && res.Data) {
          this.toastr.success("Đăng tài liệu thành công!");
          this.datatransferSV.postDocumentSuccess(); // thong bao dang tai lieu thanh cong cho document
        }
      });

      this.closePopup();
    }
  }

  setCategory(e) {
    if (e) {
      this.currentParam.CategoryID = e.value;
      this.isCategoryError = false;
      $(".document-name").find("input").focus();
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

  clearImageFeature() {
    this.currentParam.ImageFeature = null;
  }

  onEnterTextBox(e) {
    if (e && e.event && e.event.keyCode === 13) {
      $("dx-text-area").find("textarea").focus();
    }
  }
}
