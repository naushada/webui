import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { PubsubService } from 'src/app/shared/pubsub.service';
import { MatTable } from '@angular/material/table';
import { Shipment, Account } from 'src/app/shared/message-struct';
import { ClrTimelineStepState } from '@clr/angular';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-single-awb',
  templateUrl: './single-awb.component.html',
  styleUrls: ['./single-awb.component.scss']
})
export class SingleAwbComponent implements OnInit, OnDestroy {

  @ViewChild(MatTable) table!: MatTable<Shipment>;

  columnsName: Array<string> = ["date", "time", "location", "activity", "notes", "enteredBy", "received_UTC", "sent_UTC"];
  singleAwbForm: FormGroup;
  private mIsBtnDisabled: boolean;

  subsink = new SubSink();
  acctInfo!: Account;
  shipmentInfo!: Shipment;
  displayResult: boolean = false;

  constructor(private fb: FormBuilder, private rest: RestApiService, private pubsub: PubsubService) { 
    this.mIsBtnDisabled = false;

    this.singleAwbForm = this.fb.group({
      awbNo:'',
      senderRefNo:''
    });

    /* subscribe for account info for logged in user*/
    this.subsink.sink = this.pubsub.onAccount.subscribe((acct: Account) => {this.acctInfo = acct;});
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subsink.unsubscribe();
  }

  onSingleAwb() {

    let awbNo = this.singleAwbForm.value.awbNo;
    let sndRefNo = this.singleAwbForm.value.senderRefNo;

    if(this.acctInfo.role == "Employee") {
      console.log("awbNo.length :" + awbNo.length);
      if(awbNo.length > 0) {
        if(awbNo.startsWith("5497") == true) {
          this.rest.getShipmentByAwbNo(awbNo) 
                              .subscribe(
                              (rsp : Shipment) => {
                                this.shipmentInfo = new Shipment(rsp);
                                this.displayResult = true;
                              },
                              error => {
                                alert("Invalid AWB Number " + awbNo);
                              },
                              /**Operation is executed successfully */
                              () => {});
        } else {
          this.rest.getShipmentByAltRefNo(awbNo) 
                              .subscribe(
                              (rsp : Shipment) => {
                                this.shipmentInfo = new Shipment(rsp);
                                this.displayResult = true;
                              },
                              error => {
                                alert("Invalid ALT REF NO Number " + awbNo);
                              },
                              /**Operation is executed successfully */
                              () => {});
        }
      } else if(sndRefNo.length > 0) {
        this.rest.getShipmentBySenderRefNo(sndRefNo).subscribe(
          (rsp: Shipment) =>
          {
              this.shipmentInfo = new Shipment(rsp);
              this.displayResult = true;

          },
          (error) => {},
          () => {});
      }
    } else {
      let acCode: string = this.acctInfo.accountCode;
      if(awbNo.length > 0) {
        if(awbNo.startsWith("5497") == true) {
          this.rest.getShipmentByAwbNo(awbNo, acCode) 
                              .subscribe(
                              (rsp : Shipment) => {
                                this.shipmentInfo = new Shipment(rsp);
                                this.displayResult = true;
                              },
                              error => {
                                alert("Invalid Shipment Number " + awbNo);
                              },
                              /**Operation is executed successfully */
                              () => {});
        } else {
          this.rest.getShipmentByAltRefNo(awbNo, acCode) 
                              .subscribe(
                              (rsp : Shipment) => {
                                this.shipmentInfo = new Shipment(rsp);
                                this.displayResult = true;
                              },
                              error => {
                                alert("Invalid ALT REF NO Number " + awbNo);
                              },
                              /**Operation is executed successfully */
                              () => {});
        }
      } else if(sndRefNo.length > 0) {
          this.rest.getShipmentBySenderRefNo(sndRefNo, acCode).subscribe(
                              (rsp : Shipment) => {
                                this.shipmentInfo = new Shipment(rsp);
                                this.displayResult = true;
                              },
                              error => {
                                alert("Invalid ALT REF NO Number " + awbNo);
                              },
                              /**Operation is executed successfully */
                              () => {});

      }
    }
  }


  get isBtnDisabled(): boolean {
    return(this.mIsBtnDisabled);
  }

  set isBtnDisabled(st: boolean) {
    this.mIsBtnDisabled = st;
  }

  currentState(arg:string) {
    if(arg == "notStarted") {
      return ClrTimelineStepState.NOT_STARTED;
    } else if( arg == "current") {
      return ClrTimelineStepState.CURRENT;
    } else if(arg == "processing") {
      return ClrTimelineStepState.PROCESSING;
    } else if(arg == "Proof of Delivery") {
      return ClrTimelineStepState.SUCCESS;
    } else if(arg == "error") {
      return ClrTimelineStepState.ERROR;
    } else {
      return ClrTimelineStepState.CURRENT;
    }
  }
}
