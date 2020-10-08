import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/common/documentService/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  public documents = [];

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documentService.getDocuments().subscribe(data => this.documents = data);
  }

}
