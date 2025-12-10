namespace procure.to.pay;

@cds.persistence.exists
@cds.persistence.table
entity VENDORS {
  key VENDOR_ID   : String(20);
      VENDOR_NAME : String(100);
      EMAIL       : String(100);
      TAX_ID      : String(50);
}

@cds.persistence.exists
@cds.persistence.table
entity MATERIALS {
  key MATERIAL_CODE   : String(50);
      DESCRIPTION     : String(200);
      MATERIAL_GROUP  : String(50);
      MATERIAL_TYPE   : String(10);
      UNIT_OF_MEASURE : String(10);
}

@cds.persistence.exists
@cds.persistence.table
entity PURCHASE_ORDERS {
  key PO_NUMBER    : String(20);
      VENDOR_ID    : String(20);
      PO_DATE      : Date;
      TOTAL_AMOUNT : Decimal(15,2);
      CURRENCY     : String(3);
      STATUS       : String(20);
}

@cds.persistence.exists
@cds.persistence.table
entity PO_LINE_ITEMS {
  key PO_NUMBER        : String(20);
  key LINE_ITEM_NUMBER : Integer;
      MATERIAL_CODE    : String(50);
      QUANTITY         : Decimal(13,3);
      UNIT_PRICE       : Decimal(15,2);
      TOTAL_PRICE      : Decimal(15,2);
}

@cds.persistence.exists
@cds.persistence.table
entity GOODS_RECEIPTS {
  key GR_NUMBER   : String(20);
      PO_NUMBER   : String(20);
      GR_DATE     : Date;
      RECEIVED_BY : String(100);
      STATUS      : String(20);
}

@cds.persistence.exists
@cds.persistence.table
entity GR_LINE_ITEMS {
  key GR_NUMBER         : String(20);
  key LINE_NUMBER       : Integer;
      PO_LINE_NUMBER    : Integer;
      MATERIAL_CODE     : String(50);
      QUANTITY_RECEIVED : Decimal(13,3);
      QUANTITY_ACCEPTED : Decimal(13,3);
      QUANTITY_REJECTED : Decimal(13,3);
}

@cds.persistence.exists
@cds.persistence.table
entity VENDOR_INVOICES {
  key INVOICE_ID     : String(20);
      VENDOR_ID      : String(20);
      PO_NUMBER      : String(20);
      INVOICE_DATE   : Date;
      INVOICE_AMOUNT : Decimal(15,2);
      CURRENCY       : String(3);
      MATCH_STATUS   : String(20);
      CREATED_AT     : Timestamp;
}

@cds.persistence.exists
@cds.persistence.table
entity INVOICE_LINE_ITEMS {
  key INVOICE_ID      : String(20);
  key LINE_NUMBER     : Integer;
      MATERIAL_CODE   : String(50);
      DESCRIPTION     : String(200);
      QUANTITY        : Decimal(13,3);
      UNIT_PRICE      : Decimal(15,2);
      TOTAL_PRICE     : Decimal(15,2);
      MATCHED_PO_LINE : Integer;
}