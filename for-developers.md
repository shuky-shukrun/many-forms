# For Developers
## Project Structure
Google Apps Script (GAS) service is a cloud service, designed to automate task on popular Google services such as Gmail, Google Sheet, Google Forms and so on.

The script editor of GAS is very basic and it force you to save all your files in one folder.
Therefor, I best I could do is to name the files in a way that keep them grouped by subjects.

### Client and Server side
Server side functions are not visible to the user. In GAS, The server side functions located in the .js files. (Not 100% correct but easier to explain).
Client side functions are visible the user and locates at the html-js files (html files that contain only script section).
Other files are just html files.

### Functions Structure
I separate the functions into two main types.
* General functions - functions that designed for wide-range uses, and it's use for many tasks.
Those functions can be found in [GeneralCode](/GeneralCode.js) and [GeneralScript](/GeneralScript.html) files.
For example, the functions for displaying help banners on the screen are General functions.

* Specific Functions - functions that designed for specific task.
Those functions can be found in specific task files.
For example, the functions for remove duplicate responses are specific functions.

## How to add a new feature?
To add a new feature you need to do the following steps:
1. Create menu entry - If your feature does match one of the existing entries (form settings for example), you can skip this step.
If your feature does not match any of the menu entries, you'll need to create a new one.
You do that by adding an item to the opOpen() function in the [GeneralCode](/GeneralCode.js) file.
For more info, visit [this link](https://developers.google.com/apps-script/reference/base/ui.html#createMenu(String)).

2. Create UI - edit or create html file with the new feature UI.

3. Create client side functions - edit or create html file with only </script/> section and add your client side functions to it.
To merge your html with the script file, use the Include() function from [GeneralCode](/GeneralCode.js).

4. Create server side functions - edit or create .js file with the proper server side functions.