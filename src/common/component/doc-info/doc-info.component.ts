import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParamDoc } from 'src/app/share/model/param/param-doc';

@Component({
  selector: 'app-doc-info',
  templateUrl: './doc-info.component.html',
  styleUrls: ['./doc-info.component.scss']
})
export class DocInfoComponent implements OnInit {

  @Input() document: ParamDoc;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showDetail() {
    this.router.navigate([`/${this.document.DocumentID}`]);
  }

}
