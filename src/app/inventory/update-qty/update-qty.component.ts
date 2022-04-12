import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-qty',
  templateUrl: './update-qty.component.html',
  styleUrls: ['./update-qty.component.scss']
})
export class UpdateQtyComponent implements OnInit {

  updateQtyForm!:FormGroup;
  constructor(private fb: FormBuilder) { 
    this.updateQtyForm = this.fb.group({
      sku:'',
      qty:'',
      accCode:''
    });
  }

  ngOnInit(): void {
  }

  onInventoryUpdate() {

  }

}
