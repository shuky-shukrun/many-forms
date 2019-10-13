/* This Google Script function does all the magic. */
function createFormsJS(data) {
  
    showMessageBox('Creating... Please wait', '', loadingGif, 300, 150, 100, 100);
    
    // get neccesary info
    var ws = SpreadsheetApp.getActiveSheet();
    var range = ws.getActiveRange();
    var numRows = range.getNumRows();
    var firstRow = range.getRowIndex();
    var values = range.getValues();
    var lastColumn = range.getLastColumn();
  
    try {
      var baseForm = DriveApp.getFileById(data.formId);
    } 
    catch(e){
        var ui = SpreadsheetApp.getUi();
        ui.alert('Error!', "Can't find form by this id.", ui.ButtonSet.OK);
        return;
    }

    try {
      var destFolder = DriveApp.getFolderById(data.destFolderId);
    } 
    catch(e){
        var ui = SpreadsheetApp.getUi();
        ui.alert('Error!', "Can't find folder by this id.", ui.ButtonSet.OK);
        return;
    }
    
    // for each row - create a new row
    for (var row = 0; row < numRows; row++) {
        // make a copy of the form and rename it's file name and file title
        var newName = values[row].join(data.separator);
        var newForm = baseForm.makeCopy(newName, destFolder);
        FormApp.openById(newForm.getId()).setTitle(newName);
        
        // update new next cell in the row to contain the new form URL
        ws.getRange(firstRow + row,  lastColumn+1).setValue(newForm.getUrl());
    }
    
    return 'Done!';
}