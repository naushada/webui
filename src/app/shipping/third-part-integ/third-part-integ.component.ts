import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account } from 'src/app/shared/message-struct';
import { PubsubService } from 'src/app/shared/pubsub.service';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-third-part-integ',
  templateUrl: './third-part-integ.component.html',
  styleUrls: ['./third-part-integ.component.scss']
})
export class ThirdPartIntegComponent implements OnInit {

  thirdPartyApiForm!: FormGroup;
  acctInfo!: Account;
  subsink = new SubSink();
  m_vendor: string = "";

  constructor(private fb: FormBuilder, private rest:RestApiService, private pubsub:PubsubService) {
    this.thirdPartyApiForm = this.fb.group({
      dhlExpress: false,
      aramex: false,
      ajoul: false,
      sipsy: false,
      blueDartExpress: false,
      xlsUpload: ''
    });
   }

  ngOnInit(): void {
    //this.subsink.sink = this.pubsub.onAccount.subscribe((acct: Account) => {this.acctInfo = acct;});
    this.subsink.add(this.pubsub.onAccount.subscribe((acct: Account) => {this.acctInfo = acct;}));
  }

  onXlsSelect(e: any) {

  }

  onCreateThirdPartyShipment()
  {
    let uri: string = "";
    if(this.m_vendor == 'ajoul') {
      uri = "/api/v1/ajoul/shipment/create";
    } else {
      return;
    }

    let awbList: any = {v1: "ajoul"};

    this.rest.create3rdPartyShipment(awbList, uri, this.acctInfo.accountCode).subscribe(data=> {alert(data);},
      (error:any) => {alert("Failed for Ajoul");},
      () => {alert("Shipment created successfully for 3rd PARTY " + this.m_vendor);});
  }

  setVendorName(vendor:string) {
    this.m_vendor = vendor;
  }

  onCheckboxSelect(vendor:string) {
    this.m_vendor = vendor;
  }
}
