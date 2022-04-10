import { Component, OnDestroy, OnInit } from '@angular/core';
import { Account, Inventory } from 'src/app/shared/message-struct';
import { MatTableDataSource } from '@angular/material/table';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { PubsubService } from 'src/app/shared/pubsub.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit, OnDestroy {

  inventoryList: Array<Inventory> = new Array<Inventory>();
  accInfo!:Account;
  dataSource = new MatTableDataSource <Inventory>();
  findColumns: Array<string> = ["sku", "description", "qty", "shelf", "rowNo", "updatedAt", "updatedOn", "accountCode", "createdBy"];
  findInventoryForm!:FormGroup;
  result:any[] = [];

  subsink = new SubSink();
  
  constructor(private fb:FormBuilder, private rest:RestApiService, private pubsub: PubsubService) {
    this.findInventoryForm = this.fb.group({
      sku:'',
      accCode:''
    });

    this.subsink.sink = this.pubsub.onAccount.subscribe((rsp:Account) => {
      this.accInfo = new Account(rsp);
    });
   }

  ngOnInit(): void {
    if(this.accInfo.role == 'Customer') {
      this.findInventoryForm.get('accCode')?.setValue(this.accInfo.accountCode);
    } else {
      this.findInventoryForm.get('accCode')?.setValue('');
    }
  }

  ngOnDestroy() {
    this.subsink.unsubscribe();
  }

  onInventoryFind() {
    let sku = this.findInventoryForm.value.sku;
    let acc = this.findInventoryForm.value.accCode;
    this.dataSource.data.length = 0;

    if(!acc.length) {
      this.rest.getFromInventory(sku).subscribe((rsp:Inventory[]) => {
        this.inventoryList = rsp;

        /* For filling up the table */
        rsp.forEach(elm => {
          let ent = {sku: elm.sku,
            description: elm.description,
            qty: elm.qty,
            shelf: elm.shelf,
            rowNo: elm.rowNo,
            updatedAt: elm.updatedAt,
            updatedOn: elm.updatedOn,
            accountCode: elm.accountCode,
            createdBy: elm.createdBy
          };

          this.result.push(ent);
        })
        
      },
      (error: any) => {},
      () => {
        this.dataSource.data = this.result;
      });

    } else {
      this.rest.getFromInventory(sku, acc).subscribe((rsp:Inventory[]) => {
        this.inventoryList = rsp;

        /* For filling up the table */
        rsp.forEach(elm => {
          let ent = {sku: elm.sku,
            description: elm.description,
            qty: elm.qty,
            shelf: elm.shelf,
            rowNo: elm.rowNo,
            updatedAt: elm.updatedAt,
            updatedOn: elm.updatedOn,
            accountCode: elm.accountCode,
            createdBy: elm.createdBy
          };

          this.result.push(ent);
        })
        
      },
      (error: any) => {},
      () => {
        this.dataSource.data = this.result;
      });
    }
  }
}
