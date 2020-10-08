import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/common/documentService/document.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doc-detail',
  templateUrl: './doc-detail.component.html',
  styleUrls: ['./doc-detail.component.scss']
})
export class DocDetailComponent implements OnInit {

  public documents = [];
  public document = {};
  public documentID: Number;


  constructor(
    private documentService: DocumentService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.documentID = Number.parseInt(params['id']);
    })
    this.documentService.getDocuments().subscribe(data => this.documents = data);
    this.documents.forEach((data)=>{
      if(data.id == this.documentID){
        this.document = data;
      }
    })
  }

}
