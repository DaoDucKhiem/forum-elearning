export class ParamDoc {
    DocumentID: number; // id tài liệu
    DocumentName: string; // tên tài liệu
    DocumentSize: any; // dung lượng
    DocumentType: string; // đuôi file
    DocumentLink: string; // file path
    Point: number; // điểm
    ViewCount: number; //số lượt xem
    DownloadCount: number; // số lượt tải
    CategoryID: number; // chuyên mục
    Description: string; // mô tả
    UserID: string; // id tác giả
    ReportCount: number; // số lần bị report

    constructor() {
        this.DownloadCount = 0;
        this.ReportCount = 0;
        this.ViewCount = 0;
        this.UserID = '';
        this.Point = 1;
    }
}