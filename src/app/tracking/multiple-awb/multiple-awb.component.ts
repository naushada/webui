import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account, Shipment, ShipmentList } from 'src/app/shared/message-struct';
import { PubsubService } from 'src/app/shared/pubsub.service';
import { MatTable } from '@angular/material/table';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-multiple-awb',
  templateUrl: './multiple-awb.component.html',
  styleUrls: ['./multiple-awb.component.scss']
})
export class MultipleAwbComponent implements OnInit, OnDestroy {

  @ViewChild(MatTable) table!: MatTable<Shipment>;

  multipleAwbForm: FormGroup;
  acctInfo!: Account;
  shipmentInfoList!: ShipmentList;
  shipment:Array<Shipment> = [];
  displayResult: boolean = false;

  columnsName: Array<string> = ["shipmentNo", "event", "deliveryInformation", "view"];

  subsink = new SubSink();
  constructor(private fb: FormBuilder, private rest: RestApiService, private pubsub: PubsubService) { 
    this.multipleAwbForm = this.fb.group({
      awbList: '',
      senderRefList: ''
    });

    /* subscribe for account info for logged in user*/
    this.subsink.sink = this.pubsub.onAccount.subscribe((acct: Account) => {this.acctInfo = acct;});
  }

  ngOnDestroy() {
    this.subsink.unsubscribe();
  }

  ngOnInit(): void {
  }

  onMultipleAwb() {
    let awbNo: string = this.multipleAwbForm.value.awbList;
    let awbList = new Array<string>();

    let senderRef: string = this.multipleAwbForm.value.senderRefList;
    let senderRefList = new Array<string>();

    if(awbNo.length > 0) {
      awbNo = awbNo.trim();
      awbList = awbNo.split("\n");
    } else if(senderRef.length > 0) {
      senderRef = senderRef.trim();
      senderRefList = senderRef.split("\n");
    }

    if(awbNo.length > 0) {
      if(this.acctInfo.role == "Employee") {
        if(awbList[0].startsWith("5497") == true) {
          this.rest.getShipmentsByAwbNo(awbList) 
                              .subscribe(
                              (rsp : Shipment[]) => {
                                this.shipmentInfoList = new ShipmentList(rsp, rsp.length);
                                this.shipment = rsp;
                                //alert("Number of AWB Records are: " + this.shipmentInfoList.m_length );
                              },
                              (error: any) => {
                                alert("Invalid Shipment Number " + awbList);
                              },
                              /**Operation is executed successfully */
                              () => {});
        } else {
          this.rest.getShipmentsByAltRefNo(awbList) 
                              .subscribe(
                              (rsp : Shipment[]) => {
                                this.shipmentInfoList = new ShipmentList(rsp, rsp.length);
                                this.shipment = rsp;
                              },
                              (error: any) => {
                                alert("Invalid ALT REF NO Number " + awbNo);
                              },
                              /**Operation is executed successfully */
                              () => {});

        }
      } else {
        let acCode: string = this.acctInfo.accountCode;
        if(awbList[0].startsWith("5497") == true) {
          this.rest.getShipmentsByAwbNo(awbList, acCode) 
                              .subscribe(
                              (rsp : Shipment[]) => {
                                this.shipmentInfoList = new ShipmentList(rsp, rsp.length);
                                this.shipment = rsp;
                              },
                              (error: any) => {
                                alert("Invalid Shipment Number " + awbNo);
                              },
                              () => {
                                /** Publish the change */
                                
                              });
        } else {
          this.rest.getShipmentsByAltRefNo(awbList, acCode) 
                              .subscribe(
                              (rsp : Shipment[]) => {
                                this.shipmentInfoList = new ShipmentList(rsp, rsp.length);
                                this.shipment = rsp;
                              },
                              (error: any) => {
                                alert("Invalid ALT REF NO Number " + awbList);
                              },
                              () => {});
        }
      }
    } else if(senderRef.length > 0) {
      if(this.acctInfo.role == "Employee") {
        this.rest.getShipmentsBySenderRefNo(senderRefList) 
                              .subscribe(
                              (rsp : Shipment[]) => {
                                this.shipmentInfoList = new ShipmentList(rsp, rsp.length);
                              },
                              (error: any) => {
                                alert("Invalid Shipment Number " + awbNo);
                              },
                              () => {
                                /** Publish the change */
                                

                              });

      } else {
        let acCode: string = this.acctInfo.accountCode;
        this.rest.getShipmentsBySenderRefNo(senderRefList, acCode) 
                              .subscribe(
                              (rsp : Shipment[]) => {
                                this.shipmentInfoList = new ShipmentList(rsp, rsp.length);
                                this.shipment = rsp;
                                
                              },
                              (error: any) => {
                                alert("Invalid ALT REF NO Number " + awbList);
                              },
                              () => {});

      }
    }
  }

}
