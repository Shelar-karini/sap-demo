const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
  const db = await cds.connect.to('db');
  
  // ============ VENDORS ============
  this.on('READ', 'Vendors', async (req) => {
    return await db.run('SELECT * FROM "PROCURE_TO_PAY"."VENDORS"');
  });
  
  this.on('CREATE', 'Vendors', async (req) => {
    const { VENDOR_ID, VENDOR_NAME, EMAIL, TAX_ID } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."VENDORS" (VENDOR_ID, VENDOR_NAME, EMAIL, TAX_ID) VALUES (?, ?, ?, ?)`,
      [VENDOR_ID, VENDOR_NAME, EMAIL, TAX_ID]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'Vendors', async (req) => {
    const { VENDOR_ID, VENDOR_NAME, EMAIL, TAX_ID } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."VENDORS" SET VENDOR_NAME = ?, EMAIL = ?, TAX_ID = ? WHERE VENDOR_ID = ?`,
      [VENDOR_NAME, EMAIL, TAX_ID, VENDOR_ID]
    );
    return req.data;
  });
  
  this.on('DELETE', 'Vendors', async (req) => {
    const VENDOR_ID = req.data.VENDOR_ID;
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."VENDORS" WHERE VENDOR_ID = ?`, [VENDOR_ID]);
  });
  
  // ============ MATERIALS ============
  this.on('READ', 'Materials', async (req) => {
    return await db.run('SELECT * FROM "PROCURE_TO_PAY"."MATERIALS"');
  });
  
  this.on('CREATE', 'Materials', async (req) => {
    const { MATERIAL_CODE, DESCRIPTION, MATERIAL_GROUP, MATERIAL_TYPE, UNIT_OF_MEASURE } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."MATERIALS" VALUES (?, ?, ?, ?, ?)`,
      [MATERIAL_CODE, DESCRIPTION, MATERIAL_GROUP, MATERIAL_TYPE, UNIT_OF_MEASURE]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'Materials', async (req) => {
    const { MATERIAL_CODE, DESCRIPTION, MATERIAL_GROUP, MATERIAL_TYPE, UNIT_OF_MEASURE } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."MATERIALS" SET DESCRIPTION = ?, MATERIAL_GROUP = ?, MATERIAL_TYPE = ?, UNIT_OF_MEASURE = ? WHERE MATERIAL_CODE = ?`,
      [DESCRIPTION, MATERIAL_GROUP, MATERIAL_TYPE, UNIT_OF_MEASURE, MATERIAL_CODE]
    );
    return req.data;
  });
  
  this.on('DELETE', 'Materials', async (req) => {
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."MATERIALS" WHERE MATERIAL_CODE = ?`, [req.data.MATERIAL_CODE]);
  });
  
  // ============ PURCHASE_ORDERS ============
  this.on('READ', 'PurchaseOrders', async (req) => {
    return await db.run('SELECT * FROM "PROCURE_TO_PAY"."PURCHASE_ORDERS"');
  });
  
  this.on('CREATE', 'PurchaseOrders', async (req) => {
    const { PO_NUMBER, VENDOR_ID, PO_DATE, TOTAL_AMOUNT, CURRENCY, STATUS } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."PURCHASE_ORDERS" VALUES (?, ?, ?, ?, ?, ?)`,
      [PO_NUMBER, VENDOR_ID, PO_DATE, TOTAL_AMOUNT, CURRENCY, STATUS]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'PurchaseOrders', async (req) => {
    const { PO_NUMBER, VENDOR_ID, PO_DATE, TOTAL_AMOUNT, CURRENCY, STATUS } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."PURCHASE_ORDERS" SET VENDOR_ID = ?, PO_DATE = ?, TOTAL_AMOUNT = ?, CURRENCY = ?, STATUS = ? WHERE PO_NUMBER = ?`,
      [VENDOR_ID, PO_DATE, TOTAL_AMOUNT, CURRENCY, STATUS, PO_NUMBER]
    );
    return req.data;
  });
  
  this.on('DELETE', 'PurchaseOrders', async (req) => {
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."PURCHASE_ORDERS" WHERE PO_NUMBER = ?`, [req.data.PO_NUMBER]);
  });
  
  // ============ PO_LINE_ITEMS ============
  this.on('READ', 'POLineItems', async (req) => {
    return await db.run('SELECT * FROM "PROCURE_TO_PAY"."PO_LINE_ITEMS"');
  });
  
  this.on('CREATE', 'POLineItems', async (req) => {
    const { PO_NUMBER, LINE_ITEM_NUMBER, MATERIAL_CODE, QUANTITY, UNIT_PRICE, TOTAL_PRICE } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."PO_LINE_ITEMS" VALUES (?, ?, ?, ?, ?, ?)`,
      [PO_NUMBER, LINE_ITEM_NUMBER, MATERIAL_CODE, QUANTITY, UNIT_PRICE, TOTAL_PRICE]
    );
    return req.data;
  });
  
  // ============ GOODS_RECEIPTS ============
  this.on('READ', 'GoodsReceipts', async (req) => {
    return await db.run('SELECT * FROM "PROCURE_TO_PAY"."GOODS_RECEIPTS"');
  });
  
  this.on('CREATE', 'GoodsReceipts', async (req) => {
    const { GR_NUMBER, PO_NUMBER, GR_DATE, RECEIVED_BY, STATUS } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."GOODS_RECEIPTS" VALUES (?, ?, ?, ?, ?)`,
      [GR_NUMBER, PO_NUMBER, GR_DATE, RECEIVED_BY, STATUS]
    );
    return req.data;
  });
  
  // ============ GR_LINE_ITEMS ============
  this.on('READ', 'GRLineItems', async (req) => {
    return await db.run('SELECT * FROM "PROCURE_TO_PAY"."GR_LINE_ITEMS"');
  });
  
  this.on('CREATE', 'GRLineItems', async (req) => {
    const { GR_NUMBER, LINE_NUMBER, PO_LINE_NUMBER, MATERIAL_CODE, QUANTITY_RECEIVED, QUANTITY_ACCEPTED, QUANTITY_REJECTED } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."GR_LINE_ITEMS" VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [GR_NUMBER, LINE_NUMBER, PO_LINE_NUMBER, MATERIAL_CODE, QUANTITY_RECEIVED, QUANTITY_ACCEPTED, QUANTITY_REJECTED]
    );
    return req.data;
  });
  
  // ============ VENDOR_INVOICES ============
  this.on('READ', 'VendorInvoices', async (req) => {
    return await db.run('SELECT * FROM "PROCURE_TO_PAY"."VENDOR_INVOICES"');
  });
  
  this.on('CREATE', 'VendorInvoices', async (req) => {
    const { INVOICE_ID, VENDOR_ID, PO_NUMBER, INVOICE_DATE, INVOICE_AMOUNT, CURRENCY, MATCH_STATUS, CREATED_AT } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."VENDOR_INVOICES" VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [INVOICE_ID, VENDOR_ID, PO_NUMBER, INVOICE_DATE, INVOICE_AMOUNT, CURRENCY, MATCH_STATUS, CREATED_AT]
    );
    return req.data;
  });
  
  // ============ INVOICE_LINE_ITEMS ============
  this.on('READ', 'InvoiceLineItems', async (req) => {
    return await db.run('SELECT * FROM "PROCURE_TO_PAY"."INVOICE_LINE_ITEMS"');
  });
  
  this.on('CREATE', 'InvoiceLineItems', async (req) => {
    const { INVOICE_ID, LINE_NUMBER, MATERIAL_CODE, DESCRIPTION, QUANTITY, UNIT_PRICE, TOTAL_PRICE, MATCHED_PO_LINE } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."INVOICE_LINE_ITEMS" VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [INVOICE_ID, LINE_NUMBER, MATERIAL_CODE, DESCRIPTION, QUANTITY, UNIT_PRICE, TOTAL_PRICE, MATCHED_PO_LINE]
    );
    return req.data;
  });
});