import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import * as JsBarcode from "jsbarcode";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-create-manifest',
  templateUrl: './create-manifest.component.html',
  styleUrls: ['./create-manifest.component.scss']
})
export class CreateManifestComponent implements OnInit {

  A9LabelContentsBody:Array<object> = new Array<object>();

  createManifestForm!: FormGroup;
  constructor(private fb: FormBuilder ) { 
    this.createManifestForm = this.fb.group({
      sku: '',
      qty: 0
    })
  }

  onCreateManifest() {
    this.buildA9ContentsBody();
      pdfMake.createPdf(this.docDefinitionA9).download( "A9" + "-label");
  }

  /** Label A9 Generation  */
  Info = {
    title: 'A9 Label',
    author: 'Mohd Naushad Ahmed',
    subject: 'A9 Label for Shipment',
    keywords: 'A9 Label',
  };

  docDefinitionA9= {
    info: this.Info,
    //pageSize: 'A9',
    pageSize: {width: 58*2.835, height: 39 * 2.835},
    // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
    pageMargins: [1, 2, 1, 2],
    content: this.A9LabelContentsBody,
    
  };

 
  

  buildA9ContentsBody() {
    this.A9LabelContentsBody.length = 0;
    for(let idx = 0; idx < this.createManifestForm.value.qty; ++idx) {
    
      let ent = [
        {
          
          table: {
            headerRows: 0,
            //widths: ['80%', '90%'],
            
            body: [
              
              [{image: this.textToBase64Barcode(this.createManifestForm.value.sku, 80), alignment:'left'} ]
              
            ]
          },
          layout: 'noBorders',
          pageBreak: 'after'
          /*
          pageBreakAfter: (currentNode:any, followingNodesOnPage:any, nodesOnNextPage:any, previousNodesOnPage:any) => {
            return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
         }*/
        }
      ];

      this.A9LabelContentsBody.push(ent);
    }
  }

  textToBase64Barcode(text: string, ht:number, fSize: number = 10) {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, text, {format: "CODE128", height: ht, fontSize: fSize, textAlign:'left'});
    return canvas.toDataURL("image/png");
  }

  ngOnInit(): void {
  }

}
