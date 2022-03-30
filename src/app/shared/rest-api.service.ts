import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account, Shipment, ShipmentStatus } from './message-struct';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 

  private apiURL:string = 'http://localhost:8080';
  //private apiURL:string = 'https://balaagh.herokuapp.com';
  //private apiURL:string = 'https://xapp-cpkpi52p2q-uc.a.run.app';
  //private apiURL: string = 'https://xpmile.herokuapp.com'
  //apiURL = 'https://xpmile-wphbm7seyq-uc.a.run.app';

  constructor(private http: HttpClient) { }

  getShipmentByAwbNo(awb: string, accountCode?: string): Observable<Shipment> {
    let param = `shipmentNo=${awb}`;

    if(accountCode != undefined) {
      param += `&accountCode=${accountCode}`
    }

    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/awbno';
    return this.http.get<Shipment>(uri, options)
  }

  getShipmentByAltRefNo(altRefNo: string, accountCode?: string): Observable<Shipment> {
    let param = `altRefNo=${altRefNo}`;

    if(accountCode != undefined) {
      param += `&accountCode=${accountCode}`
    }
    
    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/altrefno';
    return this.http.get<Shipment>(uri, options)
  }

  getShipmentBySenderRefNo(senderRefNo: string, accountCode?: string): Observable<Shipment> {
    let param = `senderRefNo=${senderRefNo}`;

    if(accountCode != undefined) {
      param += `&accountCode=${accountCode}`
    }
    
    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/senderrefno';
    return this.http.get<Shipment>(uri, options)
  }

  getShipments(fromDate:string, toDate:string, accountCode?: string): Observable<Shipment[]> {
    let param = `fromDate=${fromDate}&toDate=${toDate}`;

    if(accountCode != undefined) {
      param += `&accountCode=${accountCode}`
    }

    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/shipmentlist';
    return this.http.get<Shipment[]>(uri, options)
  }


  getShipmentsByAwbNo(awb: Array<string>, accountCode?: string): Observable<Shipment[]> {
    let param = `awbNo=${awb}`;

    if(accountCode != undefined) {
      param += `&accountCode=${accountCode}`
    }

    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/awbnolist';
    return this.http.get<Shipment[]>(uri, options)
  }

  getShipmentsByAltRefNo(altRefNo: Array<string>, accountCode?: string): Observable<Shipment[]> {
    let param = `awbNo=${altRefNo}`;

    if(accountCode != undefined) {
      param += `&accountCode=${accountCode}`
    }
    
    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/altrefnolist';
    return this.http.get<Shipment[]>(uri, options)
  }

  getShipmentsBySenderRefNo(senderRefNo: Array<string>, accountCode?: string): Observable<Shipment[]> {
    let param = `awbNo=${senderRefNo}`;

    if(accountCode != undefined) {
      param += `&accountCode=${accountCode}`
    }
    
    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/senderrefnolist';
    return this.http.get<Shipment[]>(uri, options)
  }

  getAccountInfo(id:string, pwd: string): Observable<Account> {
    let param = `userId=${id}&password=${pwd}`;

    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/login';
    return this.http.get<Account>(uri, options);
  }

  getCustomerInfo(accountCode: string): Observable<Account> {
    let param = `accountCode=${accountCode}`;

    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + '/api/account';
    return this.http.get<Account>(uri, options);
  }

  createBulkShipment(newShipment:string) : Observable<any> {
    return this.http.post<Shipment>(this.apiURL + '/api/bulk/shipping', newShipment, this.httpOptions);
  }

  updateShipment(awbNo: Array<string>, data: ShipmentStatus) : Observable<any> {
    let param = `shipmentNo=${awbNo}`;

    const options = {
                     params: new HttpParams({fromString: param}),
                     headers: new HttpHeaders({
                              'Content-Type': 'application/json'
                      })
                    };
    let uri: string = this.apiURL + '/api/shipment';
    return this.http.put<any>(uri, JSON.stringify(data), options);
  }
}
