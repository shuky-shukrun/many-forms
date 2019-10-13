// Open a form by Url and remove duplicate responses based on the first question.
function removeDuplicates(PrimaryItem) {

    PrimaryItem = parseInt(PrimaryItem);

    var formsUrlList = getActiveRangeValues();

    var errorsArr = [];

    if (areYouSureAlert(formsUrlList.length) == false) {
        return;
    }
    
    showMessageBox('Removing... Please wait', '', loadingGif, 300, 150, 100, 100);
    
    try {
        var numOfItems = FormApp.openByUrl(formsUrlList[0]).getResponses();
        if (numOfItems.length > 0) {
            numOfItems = numOfItems[0].getItemResponses().length;
        }
    }
    catch (error) {
        SpreadsheetApp.getUi().alert("Can't open form from the given range!");
        return;
    }


    if (PrimaryItem > numOfItems) {
        SpreadsheetApp.getUi().alert('Your form contain ' + numOfItems + "questions. Primary question can't be " + PrimaryItem + ".");
        return;
    }

    for (var k = 0; k < formsUrlList.length; k++) {

        // extract form responses into array
        try {
            var form = FormApp.openByUrl(formsUrlList[k]);
        } catch (error) {
            errorsArr.push(formsUrlList[k]);
            continue;
        }
        var formResponses = form.getResponses();

        //create new array
        var newFormResponses = [];

        // go throw the form responses
        for (var i = 0; i < formResponses.length; i++) {
            var formResponse = formResponses[i];
            var itemResponses = formResponse.getItemResponses();
            var duplicate = false;

            // for each form response, extract the response for the first question
            for (var j in newFormResponses) {
                var compField = newFormResponses[j].getItemResponses()[PrimaryItem].getResponse().toLowerCase();

                if (itemResponses[PrimaryItem].getResponse().toLowerCase().localeCompare(compField) == 0) {
                    duplicate = true;
                }
            }
            // if unique, add it to the new array of responses
            if (!duplicate) {
                newFormResponses.push(formResponses[i]);
            }
        }

        if (newFormResponses.length != formResponses.length) {
            submitResponses(form, newFormResponses);

        }
    }

    var msg = 'Done!';
    if (errorsArr.length > 0) {
        msg = "Got error when tried to open the following forms:\n\n" + errorsArr.join("\n") + "\n\nOther forms analyzed successfully.";
    }
    
    return msg;
}








// Open a form by Url and remove duplicate responses based on the first question.
function removeUnAuth(PrimaryItem) {
    PrimaryItem = parseInt(PrimaryItem);

    var formsUrlList = getActiveRangeValues();

    var errorsArr = [];

    if (areYouSureAlert(formsUrlList.length) == false) {
        return;
    }
    
    showMessageBox('Removing... Please wait', '', loadingGif, 300, 150, 100, 100);

    try {
        var numOfItems = FormApp.openByUrl(formsUrlList[0]).getResponses();
        if (numOfItems.length > 0) {
            numOfItems = numOfItems[0].getItemResponses().length;
        }
    }
    catch (error) {
        SpreadsheetApp.getUi().alert("Can't open form from the given range!");
        return;
    }


    if (PrimaryItem > numOfItems) {
        SpreadsheetApp.getUi().alert('Your form contain ' + numOfItems + "questions. Primary question can't be " + PrimaryItem + ".");
        return;
    }

    for (var k = 0; k < formsUrlList.length; k++) {

        // extract authorized values list
        var ws = SpreadsheetApp.getActive().getSheetByName('Approved List');
        var range = ws.getRange(1, 1, ws.getLastRow());
        var values = range.getValues();
        var list = values.map(function (i) { return i[0].toLowerCase(); });

        // extract form responses into array 
        try {
            var form = FormApp.openByUrl(formsUrlList[k]);
        } catch (error) {
            errorsArr.push(formsUrlList[k]);
            continue;
        }
        var formResponses = form.getResponses();

        //create new array
        var newFormResponses = [];

        // go throw the form responses
        for (var i = 0; i < formResponses.length; i++) {
            var formResponse = formResponses[i];
            var itemResponses = formResponse.getItemResponses();
            var unAuth = false;

            var compField = itemResponses[PrimaryItem].getResponse().toLowerCase();

            if (list.indexOf(compField) == -1) {
                unAuth = true;
            }

            // if authorized, add it to the new array of responses
            if (!unAuth) {
                newFormResponses.push(formResponses[i]);
            }
        }

        if (newFormResponses.length != formResponses.length) {
            submitResponses(form, newFormResponses);
        }
    }

    var msg = 'Done!';
    if (errorsArr.length > 0) {
        msg = "Got error when tried to open the following forms:\n\n" + errorsArr.join("\n") + "\n\nOther forms analyzed successfully.";
    }
    
    return msg;
}







