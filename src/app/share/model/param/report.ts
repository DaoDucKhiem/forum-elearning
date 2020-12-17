export class Report {
     /// <summary>
        /// id báo cáo
        /// </summary>
        ReportID: number;
        /// <summary>
        /// id người báo cáo
        /// </summary>
        UserID: string;
        /// <summary>
        /// tên người tạo
        /// </summary>
        UserName: string;
        /// <summary>
        /// nội dung báo cáo
        /// </summary>
        ReportContent: string;
        /// <summary>
        /// loại báo cáo
        /// </summary>
        ReportType: number;
        /// <summary>
        /// Tên tài liệu
        /// </summary>
        DocumentName: string;
        /// <summary>
        /// id tài liệu bị báo cáo
        /// </summary>
        DocumentID: number;
        /// <summary>
        /// id comment bị báo cáo
        /// </summary>
        CommentID: number;
        /// <summary>
        /// tên người comment vi phạm
        /// </summary>
        UserComment: string;
        /// <summary>
        /// Ngày tạo
        /// </summary>
        CreatedDate: Date;
        /// <summary>
        /// Ngày tạo
        /// </summary>
        Status: number;
}