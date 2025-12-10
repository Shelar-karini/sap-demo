const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
  const db = await cds.connect.to('db');
  
  // ============ VENDORS ============
  this.on('READ', 'VENDORS', async (req) => {
    return await db.run('SELECT * FROM "PROCURE_TO_PAY"."VENDORS"');
  });
  
  this.on('CREATE', 'VENDORS', async (req) => {
    const { VENDOR_ID, VENDOR_NAME, EMAIL, TAX_ID } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."VENDORS" (VENDOR_ID, VENDOR_NAME, EMAIL, TAX_ID) VALUES (?, ?, ?, ?)`,
      [VENDOR_ID, VENDOR_NAME, EMAIL, TAX_ID]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'VENDORS', async (req) => {
    const { VENDOR_ID, VENDOR_NAME, EMAIL, TAX_ID } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."VENDORS" SET VENDOR_NAME = ?, EMAIL = ?, TAX_ID = ? WHERE VENDOR_ID = ?`,
      [VENDOR_NAME, EMAIL, TAX_ID, VENDOR_ID]
    );
    return req.data;
  });
  
  this.on('DELETE', 'VENDORS', async (req) => {
    const VENDOR_ID = req.data.VENDOR_ID;
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."VENDORS" WHERE VENDOR_ID = ?`, [VENDOR_ID]);
  });
  
  // ============ MATERIALS ============
  this.on('READ', 'MATERIALS', async (req) => {
    return await db.run('SELECT * FROM "PROCURE_TO_PAY"."MATERIALS"');
  });
  
  this.on('CREATE', 'MATERIALS', async (req) => {
    const { MATERIAL_CODE, DESCRIPTION, MATERIAL_GROUP, MATERIAL_TYPE, UNIT_OF_MEASURE } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."MATERIALS" VALUES (?, ?, ?, ?, ?)`,
      [MATERIAL_CODE, DESCRIPTION, MATERIAL_GROUP, MATERIAL_TYPE, UNIT_OF_MEASURE]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'MATERIALS', async (req) => {
    const { MATERIAL_CODE, DESCRIPTION, MATERIAL_GROUP, MATERIAL_TYPE, UNIT_OF_MEASURE } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."MATERIALS" SET DESCRIPTION = ?, MATERIAL_GROUP = ?, MATERIAL_TYPE = ?, UNIT_OF_MEASURE = ? WHERE MATERIAL_CODE = ?`,
      [DESCRIPTION, MATERIAL_GROUP, MATERIAL_TYPE, UNIT_OF_MEASURE, MATERIAL_CODE]
    );
    return req.data;
  });
  
  this.on('DELETE', 'MATERIALS', async (req) => {
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."MATERIALS" WHERE MATERIAL_CODE = ?`, [req.data.MATERIAL_CODE]);
  });
  
  // ============ PURCHASE_ORDERS ============
  this.on('READ', 'PURCHASE_ORDERS', async (req) => {
    return await db.run('SELECT * FROM "PROCURE_TO_PAY"."PURCHASE_ORDERS"');
  });
  
  this.on('CREATE', 'PURCHASE_ORDERS', async (req) => {
    const { PO_NUMBER, VENDOR_ID, PO_DATE, TOTAL_AMOUNT, CURRENCY, STATUS } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."PURCHASE_ORDERS" VALUES (?, ?, ?, ?, ?, ?)`,
      [PO_NUMBER, VENDOR_ID, PO_DATE, TOTAL_AMOUNT, CURRENCY, STATUS]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'PURCHASE_ORDERS', async (req) => {
    const { PO_NUMBER, VENDOR_ID, PO_DATE, TOTAL_AMOUNT, CURRENCY, STATUS } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."PURCHASE_ORDERS" SET VENDOR_ID = ?, PO_DATE = ?, TOTAL_AMOUNT = ?, CURRENCY = ?, STATUS = ? WHERE PO_NUMBER = ?`,
      [VENDOR_ID, PO_DATE, TOTAL_AMOUNT, CURRENCY, STATUS, PO_NUMBER]
    );
    return req.data;
  });
  
  this.on('DELETE', 'PURCHASE_ORDERS', async (req) => {
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."PURCHASE_ORDERS" WHERE PO_NUMBER = ?`, [req.data.PO_NUMBER]);
  });
  
  // ============ PO_LINE_ITEMS ============
  this.on('READ', 'PO_LINE_ITEMS', async (req) => {
    return await db.run('SELECT * FROM "PROCURE_TO_PAY"."PO_LINE_ITEMS"');
  });
  
  this.on('CREATE', 'PO_LINE_ITEMS', async (req) => {
    const { PO_NUMBER, LINE_ITEM_NUMBER, MATERIAL_CODE, QUANTITY, UNIT_PRICE, TOTAL_PRICE } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."PO_LINE_ITEMS" VALUES (?, ?, ?, ?, ?, ?)`,
      [PO_NUMBER, LINE_ITEM_NUMBER, MATERIAL_CODE, QUANTITY, UNIT_PRICE, TOTAL_PRICE]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'PO_LINE_ITEMS', async (req) => {
    const { PO_NUMBER, LINE_ITEM_NUMBER, MATERIAL_CODE, QUANTITY, UNIT_PRICE, TOTAL_PRICE } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."PO_LINE_ITEMS" SET MATERIAL_CODE = ?, QUANTITY = ?, UNIT_PRICE = ?, TOTAL_PRICE = ? WHERE PO_NUMBER = ? AND LINE_ITEM_NUMBER = ?`,
      [MATERIAL_CODE, QUANTITY, UNIT_PRICE, TOTAL_PRICE, PO_NUMBER, LINE_ITEM_NUMBER]
    );
    return req.data;
  });
  
  this.on('DELETE', 'PO_LINE_ITEMS', async (req) => {
    const { PO_NUMBER, LINE_ITEM_NUMBER } = req.data;
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."PO_LINE_ITEMS" WHERE PO_NUMBER = ? AND LINE_ITEM_NUMBER = ?`, [PO_NUMBER, LINE_ITEM_NUMBER]);
  });
  
  // ============ GOODS_RECEIPTS ============
  this.on('READ', 'GOODS_RECEIPTS', async (req) => {
    return await db.run('SELECT * FROM "PROCURE_TO_PAY"."GOODS_RECEIPTS"');
  });
  
  this.on('CREATE', 'GOODS_RECEIPTS', async (req) => {
    const { GR_NUMBER, PO_NUMBER, GR_DATE, RECEIVED_BY, STATUS } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."GOODS_RECEIPTS" VALUES (?, ?, ?, ?, ?)`,
      [GR_NUMBER, PO_NUMBER, GR_DATE, RECEIVED_BY, STATUS]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'GOODS_RECEIPTS', async (req) => {
    const { GR_NUMBER, PO_NUMBER, GR_DATE, RECEIVED_BY, STATUS } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."GOODS_RECEIPTS" SET PO_NUMBER = ?, GR_DATE = ?, RECEIVED_BY = ?, STATUS = ? WHERE GR_NUMBER = ?`,
      [PO_NUMBER, GR_DATE, RECEIVED_BY, STATUS, GR_NUMBER]
    );
    return req.data;
  });
  
  this.on('DELETE', 'GOODS_RECEIPTS', async (req) => {
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."GOODS_RECEIPTS" WHERE GR_NUMBER = ?`, [req.data.GR_NUMBER]);
  });
  
  // ============ GR_LINE_ITEMS ============
  this.on('READ', 'GR_LINE_ITEMS', async (req) => {
    return await db.run('SELECT * FROM "PROCURE_TO_PAY"."GR_LINE_ITEMS"');
  });
  
  this.on('CREATE', 'GR_LINE_ITEMS', async (req) => {
    const { GR_NUMBER, LINE_NUMBER, PO_LINE_NUMBER, MATERIAL_CODE, QUANTITY_RECEIVED, QUANTITY_ACCEPTED, QUANTITY_REJECTED } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."GR_LINE_ITEMS" VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [GR_NUMBER, LINE_NUMBER, PO_LINE_NUMBER, MATERIAL_CODE, QUANTITY_RECEIVED, QUANTITY_ACCEPTED, QUANTITY_REJECTED]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'GR_LINE_ITEMS', async (req) => {
    const { GR_NUMBER, LINE_NUMBER, PO_LINE_NUMBER, MATERIAL_CODE, QUANTITY_RECEIVED, QUANTITY_ACCEPTED, QUANTITY_REJECTED } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."GR_LINE_ITEMS" SET PO_LINE_NUMBER = ?, MATERIAL_CODE = ?, QUANTITY_RECEIVED = ?, QUANTITY_ACCEPTED = ?, QUANTITY_REJECTED = ? WHERE GR_NUMBER = ? AND LINE_NUMBER = ?`,
      [PO_LINE_NUMBER, MATERIAL_CODE, QUANTITY_RECEIVED, QUANTITY_ACCEPTED, QUANTITY_REJECTED, GR_NUMBER, LINE_NUMBER]
    );
    return req.data;
  });
  
  this.on('DELETE', 'GR_LINE_ITEMS', async (req) => {
    const { GR_NUMBER, LINE_NUMBER } = req.data;
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."GR_LINE_ITEMS" WHERE GR_NUMBER = ? AND LINE_NUMBER = ?`, [GR_NUMBER, LINE_NUMBER]);
  });
  
  // ============ VENDOR_INVOICES ============
  this.on('READ', 'VENDOR_INVOICES', async (req) => {
    return await db.run('SELECT * FROM "PROCURE_TO_PAY"."VENDOR_INVOICES"');
  });
  
  this.on('CREATE', 'VENDOR_INVOICES', async (req) => {
    const { INVOICE_ID, VENDOR_ID, PO_NUMBER, INVOICE_DATE, INVOICE_AMOUNT, CURRENCY, MATCH_STATUS, CREATED_AT } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."VENDOR_INVOICES" VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [INVOICE_ID, VENDOR_ID, PO_NUMBER, INVOICE_DATE, INVOICE_AMOUNT, CURRENCY, MATCH_STATUS, CREATED_AT]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'VENDOR_INVOICES', async (req) => {
    const { INVOICE_ID, VENDOR_ID, PO_NUMBER, INVOICE_DATE, INVOICE_AMOUNT, CURRENCY, MATCH_STATUS, CREATED_AT } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."VENDOR_INVOICES" SET VENDOR_ID = ?, PO_NUMBER = ?, INVOICE_DATE = ?, INVOICE_AMOUNT = ?, CURRENCY = ?, MATCH_STATUS = ?, CREATED_AT = ? WHERE INVOICE_ID = ?`,
      [VENDOR_ID, PO_NUMBER, INVOICE_DATE, INVOICE_AMOUNT, CURRENCY, MATCH_STATUS, CREATED_AT, INVOICE_ID]
    );
    return req.data;
  });
  
  this.on('DELETE', 'VENDOR_INVOICES', async (req) => {
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."VENDOR_INVOICES" WHERE INVOICE_ID = ?`, [req.data.INVOICE_ID]);
  });
  
  // ============ INVOICE_LINE_ITEMS ============
  this.on('READ', 'INVOICE_LINE_ITEMS', async (req) => {
    return await db.run('SELECT * FROM "PROCURE_TO_PAY"."INVOICE_LINE_ITEMS"');
  });
  
  this.on('CREATE', 'INVOICE_LINE_ITEMS', async (req) => {
    const { INVOICE_ID, LINE_NUMBER, MATERIAL_CODE, DESCRIPTION, QUANTITY, UNIT_PRICE, TOTAL_PRICE, MATCHED_PO_LINE } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."INVOICE_LINE_ITEMS" VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [INVOICE_ID, LINE_NUMBER, MATERIAL_CODE, DESCRIPTION, QUANTITY, UNIT_PRICE, TOTAL_PRICE, MATCHED_PO_LINE]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'INVOICE_LINE_ITEMS', async (req) => {
    const { INVOICE_ID, LINE_NUMBER, MATERIAL_CODE, DESCRIPTION, QUANTITY, UNIT_PRICE, TOTAL_PRICE, MATCHED_PO_LINE } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."INVOICE_LINE_ITEMS" SET MATERIAL_CODE = ?, DESCRIPTION = ?, QUANTITY = ?, UNIT_PRICE = ?, TOTAL_PRICE = ?, MATCHED_PO_LINE = ? WHERE INVOICE_ID = ? AND LINE_NUMBER = ?`,
      [MATERIAL_CODE, DESCRIPTION, QUANTITY, UNIT_PRICE, TOTAL_PRICE, MATCHED_PO_LINE, INVOICE_ID, LINE_NUMBER]
    );
    return req.data;
  });
  
  this.on('DELETE', 'INVOICE_LINE_ITEMS', async (req) => {
    const { INVOICE_ID, LINE_NUMBER } = req.data;
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."INVOICE_LINE_ITEMS" WHERE INVOICE_ID = ? AND LINE_NUMBER = ?`, [INVOICE_ID, LINE_NUMBER]);
  });
});