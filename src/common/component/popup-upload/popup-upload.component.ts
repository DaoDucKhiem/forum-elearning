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

  description = "";
  isDescriptionError = false;

  currentParam: ParamDoc = new ParamDoc();

  sizeUpload = 0;

  constructor(private documentSV: DocumentService, private uploadSV: UploadService, private toastr: ToastrService) { }

  ngOnInit(): void {
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
            this.sizeUpload += element.size;
            this.files.push(file);
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
    if (!this.description) {
      this.isDescriptionError = true;
      return false;
    }

    return true;
  }

  prepareDataBeforeSave() {
    this.currentParam.Description = this.description;
    console.log(this.files);

  }

  saveDocument() {
    if (this.validateBeforeSave()) {
      this.prepareDataBeforeSave();
      // this.documentSV.save().subscribe(res => {
      //   console.log(res);
      // });
      this.closePopup();
    }
  }
}
