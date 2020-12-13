import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentData } from 'src/app/share/model/param/comment';
import { ParamDoc } from 'src/app/share/model/param/param-doc';
import { CommentService } from 'src/app/share/service/comment.service';
import { DocumentService } from 'src/app/share/service/document.service';
import { UserService } from 'src/app/share/service/user.service';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-doc-detail',
  templateUrl: './doc-detail.component.html',
  styleUrls: ['./doc-detail.component.scss']
})
export class DocDetailComponent implements OnInit {

  public documents = [];
  public currentDocument: ParamDoc;
  public documentID: number;
  public showPopup = false
  currentTab = 1; // 1 mô tả, 2 là chi tiết
  urlSafe: SafeResourceUrl;

  listComment: CommentData[] = []; // danh sách comment
  newComment: CommentData = new CommentData();

  @ViewChild("ValueComment", { static: false }) valueComment: ElementRef;

  showPopupNotify = false;

  currentUser: any;

  currentCategory: any;

  listCategory = [
    {
      ID: 1,
      Name: "Giáo trình",
      Icon: "../../../assets/icon/teach.png"
    },
    {
      ID: 2,
      Name: "Đề Thi",
      Icon: "../../../assets/icon/examinate.png"
    },
    {
      ID: 3,
      Name: "Tài liệu",
      Icon: "../../../assets/icon/document.png"
    },
    {
      ID: 4,
      Name: "Phương pháp",
      Icon: "../../../assets/icon/personal.svg"
    },
  ]


  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private userSV: UserService,
    private commentSV: CommentService,
    private toastr: ToastrService,
  ) {
    this.currentUser = this.userSV.getUserInfor();
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.documentID = Number.parseInt(params['id']);
      this.documentService.getDocumentById(this.documentID).subscribe((res) => {
        if (res && res.Success && res.Data) {
          this.currentDocument = res.Data;
          this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentDocument.DocumentLink);
          this.currentCategory = this.listCategory.filter(x => x.ID === this.currentDocument.CategoryID)[0];
          this.updateViewDoc();
        }
      });

      this.getComment();
    });
  }

  // lấy danh sách comment
  getComment() {
    this.commentSV.getCommentByDocId(this.documentID).subscribe(data => {
      if (data && data.Success) {
        this.listComment = data.Data;
      }
    });
  }

  // cập nhật lượt view cho tài liệu
  updateViewDoc() {
    this.documentService.updateViewDoc(this.currentDocument).subscribe(res => {
      if (res && !res.Success) {
        this.currentDocument.ViewCount ++;
      }
    })
  }

  //
  showPopupDownload() {
    this.showPopup = true;
  }

  // tắt popup thông báo cần số điểm của tài liệu để tải
  closePopup() {
    this.showPopup = false;
  }

  // ẩn thông báo số điểm không đủ để tải tài liệu
  closePopupNotify() {
    this.showPopupNotify = false;
    this.closePopup();
  }

  // set tab hiển thị. mặc định là mô tả và list comment
  setTab(data) {
    this.currentTab = data;
  }

  // kiểm tra điều kiện trước khi tải tài liệu
  checkBeforeDownload(): boolean {
    if (this.currentUser.Point < this.currentDocument.Point) {
      this.showPopupNotify = true;
      return false;
    }
    return true;
  }

  // tải tài liệu
  dowloadDoc() {
    if (this.checkBeforeDownload())
      var param = {
        Poster: this.currentDocument.UserID,
        Downloader: this.currentUser.UserID,
        Point: this.currentDocument.Point,
        DocumentID: this.currentDocument.DocumentID
      }

    // cập nhật điểm
    this.userSV.updatePoint(param).subscribe(res => {
      if (res && res.Success && res.Data) {
        FileSaver.saveAs(this.currentDocument.DocumentLink, this.currentDocument.DocumentName);
        this.currentUser.Point -= this.currentDocument.Point;
        this.userSV.updatePointLocal(this.currentUser); // cập nhật lại thông tin tại client
      }
      else {
        this.toastr.error("Có lỗi trong quá trình xử lý");
      }
      this.showPopup = false;
    });
  }

  checkCommentBeforeSave(): boolean {
    const content = this.valueComment.nativeElement.value;
    if (content.trim() === '') {
      return false;
    }
    else {
      this.newComment.Content = content.trim();
    }
    return true;
  }

  prepareCommentDataBeforeSave() {
    this.newComment.DocumentID = this.currentDocument.DocumentID;
    this.newComment.UserID = this.currentUser.UserID;
    this.newComment.UserName = this.currentUser.FullName;
    this.newComment.CreatedDate = new Date();
  }

  saveComment() {
    if (this.checkCommentBeforeSave()) {
      this.prepareCommentDataBeforeSave();

      this.commentSV.save(this.newComment).subscribe(res => {
        if (res && res.Success && res.Data) {
          this.getComment();
          this.newComment = new CommentData();
        }
        else {
          this.toastr.error("Có lỗi trong quá trình xử lý");
        }
      });
    }
  }

  deleteComment(comment) {
    this.commentSV.deleteComment(comment.CommentID).subscribe(res => {
      if (res && res.Success) {
        this.getComment();
      }
      else {
        this.toastr.error("Có lỗi trong quá trình xử lý");
      }
    });
  }
}
