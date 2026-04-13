// ============================================================
//  GOOGLE APPS SCRIPT — paste this into your Google Sheet
//  (Extensions > Apps Script > paste > Deploy as Web App)
// ============================================================
//
//  SETUP INSTRUCTIONS:
//  1. Go to https://sheets.google.com and create a new blank spreadsheet
//  2. Name it "Electrical Exam Responses" (or whatever you like)
//  3. Click Extensions > Apps Script
//  4. Delete any code in the editor and paste ALL of this code
//  5. Click the floppy disk icon to save
//  6. Click Deploy > New Deployment
//  7. Select type: "Web app"
//  8. Set "Execute as" to: Me
//  9. Set "Who has access" to: Anyone
// 10. Click Deploy, then Authorize (allow the permissions)
// 11. Copy the Web App URL it gives you
// 12. Paste that URL into your exam's index.html where it says:
//     const GOOGLE_SCRIPT_URL = "PASTE_YOUR_URL_HERE";
//
// ============================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Create headers on first submission
    if (sheet.getLastRow() === 0) {
      var headers = ["Timestamp", "Name", "Date"];
      for (var i = 0; i < data.answers.length; i++) {
        headers.push("Q" + data.answers[i].q + " (" + data.answers[i].marks + "mk)");
      }
      sheet.appendRow(headers);

      // Bold the header row
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Build the data row
    var row = [
      new Date().toLocaleString("en-GB"),
      data.name,
      data.date
    ];

    for (var j = 0; j < data.answers.length; j++) {
      row.push(data.answers[j].answer);
    }

    sheet.appendRow(row);

    // Auto-resize columns for readability
    try {
      sheet.autoResizeColumns(1, row.length);
    } catch(err) {}

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("Electrical Exam API is running. Use POST to submit answers.")
    .setMimeType(ContentService.MimeType.TEXT);
}
