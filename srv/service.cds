using { procure.to.pay as db } from '../db/schema';

service ProcurementService {
  entity VENDORS as projection on db.VENDORS;
  entity MATERIALS as projection on db.MATERIALS;
  entity PURCHASE_ORDERS as projection on db.PURCHASE_ORDERS;
  entity PO_LINE_ITEMS as projection on db.PO_LINE_ITEMS;
  entity GOODS_RECEIPTS as projection on db.GOODS_RECEIPTS;
  entity GR_LINE_ITEMS as projection on db.GR_LINE_ITEMS;
  entity VENDOR_INVOICES as projection on db.VENDOR_INVOICES;
  entity INVOICE_LINE_ITEMS as projection on db.INVOICE_LINE_ITEMS;
}