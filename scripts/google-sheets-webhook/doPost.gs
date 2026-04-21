/**
 * Google Apps Script — Web App `doPost` for contact / lead ingestion.
 * Deploy as Web app (Execute as: Me, Who has access: as needed).
 *
 * Verification (manual in Apps Script / Sheet):
 * - Empty sheet: first POST creates Timestamp + JSON keys; row 2 has data.
 * - Existing headers: new JSON keys append as new columns.
 * - A1 not "Timestamp": first request inserts column A and migrates.
 * - "Status" header: dropdown + value from JSON status or Pending.
 */

var STATUS_ALLOWED_ = {
  Pending: true,
  'In Progress': true,
  Completed: true,
  Cancelled: true,
};

function doPost(e) {
  try {
    if (!e || !e.postData || typeof e.postData.contents === 'undefined') {
      return jsonResponse_({ success: false, error: 'Missing POST body' });
    }

    var data = JSON.parse(e.postData.contents);
    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
      return jsonResponse_({
        success: false,
        error: 'JSON must be a flat object',
      });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var headers = [];
    var headersChanged = false;

    if (sheet.getLastRow() === 0 || readHeadersFromSheet_(sheet).length === 0) {
      headers = buildInitialHeaders_(data);
      headersChanged = true;
    } else {
      headers = readHeadersFromSheet_(sheet);
      if (String(headers[0]).toLowerCase() !== 'timestamp') {
        sheet.insertColumnBefore(1);
        headers = ['Timestamp'].concat(headers);
        headersChanged = true;
      }
      var merged = mergeJsonKeysIntoHeaders_(headers, data);
      headersChanged = headersChanged || !headersArraysEqual_(headers, merged);
      headers = merged;
    }

    if (headersChanged) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }

    var rowData = buildRowFromHeaders_(headers, data);
    var lastRow = sheet.getLastRow();
    var newRow = lastRow + 1;

    sheet.getRange(newRow, 1, 1, headers.length).setValues([rowData]);

    if (newRow > 2) {
      var previousRowRange = sheet.getRange(newRow - 1, 1, 1, headers.length);
      previousRowRange.copyFormatToRange(
        sheet,
        1,
        headers.length,
        newRow,
        newRow
      );
    }

    var newRowRange = sheet.getRange(newRow, 1, 1, headers.length);
    if (newRow % 2 === 0) {
      newRowRange.setBackground(null);
    } else {
      newRowRange.setBackground('#f3f3f3');
    }

    applyStatusValidation_(sheet, headers, newRow, data);

    return jsonResponse_({ success: true });
  } catch (error) {
    return jsonResponse_({ success: false, error: error.toString() });
  }
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function trimTrailingEmptyHeaders_(row) {
  var i = row.length;
  while (
    i > 0 &&
    (row[i - 1] === '' ||
      row[i - 1] === null ||
      row[i - 1] === undefined ||
      String(row[i - 1]).trim() === '')
  ) {
    i--;
  }
  var out = [];
  for (var j = 0; j < i; j++) {
    out.push(
      row[j] === null || row[j] === undefined ? '' : String(row[j]).trim()
    );
  }
  return out;
}

function readHeadersFromSheet_(sheet) {
  var lastCol = sheet.getLastColumn();
  if (lastCol < 1) return [];
  var row = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  return trimTrailingEmptyHeaders_(row);
}

function headersInclude_CI_(headers, key) {
  var lk = String(key).toLowerCase();
  for (var i = 0; i < headers.length; i++) {
    if (String(headers[i]).toLowerCase() === lk) return true;
  }
  return false;
}

function findHeaderIndex_CI_(headers, name) {
  var ln = String(name).toLowerCase();
  for (var i = 0; i < headers.length; i++) {
    if (String(headers[i]).toLowerCase() === ln) return i;
  }
  return -1;
}

function headersArraysEqual_(a, b) {
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function buildInitialHeaders_(data) {
  var h = ['Timestamp'];
  var keys = Object.keys(data);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    if (String(k).toLowerCase() === 'timestamp') continue;
    if (!headersInclude_CI_(h, k)) h.push(k);
  }
  return h;
}

function mergeJsonKeysIntoHeaders_(headers, data) {
  var out = headers.slice();
  var keys = Object.keys(data);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    if (String(k).toLowerCase() === 'timestamp') continue;
    if (!headersInclude_CI_(out, k)) out.push(k);
  }
  return out;
}

function getDataValue_CI_(data, headerName) {
  var keys = Object.keys(data);
  var lh = String(headerName).toLowerCase();
  for (var i = 0; i < keys.length; i++) {
    if (String(keys[i]).toLowerCase() === lh) return data[keys[i]];
  }
  return '';
}

function buildRowFromHeaders_(headers, data) {
  return headers.map(function (header) {
    var hn = String(header);
    if (hn.toLowerCase() === 'timestamp') {
      var ts = getDataValue_CI_(data, 'timestamp');
      if (ts !== '' && ts !== null && typeof ts !== 'undefined') {
        if (ts instanceof Date) return ts;
        return ts;
      }
      return new Date();
    }
    var v = getDataValue_CI_(data, hn);
    if (v === null || typeof v === 'undefined') return '';
    if (typeof v === 'object' && !(v instanceof Date)) return '';
    if (v instanceof Date) return v;
    return String(v);
  });
}

function applyStatusValidation_(sheet, headers, newRow, data) {
  var idx = findHeaderIndex_CI_(headers, 'Status');
  if (idx < 0) return;

  var statusCol = idx + 1;
  var statusCell = sheet.getRange(newRow, statusCol);
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(
      ['Pending', 'In Progress', 'Completed', 'Cancelled'],
      true
    )
    .setAllowInvalid(false)
    .setHelpText('Select a status')
    .build();
  statusCell.setDataValidation(rule);

  var raw = getDataValue_CI_(data, 'status');
  var s =
    raw !== null && typeof raw !== 'undefined' && String(raw).trim() !== ''
      ? String(raw).trim()
      : 'Pending';
  if (!STATUS_ALLOWED_[s]) s = 'Pending';
  statusCell.setValue(s);
}
