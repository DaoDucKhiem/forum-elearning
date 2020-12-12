export class ParamDoc {
    DocumentID: number; // id tài liệu
    DocumentName: string; // tên tài liệu
    DocumentSize: any; // dung lượng
    DocumentType: string; // đuôi file
    DocumentLink: string; // file path
    ImageFeature: string; // link ảnh đại diện cho tài liệu
    Point: number; // điểm
    ViewCount: number; //số lượt xem
    DownloadCount: number; // số lượt tải
    CategoryID: number; // chuyên mục
    Description: string; // mô tả
    UserID: string; // id tác giả
    CreatedDate: Date; // ngày đăng
    UserName: string;
    ReportCount: number; // số lần bị report

    constructor() {
        this.DownloadCount = 0;
        this.ReportCount = 0;
        this.ViewCount = 0;
        this.UserID = '';
        this.Point = 1;
    }
}