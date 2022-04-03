import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Inventory } from 'src/app/shared/message-struct';
import { PubsubService } from 'src/app/shared/pubsub.service';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-out-inventory',
  templateUrl: './out-inventory.component.html',
  styleUrls: ['./out-inventory.component.scss']
})
export class OutInventoryComponent implements OnInit {

  inventoryColumns: Array<string> = ["sku", "qty"];
  outInventoryForm!: FormGroup;
  inventoryList: Array<Inventory> = new Array<Inventory>();
  dataSource = new MatTableDataSource<Inventory>();

  constructor(private fb: FormBuilder, private rest: RestApiService, private pubsub: PubsubService) { 
    this.outInventoryForm = this.fb.group({
      sku:'',
      qty:0
    });

  }

  onInventoryOut() {
  
  }

  onAddToTable() {
    let inv: Inventory = new Inventory();
    inv.sku = this.outInventoryForm.value.sku;
    inv.qty = this.outInventoryForm.value.qty;
    
    this.inventoryList.push(inv);
    this.dataSource.data = this.inventoryList;
  }

  ngOnInit(): void {
  }

}
