export class MessageStruct {
}

export class ShipmentStatus {
    private mDate: string;
    private mEvent: string;
    private mTime: string;
    private mNotes: string;
    private mDriver:string;
    private mUpdatedBy: string;
    private mEventLocation: string;
  
    constructor()
    constructor(_ac: ShipmentStatus)
    constructor(_ac?: ShipmentStatus) {
      this.mDate = _ac && _ac.mDate || "";
      this.mEvent = _ac && _ac.mEvent || "";
      this.mTime = _ac && _ac.mTime || "";
      this.mNotes = _ac && _ac.mNotes || "";
      this.mDriver = _ac && _ac.mDriver || "";
      this.mUpdatedBy = _ac && _ac.mUpdatedBy || "";
      this.mEventLocation = _ac && _ac.mEventLocation || "";
    }
  
    set date(d: string) {
      this.mDate = d;
    }
  
    set event(d: string) {
      this.mEvent = d;
    }

    set time(d: string) {
      this.mTime = d;
    }

    set notes(d: string) {
      this.mNotes = d;
    }

    set driver(d: string) {
      this.mDriver = d;
    }

    set updatedBy(d: string) {
      this.mUpdatedBy = d;
    }

    set eventLocation(d: string) {
      this.mEventLocation = d;
    }
    
    get date() {
        return(this.mDate);
    }

    get event() {
        return(this.mEvent);
    }

    get time() {
        return(this.mTime);
    }

    get notes() {
        return(this.mNotes);
    }

    get driver() {
        return(this.mDriver);
    }

    get updatedBy() {
        return(this.mUpdatedBy);
    }

    get eventLocation() {
        return(this.mEventLocation);
    }

  }

  
export class Shipment {
    activity: Array<ShipmentStatus>;
    createdOn:Date;
    createdBy: string;
    shipmentNo: string;
    autogenerate: boolean;
    altRefNo:string;

    /*! Sender Information */
    referenceNo:string;
    accountCode:number;
    companyName: string;
    name:string;
    country: string;
    address: string;
    city:string;
    state: string;
    postalCode:string;
    contact:string;
    phone:string;
    email:string;
    recvCountryTaxId:string;

    /*! Shipment Information */
    service: string;
    noOfItems: string;
    description: string;
    goodsValue:string;
    customValue:string;
    weight:string;
    weightUnit:string;
    cubicWeight:string;
    codAmount:string;
    vat: string;
    currency:string;
    sku: string;

    /*! Receiver Information */
    receiverName:string;
    receiverCountry:string;
    receiverAddress:string;
    receiverCity:string;
    receiverState:string
    receiverPostalCode:string;
    receiverContact:string;
    receiverPhone:string;
    receiverEmail: string;

    
    constructor(_sp: Shipment ) {

    this.activity = _sp.activity;
    this.createdOn= _sp.createdOn;
    this.createdBy = _sp.createdBy;
    this.shipmentNo = _sp.shipmentNo;
    this.autogenerate = _sp.autogenerate;
    this.altRefNo = _sp.altRefNo;
    /*! Sender Information */
    this.referenceNo = _sp.referenceNo;
    this.accountCode = Number(_sp.accountCode);
    this.companyName = _sp.companyName;
    this.name = _sp.name;
    this.country = _sp.country;
    this.address = _sp.address;
    this.city = _sp.city;
    this.state = _sp.state;
    this.postalCode = _sp.postalCode;
    this.contact = _sp.contact;
    this.phone = _sp.phone;
    this.email = _sp.email;
    this.recvCountryTaxId = _sp.recvCountryTaxId;

    /*! Shipment Information */
    this.service = _sp.service;
    this.noOfItems = _sp.noOfItems;
    this.description = _sp.description;
    this.goodsValue = _sp.goodsValue;
    this.customValue = _sp.customValue;
    this.weight = _sp.weight;
    this.weightUnit = _sp.weightUnit;
    this.cubicWeight = _sp.cubicWeight;
    this.codAmount = _sp.codAmount;
    this.vat = _sp.vat;
    this.currency = _sp.currency;
      /*! Receiver Information */
    this.sku = _sp.sku;
    this.receiverName = _sp.receiverName;
    this.receiverCountry = _sp.receiverCountry;
    this.receiverAddress = _sp.receiverAddress;
    this.receiverCity = _sp.receiverCity;
    this.receiverState = _sp.receiverState;
    this.receiverPostalCode = _sp.receiverPostalCode;
    this.receiverContact = _sp.receiverContact;
    this.receiverPhone = _sp.receiverPhone;
    this.receiverEmail = _sp.receiverEmail;
  }
}

