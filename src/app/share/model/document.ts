export class Doc {
    documentID: number;
    documentName: string;
    documentSize: number;
    categoryID: number;
    documentLink: string;
    documentType: string;
    point: number;
    viewCount: number;
    downloadCount?: number;
    userID?: string;
    description?: string;
    reportCount?: number;
    posterName?: string;

    constructor() {
    }
}