var loadingGif = 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif';


/* What should the add-on do after it is installed */
function onInstall() {
    onOpen();
}

/* What should the add-on do when a document is opened */
function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.alert('Hi!',"Welcome to Bulk Forms.\n\nPlease read carefully the instructions and limitations.\n\nTo start, open 'Bulk Forms' from the menu.", ui.ButtonSet.OK);
    
    var approvedList = SpreadsheetApp.getActive().getSheetByName('Approved List');
    if (approvedList == null) {
      SpreadsheetApp.getActive().insertSheet('Approved List');
    }
    ui.createMenu('Bulk Forms')
      .addItem('Create Forms', 'CreateFormsMenu')
      .addItem('Form Settings', 'FormSettingsMenu')
      .addItem('Analyze Form Results', 'AnalyzeMenu')
      .addItem('Instructions / Limitations', 'HelpMenu')
      .addItem('About', 'AboutMenu')
      .addToUi();  // Run the showSidebar function when someone clicks the menu
}

// generic function to open sidebar menu based on html file
function showSidebar(fileName, title) {
        var html = HtmlService.createTemplateFromFile(fileName)
               .evaluate()
               .setTitle(title); // The title shows in the sidebar
    SpreadsheetApp.getUi().showSidebar(html);
}

// generic function to open popup window html file
function showModalDialog(fileName, title, width, height) {
    var htmlOutput = HtmlService.createTemplateFromFile(fileName).evaluate();
    htmlOutput.setWidth(width).setHeight(height);
    SpreadsheetApp.getUi().showModalDialog(htmlOutput, title);

}

// list of sidebar menu functions
function CreateFormsMenu() {
    showSidebar('CreateFormsMenu', 'Create Forms');
}

function FormSettingsMenu() {
    showSidebar('FormSettingsMenu', 'Form Settings');
}

function HelpMenu() {
    showModalDialog('HelpMenu', 'Instructions / Limitations', 500, 500);
}

function AboutMenu() {
    showModalDialog('AboutMenu', 'About', 300, 200);
}

function AnalyzeMenu() {
    showSidebar('‏‏‏AnalyzeFormResultsMenu', 'Analyze Form Results');

}


// generic function to open popup window with image and help text
function showMessageBox(title, helpText, img, boxWidth, boxHeight, imgWidth, imgHeight) {
      var htmlBody =  '<link href="https://ssl.gstatic.com/docs/script/css/add-ons.css" rel="stylesheet">' +
                      '<div style="text-align:center;">' +
                      '<p>' + helpText + '</p>' +
                      '<img src= "' + img + '" width="' + imgWidth + '" height="' + imgHeight + '"/>'
                      + '</div>';
      var htmlOutput = HtmlService.createHtmlOutput(htmlBody)
                                  .setWidth(boxWidth)
                                  .setHeight(boxHeight);
    SpreadsheetApp.getUi().showModalDialog(htmlOutput, title);
}

// generic function to load content from html file into another html file (useful to separate body from script)
function include(filename) {
      return HtmlService.createHtmlOutputFromFile(filename).getContent();
}


function alert(msg) {
    SpreadsheetApp.getUi().alert(msg);
}