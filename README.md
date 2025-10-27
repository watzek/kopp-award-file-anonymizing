# kopp-award-file-anonymizing
Google Apps Script for updating file names to standardize and anonymize them.

As part of the Kopp Award submission process, students must submit three pdfs. This script does the following:

- Eliminates the need for students to follow a specific file naming convention.
- Renames files to the convention idnumber_type.pdf (e.g. 1234567_essay.pdf)

### Setup
- Once form is set up, enable form collection to populat a spreadsheet.
- In the spreadsheet, select Extentions->Apps Script
- In the code.gs space, replace the default with the contents of [googleAppsScript.js](googleAppsScript.js)
- Create a trigger, with these specs:
* Choose which function to run: onOpen
* Which runs at deployment: head
* Select event source: From spreadsheet
* Select event type: On open

This will create a pulldown menu in the spreadsheet, reading "Update File Names". When ready, the spreadsheet user should select "Rename files" from that menu.

The user will likely have to authorize permissions for the script to run the first time. Anytime new submissions are added, the spreadsheet user can just run the menu item again to rename the files.



