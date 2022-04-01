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
  tmpShipmentInfo!: Shipment;

  constructor(private fb: FormBuilder, private rest: RestApiService, private pubsub: PubsubService) { 
    this.mIsBtnDisabled = false;

    this.singleAwbForm = this.fb.group({
      awbNo:'',
      senderRefNo:''
    });

    /* subscribe for account info for logged in user*/
    this.subsink.sink = this.pubsub.onAccount.subscribe((acct: Account) => {this.acctInfo = acct;});
    this.subsink.sink = this.pubsub.getSelectedShipment((ship: Shipment) => {this.shipmentInfo = new Shipment(ship);
      this.tmpShipmentInfo = {...this.shipmentInfo};
      this.tmpShipmentInfo.activity = Array.prototype.reverse.call(this.tmpShipmentInfo.activity);
    });
  }

  ngOnInit(): void {
    
    if(this.shipmentInfo && this.shipmentInfo.shipmentNo != "") {
      this.displayResult = true;
      this.singleAwbForm.get('awbNo')?.setValue(this.shipmentInfo.shipmentNo);
    }
    
  }

  ngOnDestroy() {
    this.subsink.unsubscribe();
  }

  onSingleAwb() {

    this.isBtnDisabled = true;
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
                                this.tmpShipmentInfo = {...this.shipmentInfo};
                                Array.prototype.reverse.call(this.tmpShipmentInfo.activity);
                                this.displayResult = true;
                                this.isBtnDisabled = false;
                                this.singleAwbForm.get('awbNo')?.setValue("");
                              },
                              error => {
                                alert("Invalid AWB Number " + awbNo);
                                this.isBtnDisabled = false;
                              },
                              /**Operation is executed successfully */
                              () => {});
        } else {
          this.rest.getShipmentByAltRefNo(awbNo) 
                              .subscribe(
                              (rsp : Shipment) => {
                                this.shipmentInfo = new Shipment(rsp);
                                this.tmpShipmentInfo = {...this.shipmentInfo};
                                Array.prototype.reverse.call(this.tmpShipmentInfo.activity);
                                this.displayResult = true;
                                this.isBtnDisabled = false;
                                this.singleAwbForm.get('awbNo')?.setValue("");
                              },
                              error => {
                                alert("Invalid ALT REF NO Number " + awbNo);
                                this.isBtnDisabled = false;
                              },
                              /**Operation is executed successfully */
                              () => {});
        }
      } else if(sndRefNo.length > 0) {
        this.rest.getShipmentBySenderRefNo(sndRefNo).subscribe(
          (rsp: Shipment) =>
          {
              this.shipmentInfo = new Shipment(rsp);
              this.tmpShipmentInfo = {...this.shipmentInfo};
              Array.prototype.reverse.call(this.tmpShipmentInfo.activity);
              this.displayResult = true;
              this.isBtnDisabled = false;
              this.singleAwbForm.get('senderRefNo')?.setValue("");

          },
          (error) => {
              this.isBtnDisabled = false;
          },
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
                                this.tmpShipmentInfo = {...this.shipmentInfo};
                                Array.prototype.reverse.call(this.tmpShipmentInfo.activity);
                                this.displayResult = true;
                                this.isBtnDisabled = false;
                                this.singleAwbForm.get('awbNo')?.setValue("");
                              },
                              error => {
                                alert("Invalid Shipment Number " + awbNo);
                                this.isBtnDisabled = false;
                              },
                              /**Operation is executed successfully */
                              () => {});
        } else {
          this.rest.getShipmentByAltRefNo(awbNo, acCode) 
                              .subscribe(
                              (rsp : Shipment) => {
                                this.shipmentInfo = new Shipment(rsp);
                                this.tmpShipmentInfo = {...this.shipmentInfo};
                                Array.prototype.reverse.call(this.tmpShipmentInfo.activity);
                                this.displayResult = true;
                                this.isBtnDisabled = false;
                                this.singleAwbForm.get('awbNo')?.setValue("");
                              },
                              error => {
                                alert("Invalid ALT REF NO Number " + awbNo);
                                this.isBtnDisabled = false;
                              },
                              /**Operation is executed successfully */
                              () => {});
        }
      } else if(sndRefNo.length > 0) {
          this.rest.getShipmentBySenderRefNo(sndRefNo, acCode).subscribe(
                              (rsp : Shipment) => {
                                this.shipmentInfo = new Shipment(rsp);
                                this.tmpShipmentInfo = {...this.shipmentInfo};
                                Array.prototype.reverse.call(this.tmpShipmentInfo.activity);
                                this.displayResult = true;
                                this.isBtnDisabled = false;
                                this.singleAwbForm.get('senderRefNo')?.setValue("");
                              },
                              error => {
                                alert("Invalid ALT REF NO Number " + awbNo);
                                this.isBtnDisabled = false;
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

  currentState(arg:string, isLastNode: boolean) {
    if(isLastNode) {
      if(arg == "notStarted") {
        return ClrTimelineStepState.NOT_STARTED;
      } else if( arg == "current") {
        return ClrTimelineStepState.CURRENT;
      } else if(arg == "Document Created") {
        return ClrTimelineStepState.PROCESSING;
      } else if(arg == "Proof of Delivery" || arg == "Shipment Returned to Sender") {
        return ClrTimelineStepState.SUCCESS;
      } else if(arg == "error") {
        return ClrTimelineStepState.ERROR;
      } else {
        return ClrTimelineStepState.CURRENT;
        //return ClrTimelineStepState.PROCESSING;
      }
    } else {
      return ClrTimelineStepState.SUCCESS;
    }
  }


}
