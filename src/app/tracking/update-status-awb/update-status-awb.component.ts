import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { PubsubService } from 'src/app/shared/pubsub.service';
import { Shipment, Account, ShipmentStatus } from 'src/app/shared/message-struct';
import { CountryName, Currency, ServiceType, Role, Events, EventLocation } from 'src/app/shared/message-struct';
import { SubSink } from 'subsink';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-update-status-awb',
  templateUrl: './update-status-awb.component.html',
  styleUrls: ['./update-status-awb.component.scss']
})
export class UpdateStatusAwbComponent implements OnInit, OnDestroy {

  CountryNames = CountryName;
  CurrencyList = Currency;
  ServiceTypes = ServiceType;
  EventList = Events;
  Roles = Role;
  CityNames = EventLocation;

  acctInfo!:Account;

  subsink = new SubSink();
  private mIsBtnDisabled: boolean;
  updateAwbForm: FormGroup;

  constructor(private fb: FormBuilder, private rest: RestApiService, private pubsub:PubsubService) { 
    this.mIsBtnDisabled = false;
    this.subsink.sink = this.pubsub.onAccount.subscribe((acct: Account) => {this.acctInfo = acct;});

    this.updateAwbForm = this.fb.group({
      date:[formatDate(new Date(Date.now()), 'yyyy-MM-dd', 'en')],
      event:this.EventList[0],
      time:'',
      notes:'',
      driverName:'',
      updatedBy: this.acctInfo.name,
      eventLocation: this.CityNames[1],
      manualEvtLoc:'',
      connote:''
    });

  }


  ngOnInit(): void {
  }

  onStatusUpdateAwb() {

    this.isBtnDisabled = true;
    let awbNo: string = this.updateAwbForm.get('connote')?.value;
    let activity: ShipmentStatus = new ShipmentStatus();
    activity.date = formatDate(this.updateAwbForm.get('date')?.value, 'dd/MM/yyy', 'en');

    activity.event = this.updateAwbForm.get('event')?.value;
    activity.time = this.updateAwbForm.get('time')?.value;
    activity.notes = this.updateAwbForm.get('notes')?.value;
    activity.driver = this.updateAwbForm.get('driverName')?.value;
    activity.updatedBy = this.updateAwbForm.get('updatedBy')?.value;
    activity.eventLocation = this.updateAwbForm.get('eventLocation')?.value;

    if(this.updateAwbForm.get('manualEvtLoc')?.value.length) {
      activity.eventLocation = this.updateAwbForm.get('manualEvtLoc')?.value;
    }

    let awbNoList = new Array<string>();
    awbNo = awbNo.trim();
    awbNoList = awbNo.split("\n");

    this.rest.updateShipmentParallel(awbNoList, activity).subscribe((data) => {
                          alert("Sipment Status is Updated Successfully");
                          this.updateAwbForm.get('connote')?.setValue('');
                          this.updateAwbForm.get('notes')?.setValue('');
                          this.isBtnDisabled = false;
                        },
              (error) => {alert("Shipment Status Update is Failed");
                          this.isBtnDisabled = true;
              },
              () => {});
  }

  get isBtnDisabled(): boolean {
    return(this.mIsBtnDisabled);
  }

  set isBtnDisabled(st: boolean) {
    this.mIsBtnDisabled = st;
  }

  ngOnDestroy() : void {
    this.subsink.unsubscribe();
  }
}
