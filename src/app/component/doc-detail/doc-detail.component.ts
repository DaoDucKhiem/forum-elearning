import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamDoc } from 'src/app/share/model/param/param-doc';
import { DocumentService } from 'src/app/share/service/document.service';

@Component({
  selector: 'app-doc-detail',
  templateUrl: './doc-detail.component.html',
  styleUrls: ['./doc-detail.component.scss']
})
export class DocDetailComponent implements OnInit {

  public documents = [];
  public currentDocument: ParamDoc;
  public documentID: number;
  public showPopupUpload = false
  currentTab = 1; // 1 mô tả, 2 là chi tiết


  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.documentID = Number.parseInt(params['id']);
      this.documentService.getByID(this.documentID).subscribe((res) => {
        if (res && res.Success && res.Data) {
          this.currentDocument = res.Data;
        }
      });

      let param = {
        SearchKey: "",
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

  setTab(data) {
    this.currentTab = data;
  }

}
