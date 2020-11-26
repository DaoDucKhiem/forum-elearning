import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from 'src/app/share/service/document.service';

@Component({
  selector: 'app-doc-detail',
  templateUrl: './doc-detail.component.html',
  styleUrls: ['./doc-detail.component.scss']
})
export class DocDetailComponent implements OnInit {

  public documents = [];
  public document: any;
  public documentID: number;
  public showPopupUpload = false


  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.documentID = Number.parseInt(params['id']);
      this.documentService.getByID(this.documentID).subscribe((res)=>{

      })
      let param = {
        SearchKey: "",
        CategoryID: null,
        PageSize: 5,
        PageIndex: 1
      }
      this.documentService.getDocPaging(param).subscribe((res) => {
        if (res?.Success) {
          this.documents = res.Data;
        }
      })
    })

  }

  showUpload() {
    this.showPopupUpload = true;
  }

}
