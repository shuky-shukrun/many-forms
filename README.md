# many-forms
A Google Spreadsheet add-on that allow you to create and analyze google forms using friendly UI. Use case can be a surveys system for school or university, where you may need many different forms with the same questions, one for each teacher / lecturer.

## Project Structure
This project is separated to two part, the first one design for very specific task, and the second is more general.

### Scrap it!
The first part is a small python script (just scrapSelenium.py file) witch made to scrap data from [Yedion Website](https://info.braude.ac.il/yedion/fireflyweb.aspx)
The idea is make a csv file with the details of all the courses in a given semester at [Ort Braude Collage of Engineering](https://w3.braude.ac.il).
Once we have this file, we can create a surveys system, using the second part of this project.

### Google Sheet Add-on
The second and the main part of this project is the google sheet add-on.
This add-on allows you to create, manage and analyze many Google form files via friendly UI.
Using this add-on, we can take a sheet of data (the data from the first part for example), and create unique Google form of each row in the sheet.
Once we do that, we have a database of google form files, witch can be used for a survey system.

### For Developers
If you want to contribute to this project, please [click here](/for-developers.md)
I wish to put the files in more reasonable structure, but since I have deploy it eventually to Google Apps Script service, I have to keep all the files together in one folder.
Considering that, I tried to named the files in a way that keep them grouped by subjects.

## Features
* Create hundreds of custom google forms just with one click.
* Manage your created forms: 
  * Allow / do not allow new responses
  * Publish / do not publish results
  * Show / do not show link to another respond
  * Custom confirmation message
  * Custom close-form message
  * Remove duplicate responses!
  * Remove unauthorized responses
  * Calculate responses average
  
## How to use:
* Create a copy of [Many-Forms-Spreadsheet](https://docs.google.com/spreadsheets/d/16SCjkceW5H87v-M8zvSxjoA-ErT5ndUYxSzcvBjCz-o/edit?usp=sharing) on your google account. 
* Open the spreadsheet and Follow the instructions, watch the following demo gifs or watch the [YouTube tutorial](https://www.youtube.com/playlist?list=PLpqDEyxyeqV4mGax4bZAS0si7ZZerjOXx).

### Creating many forms:
![Creating Forms](/images/create-forms.gif)

### Allow Responses / Publish Results:
![Creating Forms](/images/form-settings.gif)

### Change Confirmation and Closed Message:
![Creating Forms](/images/change-messages.gif)

### Remove Unauthorized Responses:
![Creating Forms](/images/remove-unauthorized.gif)

### Remove Duplicate Responses:
![Creating Forms](/images/remove-duplicates.gif)