export class ShipmentList {
    m_length: number;
    m_shipmentArray: Array<Shipment>;
  
    constructor(data: Array<Shipment>,  len:number) {
      this.m_length = len;
      this.m_shipmentArray = data;
    }
  
    set length(ln: number) {
      this.m_length = ln;
    }
  
    get length(): number {
      return(this.m_length);
    }
  
    push(_sh: Shipment): void {
      this.m_shipmentArray.push(_sh);
    }
  
    pop() {
      return(this.m_shipmentArray.pop());
    }
  }

  export class Account {
    accountCode:string;
    autogenerate: boolean;
    accountPassword:string;
    companyName:string;
    role: string;
    name:string;
    address: string;
    city:string;
    state: string;
    postalCode:string;
    country: string;
    contact:string;
    email:string;
    quotedAmount:string;
    currency:string;
    vat:string;
    tradingLicense:string;
    bankAccountNo:string;
    ibnNo:string;

    constructor();
    constructor(_ac: Account);
    constructor(_ac?: Account) {
      this.autogenerate = _ac && _ac.autogenerate || false;
      this.accountCode = _ac && _ac.accountCode || "";
      this.accountPassword = _ac && _ac.accountPassword || "";
      this.companyName = _ac && _ac.companyName || "";
      this.role = _ac && _ac.role || "";
      this.name = _ac && _ac.name || "";
      this.address = _ac && _ac.address || "";
      this.city = _ac && _ac.city || "";
      this.state = _ac && _ac.state || "";
      this.postalCode = _ac && _ac.postalCode || "";
      this.country = _ac && _ac.country || "";
      this.contact = _ac && _ac.contact || "";
      this.email = _ac && _ac.email || "";
      this.quotedAmount = _ac && _ac.quotedAmount || "";
      this.currency = _ac && _ac.currency || "";
      this.vat = _ac && _ac.vat || "";
      this.tradingLicense = _ac && _ac.tradingLicense || "";
      this.bankAccountNo = _ac && _ac.bankAccountNo || "";
      this.ibnNo = _ac && _ac.ibnNo || "";
    }
}

/** Global Data structure */
export let CountryName:Array<string> =
[
"UAE",
"Saudi Arabia",
"Kuwait",
"Omani",
"Baharaini",
"Qatar"
];
export let Currency:Array<string> = 
[
"UAE - Dirham",
"Saudi Arabia- Riyal",
"Kuwait - Dinar",
"Omani - Rial",
"Baharaini - Dinar",
"Qatar - Riyal"
];

export let ServiceType:Array<string>=
[
"Document", 
"Non Document", 
"B2B", 
"eComerce", 
"Cash(Prepaid)", 
"CC(Pay in Destination)", 
"COD", 
"COR", 
"Export Documents", 
"Export Non Documents", 
"Heavy Shipment"
];

