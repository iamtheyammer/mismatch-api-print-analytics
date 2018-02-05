function onOpen(e) { //The 'e' there tells the system that this doesn't work in certain authentication modes. Something to look into, but not a priority.
  var ui = SpreadsheetApp.getUi();
  SpreadsheetApp.getUi().createAddonMenu() //Tells the UI to add a space to put items under the add-ons menu in docs
      .addItem('Print analytics', 'printAnalytics') 
      .addToUi(); //Completes the add call.
}

function printAnalytics() {
  
  var userData = getUserInfo();
  var analytics = apiCall(userData.analyticsReportUrl + '?id=' + userData.appId);
  var analyticsPrint = [];
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Analytics").activate();
  
  sheet.clear(); //reset the sheet and set the headings
  sheet.getRange('A1').setValue('ID');
  sheet.getRange('B1').setValue('Function');
  sheet.getRange('C1').setValue('Time');
  
  for (var i = 0; i < analytics.jsonResponse.length; i++) {
    analyticsPrint.push([analytics.jsonResponse[i]['id'],analytics.jsonResponse[i]['function'],analytics.jsonResponse[i]['time']]);
  }
  Logger.log(analyticsPrint);
  sheet.getRange(2, 1, analytics.jsonResponse.length, 3).setValues(analyticsPrint);
  
  // /\ analytics \/ errors
  
  var errorsPrint = [];
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Errors").activate();
  var analytics = apiCall(userData.errorReportUrl + '?id=' + userData.appId);
  
  sheet.clear(); //reset the sheet and set the headings
  sheet.getRange('A1').setValue('ID');
  sheet.getRange('B1').setValue('File name');
  sheet.getRange('C1').setValue('Line number');
  sheet.getRange('D1').setValue('Time');
  sheet.getRange('E1').setValue('Message');
  
  
  
  for (var i = 0; i < analytics.jsonResponse.length; i++) {
    errorsPrint.push([analytics.jsonResponse[i]['id'],analytics.jsonResponse[i]['fileName'],analytics.jsonResponse[i]['lineNumber'],analytics.jsonResponse[i]['time'],analytics.jsonResponse[i]['message']]);
  }
  Logger.log(errorsPrint);
  sheet.getRange(2, 1, analytics.jsonResponse.length, 5).setValues(errorsPrint);
}
