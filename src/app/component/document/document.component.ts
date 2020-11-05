import { Component, OnInit } from '@angular/core';
import { Doc } from 'src/app/share/model/document';
import { DocumentService } from 'src/common/service/documentService/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  documents: Doc[] = [];

  constructor(
    private documentService: DocumentService,
    ) { }

  ngOnInit(): void {
    this.documentService.getDocuments().subscribe(data => this.documents = data);
  }

}