export let Role:Array<string> = 
[
"Employee",
"Contract-X",
"Customer",
"Agent",
"Driver",
"Misc"
];
export let Events:Array<string> = 
[
"Document Prepared", 
"Out For Delivery", 
"Arrived in HUB", 
"Not Delivered - Incomplete Address",
"Not Delivered - Adverse Weather",
"Not Delivered - Consignee Moved",
"Not Delivered - Consignee Schedule Delivery",
"Not Delivered - Courier Out of Time",
"Not Delivered - Inaccurate/Incomplete Address",
"Not Delivered - Miscoded",
"Not Delivered - No One Available/Home",
"Not Delivered - No Response/ Mobile switch Off",
"Not Delivered - Refused By Customer",
"Not Delivered - Unable to Locate Consignee",
"Not Delivered - Customer out of country",
"Held In Branch",
"Customer Refused",
"Customer Not Available",
"Attempted-Customer Refused",
"Attempted - No Answer / Mobile Close",
"Attempted - Address change",
"Attempted - Reschedule-Delivery",
"Attempted - Customer not available",
"Attempted-Customer Refused - Other (Request to open)",
"Attempted- Mobile Wrong",
"Attempted - Pickup from Branch",
"Attempted - Money not ready",
"Out for Delivery",
"Proof of Delivery",
"Held From Uplift-Pending Customs",
"Held in Branch- No-Service", 
"Collection",
"Documentation prepared",
"COD Paid to Customer",
"Damaged",
"Flight Arrival",
"Held in Branch",
"Held in Customs",
"Holiday",
"In Transit Delay-Pandemic Restrictions",
"In Transit to Destination",
"Info Message Sent to Recipient",
"In Scan at HUB",
"Misroute",
"Attempted-Courier out of Time",
"Attempted-Inaccurate / Incomplete Address",
"Attempted-Unable to Locate Consignee",
"Attempted- Customer out of Country",
"On-Hold-Prohibited/ Restricted Goods",
"On-Hold-Required Consignee ID / Tax numder",
"On-Hold-Required Commercial Invoice",
"On Hold-Requires Correct Telephone Number",
"On Hold for KYC",
"Onforwarded Via Third Party",
"Pickup Arranged",
"Pre Sort to Area",
"Released From Custom",
"RTO-Enroute",
"Scheduled for Delivery",
"Shipment Declared Lost",
"Shipment Returned to Sender",
"Shiment Returned to Sending Station",
"Shipper Contacted",
"Shipper/Receiver Initiated shipment Details Change",
"Shortlanded",
"SMS sent to Receiver with delivery advice",
"Sorted to Destination",
"Weight Variation",
"User Initiated Shipment Cancellation"
];
export let ExcelHeading: Array<string> = [
  "AccountCode",
  "ReferenceNo",
  "Weight",
  "ReceiverCity",
  "ReceiverName",
  "ReceiverAddress",
  "ReceiverPhoneNo",
  "ReceiverAlternatePhoneNo",
  "GoodsDescription",
  "CodAmount",
  "AlternateReferenceNo",
  "CustomsValue",
  "CustomsCurrency",
  "SenderName"
  /*
  "phone",
  "serviceType",
  "noOfItems",
  "goodsValue",
  "weightUnit",
  "cubicWeight",
  "vat",
  "sku",
  "receiverCountry",
  "receiverState",
  "receiverPostalCode",
  "receiverEmail"*/
];

export let EventLocation: Array<string> = [
  "",
  "Riyadh",
  "Dammam",
  "Jeddah",
  "Mecca",
  "Medina",
  "Khobar",
  "Jubail",
  "Tabuk",
  "Buraidah",
  "Onaizah",
  "Rass",
  "Sakakah",
  "AlQurayyat",
  "Arar",
  "Hail",
  "Rafaha",
  "Dawadmi",
  "AlKhafji",
  "HAFAR ALBATIN",
  "Khamis Mushait",
  "Najran",
  "Jizan",
  "Hassa",
  "Yanbu",
  "AlQunfudhah",
  "Taif",
  "AlMajmaah",
  "AlQatif",
  "Dhahran",
  "AlKharj"
];

export class ExcelDataFormat {
  altRefNo: string;
  referenceNo: string;
  accountCode: string;
  name: string;
  phone: string;
  serviceType: string;
  noOfItems: string;
  description: string;
  goodsValue: string;
  customValue: string;
  weight:string;
  weightUnit: string;
  cubicWeight: string;
  codAmount: string;
  vat: string;
  currency: string;
  sku: string;
  receiverName: string;
  receiverCountry: string;
  receiverAddress:string;
  receiverCity:string;
  receiverState:string;
  receiverPostalCode: string;
  receiverContact: string;
  receiverPhone:string;
  receiverEmail: string;

  constructor(exl: any) {
    this.altRefNo = exl.AlternateReferenceNo;
    this.referenceNo = exl.ReferenceNo;
    this.accountCode = exl.AccountCode;
    this.name = exl.SenderName;
    this.phone = "";
    this.serviceType = "Non Document";
    this.noOfItems = "";
    this.description=exl.GoodsDescription;
    this.goodsValue=exl.GoodsValue;
    this.customValue=exl.CustomsValue;
    this.weight = exl.Weight;
    this.weightUnit = "KG";
    this.cubicWeight="";
    this.codAmount = exl.CodAmount;
    this.vat = "";
    this.currency = exl.CustomsCurrency;
    this.sku= "";
    this.receiverName=exl.ReceiverName;
    this.receiverCountry="";
    this.receiverAddress = exl.ReceiverAddress;
    this.receiverCity = exl.ReceiverCity;
    this.receiverState = "";
    this.receiverPostalCode = "";
    this.receiverContact = exl.ReceiverAlternatePhoneNo;
    this.receiverPhone = exl.ReceiverPhoneNo;
    this.receiverEmail = "";
  }
}