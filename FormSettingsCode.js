function formSettings(data) {

    showMessageBox('Saving... Please wait', '', loadingGif, 300, 150, 100, 100);
    
    data.allowResponses = data.allowResponses == 1 ? true : false;
    data.publish = data.publish == 1 ? true : false;
    data.showLink = data.showLink == 1 ? true : false;

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

        formFile.setAcceptingResponses(data.allowResponses) // set to AllowResponses true to accept new responses
                .setPublishingSummary(data.publish)
                .setShowLinkToRespondAgain(data.showLink)
                .setConfirmationMessage(data.confMsg)
                .setCustomClosedFormMessage(data.closeMsg);
    }
    
    var msg = 'Done!';
    if (errorsArr.length > 0) {
        msg = "Got error when tried to open the following forms:\n\n" + errorsArr.join("\n") + "\n\nOther form settings saved successfully.";
    }
    
    return msg;
}