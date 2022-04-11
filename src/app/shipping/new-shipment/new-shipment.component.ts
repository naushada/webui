import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { MatAccordion }  from '@angular/material/expansion';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-new-shipment',
  templateUrl: './new-shipment.component.html',
  styleUrls: ['./new-shipment.component.scss']
})
export class NewShipmentComponent implements OnInit {

  newShipmentForm!: FormGroup;
  constructor(private fb: FormBuilder, private rest:RestApiService) { 
    this.newShipmentForm = this.fb.group({
      activity : this.fb.array([{date: formatDate(new Date(), 'dd/MM/yyyy', 'en'),
        event: 'Document Created',
        time:new Date().getHours() + ':' + new Date().getMinutes(), 
        notes: 'Document Created',
        driver:'',
        updatedBy:'',
        eventLocation: 'Riyadh'
      }]),
      shipmentNo: '',
      autogenerate: false,
      altRefNo:'',
      
      //Sender Information
      referenceNo:'',
      accountCode:'',
      companyName:'',
      name:'',
      country:'',
      address:'',
      city:'',
      state:'',
      postalCode:'',
      contact:'',
      phone:'',
      email:'',
      recvCountryTadId:'',
      //Shipment Information
      sku:'',
      service:'',
      noOfItems:'',
      description:'',
      goodsValue:'',
      customValue:'',
      weight:'',
      weightUnit:'',
      cubicWeight:'',
      codAmount:'',
      vat:'',
      currency:'',
      //Receiver Information
      receiverName:'',
      receiverCountry:'',
      receiverAddress:'',
      receiverCity:'',
      receiverState:'',
      receiverPostalCode:'',
      receiverContact:'',
      receiverPhone:'',
      receiverEmail:''

    });
  }

  ngOnInit(): void {
  }

  onCreateAwb() {

  }

  onCheckboxSelect() {
    
  }
}
