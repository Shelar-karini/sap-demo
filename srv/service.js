const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
  const db = await cds.connect.to('db');
  
  // ============ VENDORS ============
  this.on('READ', 'vendors', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."VENDORS"');
    return result.map(row => ({
      vendorid: row.VENDOR_ID,
      vendorname: row.VENDOR_NAME,
      email: row.EMAIL,
      taxid: row.TAX_ID
    }));
  });
  
  this.on('CREATE', 'vendors', async (req) => {
    const { vendorid, vendorname, email, taxid } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."VENDORS" VALUES (?, ?, ?, ?)`,
      [vendorid, vendorname, email, taxid]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'vendors', async (req) => {
    const { vendorid, vendorname, email, taxid } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."VENDORS" SET VENDOR_NAME = ?, EMAIL = ?, TAX_ID = ? WHERE VENDOR_ID = ?`,
      [vendorname, email, taxid, vendorid]
    );
    return req.data;
  });
  
  this.on('DELETE', 'vendors', async (req) => {
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."VENDORS" WHERE VENDOR_ID = ?`, [req.data.vendorid]);
  });
  
  // ============ MATERIALS ============
  this.on('READ', 'materials', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."MATERIALS"');
    return result.map(row => ({
      materialcode: row.MATERIAL_CODE,
      description: row.DESCRIPTION,
      materialgroup: row.MATERIAL_GROUP,
      materialtype: row.MATERIAL_TYPE,
      unitofmeasure: row.UNIT_OF_MEASURE
    }));
  });
  
  this.on('CREATE', 'materials', async (req) => {
    const { materialcode, description, materialgroup, materialtype, unitofmeasure } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."MATERIALS" VALUES (?, ?, ?, ?, ?)`,
      [materialcode, description, materialgroup, materialtype, unitofmeasure]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'materials', async (req) => {
    const { materialcode, description, materialgroup, materialtype, unitofmeasure } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."MATERIALS" SET DESCRIPTION = ?, MATERIAL_GROUP = ?, MATERIAL_TYPE = ?, UNIT_OF_MEASURE = ? WHERE MATERIAL_CODE = ?`,
      [description, materialgroup, materialtype, unitofmeasure, materialcode]
    );
    return req.data;
  });
  
  this.on('DELETE', 'materials', async (req) => {
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."MATERIALS" WHERE MATERIAL_CODE = ?`, [req.data.materialcode]);
  });
  
  // ============ PURCHASE_ORDERS ============
  this.on('READ', 'purchaseorders', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."PURCHASE_ORDERS"');
    return result.map(row => ({
      ponumber: row.PO_NUMBER,
      vendorid: row.VENDOR_ID,
      podate: row.PO_DATE,
      totalamount: row.TOTAL_AMOUNT,
      currency: row.CURRENCY,
      status: row.STATUS
    }));
  });
  
  this.on('CREATE', 'purchaseorders', async (req) => {
    const { ponumber, vendorid, podate, totalamount, currency, status } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."PURCHASE_ORDERS" VALUES (?, ?, ?, ?, ?, ?)`,
      [ponumber, vendorid, podate, totalamount, currency, status]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'purchaseorders', async (req) => {
    const { ponumber, vendorid, podate, totalamount, currency, status } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."PURCHASE_ORDERS" SET VENDOR_ID = ?, PO_DATE = ?, TOTAL_AMOUNT = ?, CURRENCY = ?, STATUS = ? WHERE PO_NUMBER = ?`,
      [vendorid, podate, totalamount, currency, status, ponumber]
    );
    return req.data;
  });
  
  this.on('DELETE', 'purchaseorders', async (req) => {
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."PURCHASE_ORDERS" WHERE PO_NUMBER = ?`, [req.data.ponumber]);
  });
  
  // ============ POLINES ============
  this.on('READ', 'polines', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."PO_LINE_ITEMS"');
    return result.map(row => ({
      ponumber: row.PO_NUMBER,
      lineitemnumber: row.LINE_ITEM_NUMBER,
      materialcode: row.MATERIAL_CODE,
      quantity: row.QUANTITY,
      unitprice: row.UNIT_PRICE,
      totalprice: row.TOTAL_PRICE
    }));
  });
  
  this.on('CREATE', 'polines', async (req) => {
    const { ponumber, lineitemnumber, materialcode, quantity, unitprice, totalprice } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."PO_LINE_ITEMS" VALUES (?, ?, ?, ?, ?, ?)`,
      [ponumber, lineitemnumber, materialcode, quantity, unitprice, totalprice]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'polines', async (req) => {
    const { ponumber, lineitemnumber, materialcode, quantity, unitprice, totalprice } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."PO_LINE_ITEMS" SET MATERIAL_CODE = ?, QUANTITY = ?, UNIT_PRICE = ?, TOTAL_PRICE = ? WHERE PO_NUMBER = ? AND LINE_ITEM_NUMBER = ?`,
      [materialcode, quantity, unitprice, totalprice, ponumber, lineitemnumber]
    );
    return req.data;
  });
  
  this.on('DELETE', 'polines', async (req) => {
    const { ponumber, lineitemnumber } = req.data;
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."PO_LINE_ITEMS" WHERE PO_NUMBER = ? AND LINE_ITEM_NUMBER = ?`, [ponumber, lineitemnumber]);
  });
  
  // ============ GOODS_RECEIPTS ============
  this.on('READ', 'goodsreceipts', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."GOODS_RECEIPTS"');
    return result.map(row => ({
      grnumber: row.GR_NUMBER,
      ponumber: row.PO_NUMBER,
      grdate: row.GR_DATE,
      receivedby: row.RECEIVED_BY,
      status: row.STATUS
    }));
  });
  
  this.on('CREATE', 'goodsreceipts', async (req) => {
    const { grnumber, ponumber, grdate, receivedby, status } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."GOODS_RECEIPTS" VALUES (?, ?, ?, ?, ?)`,
      [grnumber, ponumber, grdate, receivedby, status]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'goodsreceipts', async (req) => {
    const { grnumber, ponumber, grdate, receivedby, status } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."GOODS_RECEIPTS" SET PO_NUMBER = ?, GR_DATE = ?, RECEIVED_BY = ?, STATUS = ? WHERE GR_NUMBER = ?`,
      [ponumber, grdate, receivedby, status, grnumber]
    );
    return req.data;
  });
  
  this.on('DELETE', 'goodsreceipts', async (req) => {
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."GOODS_RECEIPTS" WHERE GR_NUMBER = ?`, [req.data.grnumber]);
  });
  
  // ============ GRLINES ============
  this.on('READ', 'grlines', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."GR_LINE_ITEMS"');
    return result.map(row => ({
      grnumber: row.GR_NUMBER,
      linenumber: row.LINE_NUMBER,
      polinenumber: row.PO_LINE_NUMBER,
      materialcode: row.MATERIAL_CODE,
      quantityreceived: row.QUANTITY_RECEIVED,
      quantityaccepted: row.QUANTITY_ACCEPTED,
      quantityrejected: row.QUANTITY_REJECTED
    }));
  });
  
  this.on('CREATE', 'grlines', async (req) => {
    const { grnumber, linenumber, polinenumber, materialcode, quantityreceived, quantityaccepted, quantityrejected } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."GR_LINE_ITEMS" VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [grnumber, linenumber, polinenumber, materialcode, quantityreceived, quantityaccepted, quantityrejected]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'grlines', async (req) => {
    const { grnumber, linenumber, polinenumber, materialcode, quantityreceived, quantityaccepted, quantityrejected } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."GR_LINE_ITEMS" SET PO_LINE_NUMBER = ?, MATERIAL_CODE = ?, QUANTITY_RECEIVED = ?, QUANTITY_ACCEPTED = ?, QUANTITY_REJECTED = ? WHERE GR_NUMBER = ? AND LINE_NUMBER = ?`,
      [polinenumber, materialcode, quantityreceived, quantityaccepted, quantityrejected, grnumber, linenumber]
    );
    return req.data;
  });
  
  this.on('DELETE', 'grlines', async (req) => {
    const { grnumber, linenumber } = req.data;
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."GR_LINE_ITEMS" WHERE GR_NUMBER = ? AND LINE_NUMBER = ?`, [grnumber, linenumber]);
  });
  
  // ============ VENDOR_INVOICES ============
  this.on('READ', 'vendorinvoices', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."VENDOR_INVOICES"');
    return result.map(row => ({
      invoiceid: row.INVOICE_ID,
      vendorid: row.VENDOR_ID,
      ponumber: row.PO_NUMBER,
      invoicedate: row.INVOICE_DATE,
      invoiceamount: row.INVOICE_AMOUNT,
      currency: row.CURRENCY,
      matchstatus: row.MATCH_STATUS,
      createdat: row.CREATED_AT
    }));
  });
  
  this.on('CREATE', 'vendorinvoices', async (req) => {
    const { invoiceid, vendorid, ponumber, invoicedate, invoiceamount, currency, matchstatus, createdat } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."VENDOR_INVOICES" VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [invoiceid, vendorid, ponumber, invoicedate, invoiceamount, currency, matchstatus, createdat]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'vendorinvoices', async (req) => {
    const { invoiceid, vendorid, ponumber, invoicedate, invoiceamount, currency, matchstatus, createdat } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."VENDOR_INVOICES" SET VENDOR_ID = ?, PO_NUMBER = ?, INVOICE_DATE = ?, INVOICE_AMOUNT = ?, CURRENCY = ?, MATCH_STATUS = ?, CREATED_AT = ? WHERE INVOICE_ID = ?`,
      [vendorid, ponumber, invoicedate, invoiceamount, currency, matchstatus, createdat, invoiceid]
    );
    return req.data;
  });
  
  this.on('DELETE', 'vendorinvoices', async (req) => {
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."VENDOR_INVOICES" WHERE INVOICE_ID = ?`, [req.data.invoiceid]);
  });
  
  // ============ INVOICE_LINE_ITEMS ============
  this.on('READ', 'invoicelineitems', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."INVOICE_LINE_ITEMS"');
    return result.map(row => ({
      invoiceid: row.INVOICE_ID,
      linenumber: row.LINE_NUMBER,
      materialcode: row.MATERIAL_CODE,
      description: row.DESCRIPTION,
      quantity: row.QUANTITY,
      unitprice: row.UNIT_PRICE,
      totalprice: row.TOTAL_PRICE,
      matchedpoline: row.MATCHED_PO_LINE
    }));
  });
  
  this.on('CREATE', 'invoicelineitems', async (req) => {
    const { invoiceid, linenumber, materialcode, description, quantity, unitprice, totalprice, matchedpoline } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."INVOICE_LINE_ITEMS" VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [invoiceid, linenumber, materialcode, description, quantity, unitprice, totalprice, matchedpoline]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'invoicelineitems', async (req) => {
    const { invoiceid, linenumber, materialcode, description, quantity, unitprice, totalprice, matchedpoline } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."INVOICE_LINE_ITEMS" SET MATERIAL_CODE = ?, DESCRIPTION = ?, QUANTITY = ?, UNIT_PRICE = ?, TOTAL_PRICE = ?, MATCHED_PO_LINE = ? WHERE INVOICE_ID = ? AND LINE_NUMBER = ?`,
      [materialcode, description, quantity, unitprice, totalprice, matchedpoline, invoiceid, linenumber]
    );
    return req.data;
  });
  
  this.on('DELETE', 'invoicelineitems', async (req) => {
    const { invoiceid, linenumber } = req.data;
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."INVOICE_LINE_ITEMS" WHERE INVOICE_ID = ? AND LINE_NUMBER = ?`, [invoiceid, linenumber]);
  });
});