using { procure.to.pay as db } from '../db/schema';

service ProcurementService {
  @readonly entity Vendors as projection on db.VENDORS;
  @readonly entity Materials as projection on db.MATERIALS;
  @readonly entity PurchaseOrders as projection on db.PURCHASE_ORDERS;
  @readonly entity POLineItems as projection on db.PO_LINE_ITEMS;
  @readonly entity GoodsReceipts as projection on db.GOODS_RECEIPTS;
  @readonly entity GRLineItems as projection on db.GR_LINE_ITEMS;
  @readonly entity VendorInvoices as projection on db.VENDOR_INVOICES;
  @readonly entity InvoiceLineItems as projection on db.INVOICE_LINE_ITEMS;
}