function calcResponsesAvg2(qNumbers) {

    SpreadsheetApp.getUi().alert("Caming Soon...");
    return;
    qNumbers = qNumbers.split(",");

    var formsUrlList = getActiveRangeValues();

    var errorsArr = [];

    if (areYouSureAlert(formsUrlList.length) == false) {
        return;
    }

    showMessageBox('Calculating... Please wait', '', loadingGif, 300, 150, 100, 100);

    try {
        var numOfItems = FormApp.openByUrl(formsUrlList[0]).getResponses();
        if (numOfItems.length > 0) {
            numOfItems = numOfItems[0].getItemResponses().length;
        }
    }
    catch (error) {
        SpreadsheetApp.getUi().alert("Can't open form from the given range!");
        return;
    }


    if (qNumbers.length > numOfItems) {
        SpreadsheetApp.getUi().alert('Your form contain ' + numOfItems + "questions. Can't analyze " + qNumbers.length + ".");
        return;
    }

    for (var k = 0; k < formsUrlList.length; k++) {

        // extract form responses into array 
        try {
            var form = FormApp.openByUrl(formsUrlList[k]);
        } catch (error) {
            errorsArr.push(formsUrlList[k]);
            continue;
        }

        var formResponses = form.getResponses();

        for(var i = 0; i < qNumbers.length; i++) {
            var qNumber = parseInt(qNumbers[i]);
            Logger.log("qNumbers[i]: " + qNumbers[i]);

            var itemResponseValues = getItemValuesFromResponses(formResponses, qNumber);
            Logger.log("itemResponseValues: " + itemResponseValues);
            var sum = 0;
            var counter = 0;
            Logger.log("q: " + i);
            for(var j = 0; j < itemResponseValues.length; j++) {
                var num = parseInt(itemResponseValues[j]);
                if(! isNaN(num)) {
                    sum += num;
                    counter++;
                }

            }
            Logger.log("sum: " + sum);
            Logger.log("counter: " + counter);
            var itemAvg = sum / counter;
            Logger.log("itemAvg: " + itemAvg);
            var itemTitle = formResponses[0].getItemResponses()[qNumber].getItem().asScaleItem().getTitle();
//            Logger.log("itemTitle: " + itemTitle);
            formResponses[0].getItemResponses()[qNumber].getItem().asScaleItem().setTitle(itemTitle + " | " + itemAvg.toFixed(2));
        }
        
    }
    
    var msg = 'Done!';
    if (errorsArr.length > 0) {
        msg = "Got error when tried to open the following forms:\n\n" + errorsArr.join("\n") + "\n\nOther forms analyzed successfully.";
    }
    
    return msg;
}





/*********************************************************************************/


function calcResponsesAvg(qNumbers) {
    
    qNumbers = qNumbers.split(",");

    var formsUrlList = getActiveRangeValues();

    var errorsArr = [];

    if (areYouSureAlert(formsUrlList.length) == false) {
        return;
    }

    showMessageBox('Calculating... Please wait', '', loadingGif, 300, 150, 100, 100);

    try {
        var numOfItems = FormApp.openByUrl(formsUrlList[0]).getResponses();
        if (numOfItems.length > 0) {
            numOfItems = numOfItems[0].getItemResponses().length;
        }
    }
    catch (error) {
        SpreadsheetApp.getUi().alert("Can't open form from the given range!");
        return;
    }


    if (qNumbers.length > numOfItems) {
        SpreadsheetApp.getUi().alert('Your form contain ' + numOfItems + "questions. Can't analyze " + qNumbers.length + ".");
        return;
    }
    
    var tempSS = SpreadsheetApp.create('tempSheet');

    for (var k = 0; k < formsUrlList.length; k++) {

        // extract form responses into array 
        try {
            var form = FormApp.openByUrl(formsUrlList[k]);
        } catch (error) {
            errorsArr.push(formsUrlList[k]);
            continue;
        }
        
        form.setDestination(FormApp.DestinationType.SPREADSHEET, tempSS.getId());
        var responsesSheet = tempSS.getSheets()[0];
        var responsesRange = responsesSheet.getRange(2, 2, responsesSheet.getLastRow() - 1, responsesSheet.getLastColumn() - 1);
        // for each column 
    }



}








/*********************************************************************************/




// return list of values from the active range
function getActiveRangeValues() {

    var ws = SpreadsheetApp.getActiveSheet();
    var range = ws.getActiveRange();
    var values = range.getValues();
    var list = values.map(function (i) { return i[0]; });

    return list;
}






function getItemValuesFromResponses(formResponsesArr, index) {

    //create new array
    var values = [];

    // go throw the form responses
    for (var i = 0; i < formResponsesArr.length; i++) {
        var formResponse = formResponsesArr[i];
        var itemResponses = formResponse.getItemResponses();
        values.push(itemResponses[index].getResponse());
    }
    return values;
}





function submitResponses(form, formResponsesArr) {

    // remove old responses
    form.deleteAllResponses();

    // create and submit new responses
    for (var i = 0; i < formResponsesArr.length; i++) {
        var responseItems = formResponsesArr[i].getItemResponses();
        var newResponse = form.createResponse();

        for (var j = 0; j < responseItems.length; j++) {
            newResponse.withItemResponse(responseItems[j]);
        }
        newResponse.submit();
    }
}




function areYouSureAlert(numOfForms) {

    var manyForms = 'You chose ' + numOfForms + ' forms.\nIf your forms have 7 or more questions, it may take a while and cause problems.\n ';
    var msg = 'Have you read the limitations and sure you want to continue?';

    var ui = SpreadsheetApp.getUi();
    var response = ui.alert('Confirm', (numOfForms > 50 ? manyForms + msg : msg), ui.ButtonSet.YES_NO);

    // Process the user's response.
    if (response != ui.Button.YES) {
        return false;
    }
    return true;
}