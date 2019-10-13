function formSettings(allowResponses, publish, confMsg, closeMsg) {

    showMessageBox('Saving... Please wait', '', loadingGif, 300, 150, 100, 100);
    
    allowResponses = allowResponses == 1 ? true : false;
    publish = publish == 1 ? true : false;

    var ws = SpreadsheetApp.getActiveSheet();
    var range = ws.getActiveRange();
    var values = range.getValues();

    // *******try 50 each time ********
    var numRows = range.getNumRows();
    
    for (var row = 0; row < numRows; row++) {
   
        var formUrl = values[row][0];
        var errorsArr = [];
        
        
        try {
            var formFile = FormApp.openByUrl(formUrl);
        } catch (error) {
            errorsArr.push(formUrl);
            continue;
        }

        formFile.setAcceptingResponses(allowResponses) // set to AllowResponses true to accept new responses
                .setPublishingSummary(publish)
                .setConfirmationMessage(confMsg)
                .setCustomClosedFormMessage(closeMsg);
    }
    
    var msg = 'Done!';
    if (errorsArr.length > 0) {
        msg = "Got error when tried to open the following forms:\n\n" + errorsArr.join("\n") + "\n\nOther form settings saved successfully.";
    }
    
    return msg;
}