import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

import { ShipmentListDataSource, ShipmentListItem } from './shipment-list-datasource';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { Shipment, ShipmentList } from 'src/app/shared/message-struct';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.scss']
})
export class ShipmentListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ShipmentListItem>;
  dataSource: ShipmentListDataSource;

  shipmentListForm!: FormGroup;
  awbList!: ShipmentList;
  private mIsBtnDisabled: boolean;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'serialNo', 'shipmentNo', 'altRefNo', 'senderRefNo', 'createdBy', 
                      'createdOn', 'service', 'receipent', 'location', 'country'];

  constructor(private fb:FormBuilder, private rest: RestApiService) {
    this.mIsBtnDisabled = false;
    this.dataSource = new ShipmentListDataSource();

    this.shipmentListForm = this.fb.group({
      startDate: formatDate(new Date(Date.now()), 'yyyy-MM-dd', 'en'),
      endDate: formatDate(new Date(Date.now()), 'yyyy-MM-dd', 'en')
    });
  }

  ngOnInit() {
    this.dataSource.data.length = 0;
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
       	    this.dataSource.data.push(item);
       	    cnt += 1;
        });
      },

      /** onError */
      (error:any) => {this.dataSource.data.length = 0; this.isBtnDisabled = false;console.log("Error " + error);},

      /** onComplete */
      () => {
        console.log("Error ");
	      this.isBtnDisabled = false;
	      //this.dataSource.connect();
        this.shipmentListForm.value.startDate = "";
        this.shipmentListForm.value.endDate = "";
      }
    );
  }

  get isBtnDisabled(): boolean {
    return(this.mIsBtnDisabled);
  }

  set isBtnDisabled(st: boolean) {
    this.mIsBtnDisabled = st;
  }
}
