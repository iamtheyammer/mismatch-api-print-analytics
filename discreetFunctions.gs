function apiCall(url) {
  Logger.log('Attempting an API call to ' + url + '.');
  var options = {'contentType':'application/json', 'method':'GET'};
  var response = UrlFetchApp.fetch(url, options); //actual api call
  Logger.log('API call succeeded. Parsing responses.');
  var stringResponse = response.getContentText();
  var jsonResponse = JSON.parse(stringResponse); //parses response as json
  Logger.log('Completed API call to ' + url + '.');
  return {'jsonResponse':jsonResponse, 'stringResponse':stringResponse};
}

function getUserInfo() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('User data');
  
  var range = sheet.getRange('A2'); //grabs app ID
  var appId = range.getDisplayValue();
  
  var range = sheet.getRange('B2'); //grabs analytics report URL
  var analyticsReportUrl = range.getDisplayValue();
  
  var range = sheet.getRange('C2'); //grabs error report URL
  var errorReportUrl = range.getDisplayValue();
 
  return {'appId':appId,'analyticsReportUrl':analyticsReportUrl,'errorReportUrl':errorReportUrl};
}
