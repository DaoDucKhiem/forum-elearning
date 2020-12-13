export class CommentData {
    /// <summary>
    /// id comment
    /// </summary>
    CommentID: number;
    /// <summary>
    /// id người comment
    /// </summary>
    UserID: string;
    /// <summary>
    /// tên người comment
    /// </summary>
    UserName: string;
    /// <summary>
    /// nội dung comment
    /// </summary>
    Content: string;
    /// <summary>
    /// id tài liệu
    /// </summary>
    DocumentID: number;
    /// <summary>
    /// Ngày tạo
    /// </summary>
    CreatedDate: Date;
    /// <summary>
    /// số report đã được báo cáo
    /// </summary>
    ReportCount: number;

    constructor() {
        this.Content = "";
    }
}