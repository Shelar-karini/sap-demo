using { procure.to.pay as db } from '../db/schema';

service ProcurementService {
  entity vendors as projection on db.VENDORS {
    VENDOR_ID as vendorid,
    VENDOR_NAME as vendorname,
    EMAIL as email,
    TAX_ID as taxid
  };
  
  entity materials as projection on db.MATERIALS {
    MATERIAL_CODE as materialcode,
    DESCRIPTION as description,
    MATERIAL_GROUP as materialgroup,
    MATERIAL_TYPE as materialtype,
    UNIT_OF_MEASURE as unitofmeasure
  };
  
  entity purchaseorders as projection on db.PURCHASE_ORDERS {
    PO_NUMBER as ponumber,
    VENDOR_ID as vendorid,
    PO_DATE as podate,
    TOTAL_AMOUNT as totalamount,
    CURRENCY as currency,
    STATUS as status
  };
  
  entity polines as projection on db.PO_LINE_ITEMS {
    PO_NUMBER as ponumber,
    LINE_ITEM_NUMBER as lineitemnumber,
    MATERIAL_CODE as materialcode,
    QUANTITY as quantity,
    UNIT_PRICE as unitprice,
    TOTAL_PRICE as totalprice
  };
  
  entity goodsreceipts as projection on db.GOODS_RECEIPTS {
    GR_NUMBER as grnumber,
    PO_NUMBER as ponumber,
    GR_DATE as grdate,
    RECEIVED_BY as receivedby,
    STATUS as status
  };
  
  entity grlines as projection on db.GR_LINE_ITEMS {
    GR_NUMBER as grnumber,
    LINE_NUMBER as linenumber,
    PO_LINE_NUMBER as polinenumber,
    MATERIAL_CODE as materialcode,
    QUANTITY_RECEIVED as quantityreceived,
    QUANTITY_ACCEPTED as quantityaccepted,
    QUANTITY_REJECTED as quantityrejected
  };
  
  entity vendorinvoices as projection on db.VENDOR_INVOICES {
    INVOICE_ID as invoiceid,
    VENDOR_ID as vendorid,
    PO_NUMBER as ponumber,
    INVOICE_DATE as invoicedate,
    INVOICE_AMOUNT as invoiceamount,
    CURRENCY as currency,
    MATCH_STATUS as matchstatus,
    CREATED_AT as createdat
  };
  
  entity invoicelineitems as projection on db.INVOICE_LINE_ITEMS {
    INVOICE_ID as invoiceid,
    LINE_NUMBER as linenumber,
    MATERIAL_CODE as materialcode,
    DESCRIPTION as description,
    QUANTITY as quantity,
    UNIT_PRICE as unitprice,
    TOTAL_PRICE as totalprice,
    MATCHED_PO_LINE as matchedpoline
  };
}