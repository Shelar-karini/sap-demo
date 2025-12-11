const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
  const db = await cds.connect.to('db');
  
  // ============ VENDORS ============
  this.on('READ', 'Vendors', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."VENDORS"');
    return result.map(row => ({
      VendorId: row.VENDOR_ID,
      VendorName: row.VENDOR_NAME,
      Email: row.EMAIL,
      TaxId: row.TAX_ID
    }));
  });
  
  this.on('CREATE', 'Vendors', async (req) => {
    const { VendorId, VendorName, Email, TaxId } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."VENDORS" VALUES (?, ?, ?, ?)`,
      [VendorId, VendorName, Email, TaxId]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'Vendors', async (req) => {
    const { VendorId, VendorName, Email, TaxId } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."VENDORS" SET VENDOR_NAME = ?, EMAIL = ?, TAX_ID = ? WHERE VENDOR_ID = ?`,
      [VendorName, Email, TaxId, VendorId]
    );
    return req.data;
  });
  
  this.on('DELETE', 'Vendors', async (req) => {
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."VENDORS" WHERE VENDOR_ID = ?`, [req.data.VendorId]);
  });
  
  // ============ MATERIALS ============
  this.on('READ', 'Materials', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."MATERIALS"');
    return result.map(row => ({
      MaterialCode: row.MATERIAL_CODE,
      Description: row.DESCRIPTION,
      MaterialGroup: row.MATERIAL_GROUP,
      MaterialType: row.MATERIAL_TYPE,
      UnitOfMeasure: row.UNIT_OF_MEASURE
    }));
  });
  
  this.on('CREATE', 'Materials', async (req) => {
    const { MaterialCode, Description, MaterialGroup, MaterialType, UnitOfMeasure } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."MATERIALS" VALUES (?, ?, ?, ?, ?)`,
      [MaterialCode, Description, MaterialGroup, MaterialType, UnitOfMeasure]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'Materials', async (req) => {
    const { MaterialCode, Description, MaterialGroup, MaterialType, UnitOfMeasure } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."MATERIALS" SET DESCRIPTION = ?, MATERIAL_GROUP = ?, MATERIAL_TYPE = ?, UNIT_OF_MEASURE = ? WHERE MATERIAL_CODE = ?`,
      [Description, MaterialGroup, MaterialType, UnitOfMeasure, MaterialCode]
    );
    return req.data;
  });
  
  this.on('DELETE', 'Materials', async (req) => {
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."MATERIALS" WHERE MATERIAL_CODE = ?`, [req.data.MaterialCode]);
  });
  
  // ============ PURCHASE_ORDERS ============
  this.on('READ', 'PurchaseOrders', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."PURCHASE_ORDERS"');
    return result.map(row => ({
      PoNumber: row.PO_NUMBER,
      VendorId: row.VENDOR_ID,
      PoDate: row.PO_DATE,
      TotalAmount: row.TOTAL_AMOUNT,
      Currency: row.CURRENCY,
      Status: row.STATUS
    }));
  });
  
  this.on('CREATE', 'PurchaseOrders', async (req) => {
    const { PoNumber, VendorId, PoDate, TotalAmount, Currency, Status } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."PURCHASE_ORDERS" VALUES (?, ?, ?, ?, ?, ?)`,
      [PoNumber, VendorId, PoDate, TotalAmount, Currency, Status]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'PurchaseOrders', async (req) => {
    const { PoNumber, VendorId, PoDate, TotalAmount, Currency, Status } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."PURCHASE_ORDERS" SET VENDOR_ID = ?, PO_DATE = ?, TOTAL_AMOUNT = ?, CURRENCY = ?, STATUS = ? WHERE PO_NUMBER = ?`,
      [VendorId, PoDate, TotalAmount, Currency, Status, PoNumber]
    );
    return req.data;
  });
  
  this.on('DELETE', 'PurchaseOrders', async (req) => {
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."PURCHASE_ORDERS" WHERE PO_NUMBER = ?`, [req.data.PoNumber]);
  });
  
  // ============ POLines ============
  this.on('READ', 'POLines', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."PO_LINE_ITEMS"');
    return result.map(row => ({
      PoNumber: row.PO_NUMBER,
      LineItemNumber: row.LINE_ITEM_NUMBER,
      MaterialCode: row.MATERIAL_CODE,
      Quantity: row.QUANTITY,
      UnitPrice: row.UNIT_PRICE,
      TotalPrice: row.TOTAL_PRICE
    }));
  });
  
  this.on('CREATE', 'POLines', async (req) => {
    const { PoNumber, LineItemNumber, MaterialCode, Quantity, UnitPrice, TotalPrice } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."PO_LINE_ITEMS" VALUES (?, ?, ?, ?, ?, ?)`,
      [PoNumber, LineItemNumber, MaterialCode, Quantity, UnitPrice, TotalPrice]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'POLines', async (req) => {
    const { PoNumber, LineItemNumber, MaterialCode, Quantity, UnitPrice, TotalPrice } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."PO_LINE_ITEMS" SET MATERIAL_CODE = ?, QUANTITY = ?, UNIT_PRICE = ?, TOTAL_PRICE = ? WHERE PO_NUMBER = ? AND LINE_ITEM_NUMBER = ?`,
      [MaterialCode, Quantity, UnitPrice, TotalPrice, PoNumber, LineItemNumber]
    );
    return req.data;
  });
  
  this.on('DELETE', 'POLines', async (req) => {
    const { PoNumber, LineItemNumber } = req.data;
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."PO_LINE_ITEMS" WHERE PO_NUMBER = ? AND LINE_ITEM_NUMBER = ?`, [PoNumber, LineItemNumber]);
  });
  
  // ============ GOODS_RECEIPTS ============
  this.on('READ', 'GoodsReceipts', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."GOODS_RECEIPTS"');
    return result.map(row => ({
      GrNumber: row.GR_NUMBER,
      PoNumber: row.PO_NUMBER,
      GrDate: row.GR_DATE,
      ReceivedBy: row.RECEIVED_BY,
      Status: row.STATUS
    }));
  });
  
  this.on('CREATE', 'GoodsReceipts', async (req) => {
    const { GrNumber, PoNumber, GrDate, ReceivedBy, Status } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."GOODS_RECEIPTS" VALUES (?, ?, ?, ?, ?)`,
      [GrNumber, PoNumber, GrDate, ReceivedBy, Status]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'GoodsReceipts', async (req) => {
    const { GrNumber, PoNumber, GrDate, ReceivedBy, Status } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."GOODS_RECEIPTS" SET PO_NUMBER = ?, GR_DATE = ?, RECEIVED_BY = ?, STATUS = ? WHERE GR_NUMBER = ?`,
      [PoNumber, GrDate, ReceivedBy, Status, GrNumber]
    );
    return req.data;
  });
  
  this.on('DELETE', 'GoodsReceipts', async (req) => {
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."GOODS_RECEIPTS" WHERE GR_NUMBER = ?`, [req.data.GrNumber]);
  });
  
  // ============ GRLines ============
  this.on('READ', 'GRLines', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."GR_LINE_ITEMS"');
    return result.map(row => ({
      GrNumber: row.GR_NUMBER,
      LineNumber: row.LINE_NUMBER,
      PoLineNumber: row.PO_LINE_NUMBER,
      MaterialCode: row.MATERIAL_CODE,
      QuantityReceived: row.QUANTITY_RECEIVED,
      QuantityAccepted: row.QUANTITY_ACCEPTED,
      QuantityRejected: row.QUANTITY_REJECTED
    }));
  });
  
  this.on('CREATE', 'GRLines', async (req) => {
    const { GrNumber, LineNumber, PoLineNumber, MaterialCode, QuantityReceived, QuantityAccepted, QuantityRejected } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."GR_LINE_ITEMS" VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [GrNumber, LineNumber, PoLineNumber, MaterialCode, QuantityReceived, QuantityAccepted, QuantityRejected]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'GRLines', async (req) => {
    const { GrNumber, LineNumber, PoLineNumber, MaterialCode, QuantityReceived, QuantityAccepted, QuantityRejected } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."GR_LINE_ITEMS" SET PO_LINE_NUMBER = ?, MATERIAL_CODE = ?, QUANTITY_RECEIVED = ?, QUANTITY_ACCEPTED = ?, QUANTITY_REJECTED = ? WHERE GR_NUMBER = ? AND LINE_NUMBER = ?`,
      [PoLineNumber, MaterialCode, QuantityReceived, QuantityAccepted, QuantityRejected, GrNumber, LineNumber]
    );
    return req.data;
  });
  
  this.on('DELETE', 'GRLines', async (req) => {
    const { GrNumber, LineNumber } = req.data;
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."GR_LINE_ITEMS" WHERE GR_NUMBER = ? AND LINE_NUMBER = ?`, [GrNumber, LineNumber]);
  });
  
  // ============ VENDOR_INVOICES ============
  this.on('READ', 'VendorInvoices', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."VENDOR_INVOICES"');
    return result.map(row => ({
      InvoiceId: row.INVOICE_ID,
      VendorId: row.VENDOR_ID,
      PoNumber: row.PO_NUMBER,
      InvoiceDate: row.INVOICE_DATE,
      InvoiceAmount: row.INVOICE_AMOUNT,
      Currency: row.CURRENCY,
      MatchStatus: row.MATCH_STATUS,
      CreatedAt: row.CREATED_AT
    }));
  });
  
  this.on('CREATE', 'VendorInvoices', async (req) => {
    const { InvoiceId, VendorId, PoNumber, InvoiceDate, InvoiceAmount, Currency, MatchStatus, CreatedAt } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."VENDOR_INVOICES" VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [InvoiceId, VendorId, PoNumber, InvoiceDate, InvoiceAmount, Currency, MatchStatus, CreatedAt]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'VendorInvoices', async (req) => {
    const { InvoiceId, VendorId, PoNumber, InvoiceDate, InvoiceAmount, Currency, MatchStatus, CreatedAt } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."VENDOR_INVOICES" SET VENDOR_ID = ?, PO_NUMBER = ?, INVOICE_DATE = ?, INVOICE_AMOUNT = ?, CURRENCY = ?, MATCH_STATUS = ?, CREATED_AT = ? WHERE INVOICE_ID = ?`,
      [VendorId, PoNumber, InvoiceDate, InvoiceAmount, Currency, MatchStatus, CreatedAt, InvoiceId]
    );
    return req.data;
  });
  
  this.on('DELETE', 'VendorInvoices', async (req) => {
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."VENDOR_INVOICES" WHERE INVOICE_ID = ?`, [req.data.InvoiceId]);
  });
  
  // ============ INVOICE_LINE_ITEMS ============
  this.on('READ', 'InvoiceLineItems', async (req) => {
    const result = await db.run('SELECT * FROM "PROCURE_TO_PAY"."INVOICE_LINE_ITEMS"');
    return result.map(row => ({
      InvoiceId: row.INVOICE_ID,
      LineNumber: row.LINE_NUMBER,
      MaterialCode: row.MATERIAL_CODE,
      Description: row.DESCRIPTION,
      Quantity: row.QUANTITY,
      UnitPrice: row.UNIT_PRICE,
      TotalPrice: row.TOTAL_PRICE,
      MatchedPoLine: row.MATCHED_PO_LINE
    }));
  });
  
  this.on('CREATE', 'InvoiceLineItems', async (req) => {
    const { InvoiceId, LineNumber, MaterialCode, Description, Quantity, UnitPrice, TotalPrice, MatchedPoLine } = req.data;
    await db.run(
      `INSERT INTO "PROCURE_TO_PAY"."INVOICE_LINE_ITEMS" VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [InvoiceId, LineNumber, MaterialCode, Description, Quantity, UnitPrice, TotalPrice, MatchedPoLine]
    );
    return req.data;
  });
  
  this.on('UPDATE', 'InvoiceLineItems', async (req) => {
    const { InvoiceId, LineNumber, MaterialCode, Description, Quantity, UnitPrice, TotalPrice, MatchedPoLine } = req.data;
    await db.run(
      `UPDATE "PROCURE_TO_PAY"."INVOICE_LINE_ITEMS" SET MATERIAL_CODE = ?, DESCRIPTION = ?, QUANTITY = ?, UNIT_PRICE = ?, TOTAL_PRICE = ?, MATCHED_PO_LINE = ? WHERE INVOICE_ID = ? AND LINE_NUMBER = ?`,
      [MaterialCode, Description, Quantity, UnitPrice, TotalPrice, MatchedPoLine, InvoiceId, LineNumber]
    );
    return req.data;
  });
  
  this.on('DELETE', 'InvoiceLineItems', async (req) => {
    const { InvoiceId, LineNumber } = req.data;
    await db.run(`DELETE FROM "PROCURE_TO_PAY"."INVOICE_LINE_ITEMS" WHERE INVOICE_ID = ? AND LINE_NUMBER = ?`, [InvoiceId, LineNumber]);
  });
});