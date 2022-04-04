import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

import { ShipmentListDataSource, ShipmentListItem } from './shipment-list-datasource';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Shipment, ShipmentList } from 'src/app/shared/message-struct';

import * as JsBarcode from "jsbarcode";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.scss']
})
export class ShipmentListComponent implements AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ShipmentListItem>;
  /*
  dataSource: ShipmentListDataSource;
  */
  dataSource = new MatTableDataSource<ShipmentListItem>();

  shipmentListForm!: FormGroup;
  awbList!: ShipmentList;
  private mIsBtnDisabled: boolean;
  dataValue:any[] = [];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'serialNo', 'shipmentNo', 'altRefNo', 'senderRefNo', 'createdBy', 
                      'createdOn', 'service', 'receipent', 'location', 'country'];

  constructor(private fb:FormBuilder, private rest: RestApiService) {
    this.mIsBtnDisabled = false;
    //this.dataSource = new ShipmentListDataSource();

    this.shipmentListForm = this.fb.group({
      startDate: formatDate(new Date(Date.now()), 'yyyy-MM-dd', 'en'),
      endDate: formatDate(new Date(Date.now()), 'yyyy-MM-dd', 'en')
    });
  }

  ngOnInit() {
    this.dataSource.data.length = 0;
    this.dataValue.length = 0;
    this.onGetShipmentList();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  selection = new SelectionModel<ShipmentListItem>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  public onGetShipmentList(): void {
   
    //this.isBtnDisabled = true; 
    let fromDate = formatDate(this.shipmentListForm.value.startDate, 'dd/MM/yyyy', 'en');
    let toDate = formatDate(this.shipmentListForm.value.endDate, 'dd/MM/yyyy', 'en');
    
    this.rest.getShipments(fromDate, toDate).subscribe(
      (sh: Shipment[]) => { 
	      this.awbList = new ShipmentList(sh, sh.length);
	      let cnt: number = 1;
        this.awbList.m_shipmentArray.forEach((element: Shipment) => {
            let item:ShipmentListItem = { 'serialNo': cnt, 
                	                        'shipmentNo': element.shipmentNo,
                        	                'altRefNo': element.altRefNo,
                                          'senderRefNo': element.referenceNo,
                                          'createdBy':element.createdBy,
                                          'createdOn': element.createdOn,
                                          'service': element.service,
                                          'receipent': element.receiverName,
                                          'location': element.receiverCity,
                                          'country': element.receiverCountry
                                        };
       	    //this.dataSource.data.push(item);
             this.dataValue.push(item);
       	    cnt += 1;
        });
      },

      /** onError */
      (error:any) => {this.dataSource.data.length = 0; this.isBtnDisabled = false;console.log("Error " + error);},

      /** onComplete */
      () => {
        
	      this.isBtnDisabled = false;
	      //this.dataSource.connect();
        this.shipmentListForm.value.startDate = "";
        this.shipmentListForm.value.endDate = "";
        this.dataSource.data = this.dataValue;
      }
    );
  }

  get isBtnDisabled(): boolean {
    return(this.mIsBtnDisabled);
  }

  set isBtnDisabled(st: boolean) {
    this.mIsBtnDisabled = st;
  }

  /** Label A6 Generation  */
  Info = {
    title: 'A6 Label',
    author: 'Mohd Naushad Ahmed',
    subject: 'A6 Label for Shipment',
    keywords: 'A6 Label',
  };

  A6LabelContentsBody:Array<object> = new Array<object>();

  buildA6ContentsBody() {
    this.A6LabelContentsBody.length = 0;
    this.awbList.m_shipmentArray.forEach((elm:Shipment) => { 
      let ent = [
        {
          table: {
            headerRows: 0,
            widths: [ 100, '*'],
            heights: ['auto', 'auto', 'auto', 20, 'auto'],
            body: [
              
              [ {text: 'Date: ' + elm.activity[0].date + ' '+ elm.activity[0].time, fontSize:10}, {text: 'Destination: ' + elm.receiverCity +'\n' + 'Product Type: ' + elm.service, bold: true}],
              [ {text: 'Account Number: '+ elm.accountCode, fontSize:10}, {image: this.textToBase64Barcode(elm.shipmentNo, 70), bold: false, alignment: 'center',rowSpan:2, width: 170}],
              [ { text: 'No. of Items: ' + elm.noOfItems + '\n' + 'Weight: '+ elm.weight + elm.weightUnit + '\n' + 'Goods Value: '+ elm.customValue, bold: false, fontSize: 10 }, ''],
              [ { text: 'From:\n' + elm.name +'\n'+ 'Mobile: '+ elm.contact + '\n' + 'Altername Mobile: '+ elm.phone + '\n' + 'Country: '+ elm.country, bold: false, fontSize:10 }, {text: 'To:\n'+ elm.receiverName + '\n'+ 'Address: '+elm.receiverAddress+'\n'+'City: '+ elm.receiverCity+ '\n'+'Mobile: '+elm.receiverPhone +'\n' + 'Alternate Mobile: '+elm.receiverContact +'\n'+'Country:'+elm.receiverCountry, fontSize: 10}],
              [ {text: 'Description: ' + elm.description, fontSize:10}, {image: this.textToBase64Barcode(elm.altRefNo, 70), bold:false, alignment:'center',rowSpan:2, width:170} ],
              [ {text: 'COD: '+ elm.currency + ' ' + elm.codAmount, bold: true}, ''],
            ]
          },
          pageBreak: 'after'
          /*
          pageBreakAfter: (currentNode:any, followingNodesOnPage:any, nodesOnNextPage:any, previousNodesOnPage:any) => {
            return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
         }*/
        }
      ];

      this.A6LabelContentsBody.push(ent);
    });
  }

  A4LabelContentsBody:Array<object> = new Array<object>();

  buildA4ContentsBody() {
    this.A4LabelContentsBody.length = 0;
    this.awbList.m_shipmentArray.forEach((elm: Shipment) => { 
      let ent = [
        {
          table: {
            headerRows: 0,
            widths: [ 200, '*'],
            body: [
              
              [ {text: 'Date:' + elm.activity[0].date + ' '+ elm.activity[0].time}, {text: 'Destination:' + elm.receiverCity +'\n' + 'Product Type:' + elm.service, bold: true}],
              [ {text: 'Account Number:'+ elm.accountCode}, {image: this.textToBase64Barcode(elm.shipmentNo, 70), bold: false, alignment: 'center',rowSpan:2, width: 170}],
              [ { text: 'No. of Items: ' + elm.noOfItems + '\n' + 'Weight: '+ elm.weight + elm.weightUnit + '\n' + 'Goods Value: '+ elm.customValue, bold: false }, ''],
              [ { text: 'From:\n' + elm.name +'\n'+ 'Mobile: '+ elm.contact + '\n' + 'Alternate Mobile: '+ elm.phone + '\n' + 'Country: '+ elm.country, bold: false }, {text: 'To:\n'+ elm.receiverName + '\n'+ 'Address: '+elm.receiverAddress+'\n'+'City: '+ elm.receiverCity+ '\n'+'Mobile: '+elm.receiverPhone +'\n' + 'Altername Mobile: '+elm.receiverContact+'\n'+'Country: '+elm.receiverCountry}],
              [ {text: 'Description:' + elm.description}, {image: this.textToBase64Barcode(elm.altRefNo , 70), bold:false, alignment:'center',rowSpan:2, width:170} ],
              [ {text: 'COD: '+ elm.currency +' '+elm.codAmount, bold: true}, ''],
            ]
          },
          pageBreak: 'after'
        }
      ];

      this.A4LabelContentsBody.push(ent);
    });
  }

  docDefinitionA6 = {
    info: this.Info,
    pageSize: "A6",
    pageMargins: 5,
    content: this.A6LabelContentsBody,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      },
      defaultStyle: {
        fontSize: 8,
      }
    }
  };

  docDefinitionA4 = {
    info: this.Info,
    pageMargins: 10,
    content: this.A4LabelContentsBody,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      },
      rH: {
        height: 100,
        fontSize: 10
      }
    }
  };

  textToBase64Barcode(text: string, ht:number, fSize: number = 15) {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, text, {format: "CODE128", height: ht, fontOptions: 'bold', fontSize: fSize});
    return canvas.toDataURL("image/png");
  }

  generatePdf(pgType: string) {
    if('A6' == pgType) {
      this.buildA6ContentsBody();
      pdfMake.createPdf(this.docDefinitionA6).download( pgType + "-label");
    } else {
      this.buildA4ContentsBody();
      pdfMake.createPdf(this.docDefinitionA4).download( pgType + "-label");
    }
  }
}
