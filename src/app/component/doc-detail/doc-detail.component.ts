import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentData } from 'src/app/share/model/param/comment';
import { ParamDoc } from 'src/app/share/model/param/param-doc';
import { Report } from 'src/app/share/model/param/report';
import { CommentService } from 'src/app/share/service/comment.service';
import { DataTransferService } from 'src/app/share/service/data-transfer.service';
import { DocumentService } from 'src/app/share/service/document.service';
import { ReportService } from 'src/app/share/service/report.service';
import { UserService } from 'src/app/share/service/user.service';

declare var require: any
const FileSaver = require('file-saver');

declare var $: any;

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

  showPopupDelete = false;

  showPopupReport = false;

  reasonReport = '';

  newReport = new Report();

  isReportError = false;

  listComment: CommentData[] = []; // danh sách comment
  newComment: CommentData = new CommentData();

  isAdmin: any;

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
    private router: Router,
    private reportSV: ReportService,
    private transferSV: DataTransferService
  ) {
    this.currentUser = this.userSV.getUserInfor();
    if (this.currentUser?.Role) {
      this.isAdmin = this.currentUser.Role; // gán quyền có là admin hay không
    }
    else {
      this.isAdmin = 0;
    }
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

      this.transferSV.updateDoc.subscribe(res => {
        if (res) {
          this.documentService.getDocumentById(this.documentID).subscribe((res) => {
            if (res && res.Success && res.Data) {
              this.currentDocument = res.Data;
              this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentDocument.DocumentLink);
              this.currentCategory = this.listCategory.filter(x => x.ID === this.currentDocument.CategoryID)[0];
            }
          });
        }
      })
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
        this.currentDocument.ViewCount++;
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
        this.currentDocument.DownloadCount++;
        this.userSV.updatePointLocal(this.currentUser); // cập nhật lại thông tin tại client
      }
      else {
        this.toastr.error("Có lỗi trong quá trình xử lý");
      }
      this.showPopup = false;
    });
  }

  // hiện profile
  showProfile(userID) {
    this.router.navigate([`user`], { queryParams: { id: userID } });
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

  // xóa tài liệu
  deleteDoc() {
    this.documentService.deleteByID(this.currentDocument.DocumentID).subscribe(res => {
      if (res && res.Success) {
        this.closePopupDelete();
        this.toastr.success("Đã xóa thành công!");
        this.router.navigate([""]);
      }
      else {
        this.closePopupDelete();
        this.toastr.error("Đã xóa thất bại!");
      }
    });
  }

  // hiện popup delete
  showPopupDeleteDoc() {
    this.showPopupDelete = true;
  }

  // đóng popup xóa tài liệu
  closePopupDelete() {
    this.showPopupDelete = false;
  }

  // hiển thị popup report
  showPopupReportData() {
    this.showPopupReport = true;
    this.newReport.ReportType = 1; // loại báo cáo
    setTimeout(() => {
      $("dx-text-area").find("textarea").focus();
    }, 500);
  }

  showPopupReportComment(comment) {
    this.showPopupReport = true;
    this.newReport.ReportType = 2; // loại báo cáo bình luận
    this.newReport.CommentID = comment.CommentID;
    this.newReport.UserComment = comment.UserName;
    setTimeout(() => {
      $("dx-text-area").find("textarea").focus();
    }, 500);
  }

  closePopupReport() {
    this.showPopupReport = false;
  }

  validateReason(e) {
    if (e) {
      if (e.value && e.value.trim() != '') {
        this.isReportError = false;
        $("dx-text-area").find("textarea").focus();
      }
      else {
        this.isReportError = true;
      }
    }

    this.reasonReport = e.value;
  }

  validateValueReasonBeforeSave(): boolean {
    if (this.reasonReport.trim() == '') {
      this.isReportError = true;
      return false;
    }

    return true;
  }

  // chuẩn bị dữ liệu trước khi report
  prepareReasonBeforeSend() {
    this.newReport.UserID = this.currentUser.UserID;
    this.newReport.UserName = this.currentUser.FullName;
    this.newReport.DocumentID = this.currentDocument.DocumentID;
    this.newReport.CreatedDate = new Date();
    this.newReport.DocumentName = this.currentDocument.DocumentName;
    this.newReport.ReportContent = this.reasonReport.trim();
    this.newReport.Status = 0;
  }

  // report
  Report() {
    if (this.validateValueReasonBeforeSave()) {
      this.prepareReasonBeforeSend();
      this.reportSV.save(this.newReport).subscribe(res => {
        if (res && res.Success) {
          this.toastr.success("Báo cáo thành công!");
        }
        else {
          this.toastr.error("Có lỗi trong khi xử lý");
        }

        this.newReport = new Report();
        this.reasonReport = '';

        this.showPopupReport = false;
      });
    }
  }

  senDataToUpdate() {
    this.transferSV.transferDocument(this.currentDocument);
  }
}
