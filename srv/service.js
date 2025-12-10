const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
  const db = await cds.connect.to('db');
  
  this.on('READ', 'Vendors', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."VENDORS"');
    return result;
  });
  
  this.on('READ', 'Materials', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."MATERIALS"');
    return result;
  });
  
  this.on('READ', 'PurchaseOrders', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."PURCHASE_ORDERS"');
    return result;
  });
  
  this.on('READ', 'POLineItems', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."PO_LINE_ITEMS"');
    return result;
  });
  
  this.on('READ', 'GoodsReceipts', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."GOODS_RECEIPTS"');
    return result;
  });
  
  this.on('READ', 'GRLineItems', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."GR_LINE_ITEMS"');
    return result;
  });
  
  this.on('READ', 'VendorInvoices', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."VENDOR_INVOICES"');
    return result;
  });
  
  this.on('READ', 'InvoiceLineItems', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."INVOICE_LINE_ITEMS"');
    return result;
  });
});