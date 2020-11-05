export class Doc {
    DocumentID?: number;
    DocumentName?: string;
    DocumentSize?: number;
    CategoryID?: number;
    DocumentLink?: string;
    DocumentType?: string;
    Point?: number;
    ViewCount?: number;
    DownloadCount?: number;
    UserID?: string;
    AuthorName?: string;
    Price?: number;
    Description?: string;
    ReportCount?: number;

    constructor() {
        this.AuthorName = "Nhóm ABC"
    }
}