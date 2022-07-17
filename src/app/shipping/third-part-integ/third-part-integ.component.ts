import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-third-part-integ',
  templateUrl: './third-part-integ.component.html',
  styleUrls: ['./third-part-integ.component.scss']
})
export class ThirdPartIntegComponent implements OnInit {

  thirdPartyApiForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.thirdPartyApiForm = this.fb.group({
      dhlExpress: false,
      aramex: false,
      dtdc: false,
      sipsy: false,
      blueDartExpress: false,
      xlsUpload: ''
    });
   }

  ngOnInit(): void {
  }

  onXlsSelect(e: any) {

  }

  onCreateThirdPartyShipment()
  {

  }

  onCheckboxSelect(vendor:string) {
    alert("The check box selected is " + vendor);
  }
}
