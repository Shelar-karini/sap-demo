using { procure.to.pay as db } from '../db/schema';

service ProcurementService {
  entity Vendors as projection on db.VENDORS;
  entity Materials as projection on db.MATERIALS;
  entity PurchaseOrders as projection on db.PURCHASE_ORDERS;
  entity POLineItems as projection on db.PO_LINE_ITEMS;
  entity GoodsReceipts as projection on db.GOODS_RECEIPTS;
  entity GRLineItems as projection on db.GR_LINE_ITEMS;
  entity VendorInvoices as projection on db.VENDOR_INVOICES;
  entity InvoiceLineItems as projection on db.INVOICE_LINE_ITEMS;
}