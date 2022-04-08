import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account, Inventory } from 'src/app/shared/message-struct';
import { RestApiService } from 'src/app/shared/rest-api.service';
import {formatDate} from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';
import { PubsubService } from 'src/app/shared/pubsub.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit, OnDestroy {

  accountList!: Array<Account>;
  inventoryList: Array<Inventory> = new Array<Inventory>();
  addInventoryForm!: FormGroup;
  inventoryColumns: Array<string> = ["sku", "description", "qty", "shelf", "rowNo", "updatedAt", "updatedOn", "accountCode", "createdBy", "delete"];

  accInfo!:Account;
  dataSource = new MatTableDataSource<Inventory>();

  subsink = new SubSink();
  constructor(private fb: FormBuilder, private rest: RestApiService, private pubsub:PubsubService) { 
    this.subsink.sink = this.pubsub.onAccount.subscribe((acct: Account) => {this.accInfo = acct;});

    this.addInventoryForm = this.fb.group({
      sku:'',
      description:'',
      qty:'',
      updatedAt:'',
      updatedOn:'',
      shelf:'',
      rowNo:'',
      createdBy: this.accInfo.name,
      accountCode:''
    });
  }


  onInventoryAdd(): void {
    let inv: Inventory = new Inventory();
    inv.sku = this.addInventoryForm.value.sku;
    inv.description = this.addInventoryForm.value.description;
    inv.qty = this.addInventoryForm.value.qty;
    inv.updatedAt = this.addInventoryForm.value.updatedAt;
    inv.updatedOn = formatDate(this.addInventoryForm.value.updatedOn, 'dd/MM/yyyy', 'en');
    inv.accountCode = this.addInventoryForm.value.accountCode;
    inv.shelf = this.addInventoryForm.value.shelf;
    inv.rowNo = this.addInventoryForm.value.rowNo;
    inv.createdBy = this.addInventoryForm.value.createdBy;
    this.rest.createInventory(inv).subscribe((rsp: any) => {

    }, 
    (error:any) => {},
    () => {alert("Item added to Inventory Successfully");});
      
  }

  onAddToTable(): void {
    let inv: Inventory = new Inventory();
    inv.sku = this.addInventoryForm.value.sku;
    inv.description = this.addInventoryForm.value.description;
    inv.qty = this.addInventoryForm.value.qty;
    inv.updatedAt = this.addInventoryForm.value.updatedAt;
    inv.updatedOn = formatDate(this.addInventoryForm.value.updatedOn, 'dd/MM/yyyy', 'en');
    inv.accountCode = this.addInventoryForm.value.accountCode;
    inv.shelf = this.addInventoryForm.value.shelf;
    inv.rowNo = this.addInventoryForm.value.rowNo;
    inv.createdBy = this.addInventoryForm.value.createdBy;

    this.inventoryList.push(inv);
    this.dataSource.data = this.inventoryList;
  }

  getInventoryList(): Array<Inventory> {
    return this.inventoryList;
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  onDeleteRow(_sku: string) {
    this.inventoryList.forEach((elm, index) => {
      if(elm.sku == _sku) {
        this.inventoryList.splice(index, 1);
        this.dataSource.data = this.inventoryList;
      }
    });
  }
}
