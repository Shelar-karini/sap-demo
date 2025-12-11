using { procure.to.pay as db } from '../db/schema';

service ProcurementService {
  entity Vendors as projection on db.VENDORS {
    VENDOR_ID as VendorId,
    VENDOR_NAME as VendorName,
    EMAIL as Email,
    TAX_ID as TaxId
  };
  
  entity Materials as projection on db.MATERIALS {
    MATERIAL_CODE as MaterialCode,
    DESCRIPTION as Description,
    MATERIAL_GROUP as MaterialGroup,
    MATERIAL_TYPE as MaterialType,
    UNIT_OF_MEASURE as UnitOfMeasure
  };
  
  entity PurchaseOrders as projection on db.PURCHASE_ORDERS {
    PO_NUMBER as PoNumber,
    VENDOR_ID as VendorId,
    PO_DATE as PoDate,
    TOTAL_AMOUNT as TotalAmount,
    CURRENCY as Currency,
    STATUS as Status
  };
  
  entity POLines as projection on db.PO_LINE_ITEMS {
    PO_NUMBER as PoNumber,
    LINE_ITEM_NUMBER as LineItemNumber,
    MATERIAL_CODE as MaterialCode,
    QUANTITY as Quantity,
    UNIT_PRICE as UnitPrice,
    TOTAL_PRICE as TotalPrice
  };
  
  entity GoodsReceipts as projection on db.GOODS_RECEIPTS {
    GR_NUMBER as GrNumber,
    PO_NUMBER as PoNumber,
    GR_DATE as GrDate,
    RECEIVED_BY as ReceivedBy,
    STATUS as Status
  };
  
  entity GRLines as projection on db.GR_LINE_ITEMS {
    GR_NUMBER as GrNumber,
    LINE_NUMBER as LineNumber,
    PO_LINE_NUMBER as PoLineNumber,
    MATERIAL_CODE as MaterialCode,
    QUANTITY_RECEIVED as QuantityReceived,
    QUANTITY_ACCEPTED as QuantityAccepted,
    QUANTITY_REJECTED as QuantityRejected
  };
  
  entity VendorInvoices as projection on db.VENDOR_INVOICES {
    INVOICE_ID as InvoiceId,
    VENDOR_ID as VendorId,
    PO_NUMBER as PoNumber,
    INVOICE_DATE as InvoiceDate,
    INVOICE_AMOUNT as InvoiceAmount,
    CURRENCY as Currency,
    MATCH_STATUS as MatchStatus,
    CREATED_AT as CreatedAt
  };
  
  entity InvoiceLineItems as projection on db.INVOICE_LINE_ITEMS {
    INVOICE_ID as InvoiceId,
    LINE_NUMBER as LineNumber,
    MATERIAL_CODE as MaterialCode,
    DESCRIPTION as Description,
    QUANTITY as Quantity,
    UNIT_PRICE as UnitPrice,
    TOTAL_PRICE as TotalPrice,
    MATCHED_PO_LINE as MatchedPoLine
  };
}