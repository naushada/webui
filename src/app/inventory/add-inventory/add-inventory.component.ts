import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account, Inventory } from 'src/app/shared/message-struct';
import { RestApiService } from 'src/app/shared/rest-api.service';
import {formatDate} from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {

  accountList!: Array<Account>;
  inventoryList: Array<Inventory> = new Array<Inventory>();
  addInventoryForm!: FormGroup;
  inventoryColumns: Array<string> = ["sku", "description", "qty","updatedAt", "updatedOn", "accountCode"];

  dataSource = new MatTableDataSource<Inventory>();

  constructor(private fb: FormBuilder, private rest: RestApiService) { 
    this.addInventoryForm = this.fb.group({
      sku:'',
      description:'',
      qty:'',
      updatedAt:'',
      updatedOn:'',
      accountCode:''
    });
  }


  onInventoryAdd(): void {
    
      
  }

  onAddToTable(): void {
    let inv: Inventory = new Inventory();
    inv.sku = this.addInventoryForm.value.sku;
    inv.description = this.addInventoryForm.value.description;
    inv.qty = this.addInventoryForm.value.qty;
    inv.updatedAt = this.addInventoryForm.value.updatedAt;
    inv.updatedOn = formatDate(this.addInventoryForm.value.updatedOn, 'dd/MM/yyyy', 'en');
    inv.accountCode = this.addInventoryForm.value.accountCode;

    this.inventoryList.push(inv);
    this.dataSource.data = this.inventoryList;
  }

  getInventoryList(): Array<Inventory> {
    return this.inventoryList;
  }
  ngOnInit(): void {
  }

}
