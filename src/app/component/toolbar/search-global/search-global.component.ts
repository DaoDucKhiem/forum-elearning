import { Component, Input, OnInit } from '@angular/core';
import { ParamDoc } from 'src/app/share/model/param/param-doc';
import { DocumentService } from 'src/app/share/service/document.service';

@Component({
  selector: 'app-search-global',
  templateUrl: './search-global.component.html',
  styleUrls: ['./search-global.component.scss']
})
export class SearchGlobalComponent implements OnInit {

  keySearch: string;
  @Input() set searchKey(data) {
    this.keySearch = data;
    if (this.keySearch && this.keySearch.trim() !== "") {
      this.changeValue();
    }
  }

  listSearchDocument: ParamDoc[] = [];

  constructor(private documentService: DocumentService,) { }

  ngOnInit(): void {
  }

  /**
   * dữ liệu key search thay đổi sẽ tìm kiếm lại từ đầu
   * ddkhiem
   */
  changeValue() {
    let param = {
      SearchKey: this.keySearch,
      PageSize: 10,
      PageIndex: 0
    }
    this.documentService.getDocPaging(param).subscribe((res) => {
      if (res?.Success) {
        this.listSearchDocument = res.Data;
      }
    })
  }

}
