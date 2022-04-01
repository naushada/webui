import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { MatAccordion }  from '@angular/material/expansion';

@Component({
  selector: 'app-new-shipment',
  templateUrl: './new-shipment.component.html',
  styleUrls: ['./new-shipment.component.scss']
})
export class NewShipmentComponent implements OnInit {

  newShipmentForm!: FormGroup;
  constructor(private fb: FormBuilder, private rest:RestApiService) { }

  ngOnInit(): void {
  }

  onCreateAwb() {

  }
}
