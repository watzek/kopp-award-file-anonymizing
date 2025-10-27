


function onOpen(){
  var ui=SpreadsheetApp.getUi();
  ui.createMenu("Update File Names").addItem("Rename Files", 'renameFiles').addToUi();
}

function renameFiles(){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var values = sheet.getDataRange().getValues();

  // Column indexes (0-indexed)
  var COLUMN_D_INDEX = 3;  // This is the column with the ID to format
  var COLUMN_Q_INDEX = 16; // This is the column we check for 'done'

  var COLUMN_H_INDEX = 7; //reflective essay link
  var COLUMN_J_INDEX = 9; //research project link
  var COLUMN_K_INDEX = 10; //assignment link


  // Start loop from i = 1 to skip the header row (i = 0)
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    var columnQValue = row[COLUMN_Q_INDEX];

    // 1. Check if column Q is blank
    if (!columnQValue || columnQValue.toString().trim() === "") {

      var counter=0;
      
      var userId = row[COLUMN_D_INDEX];
      
      // 2. Format the ID value
      var formattedId = formatIdForFileName(userId);

      var essayUrl = row[COLUMN_H_INDEX];
      var projectUrl = row[COLUMN_J_INDEX];
      var assignmentUrl = row[COLUMN_K_INDEX];

      if(renameFile(type="essay", url=essayUrl, userId=userId)){
        counter++;
      }
      else{
        Logger.log("something went wrong");
      }

      if(renameFile(type="project", url=projectUrl, userId=userId)){
        counter++;
      }
      else{
        Logger.log("something went wrong");
      }
      if(renameFile(type="assignment", url=assignmentUrl, userId=userId)){
        counter++;
      }
      else{
        Logger.log("something went wrong");
      }

      if(counter==3){
        var sheetRowNumber = i + 1;
        var COLUMN_Q_SHEET_NUMBER = COLUMN_Q_INDEX + 1; 
      
        sheet.getRange(sheetRowNumber, COLUMN_Q_SHEET_NUMBER).setValue("files renamed!");

      }

      
      // 3. Log the formatted ID (for testing)
      var sheetRowNumber = i + 1; 
      Logger.log("Row %s has a blank value in Column Q. Formatted ID from Column D: %s", 
                 sheetRowNumber, formattedId);
      
      // **Your file renaming code will use the 'formattedId' variable here.**
      // E.g., renameFile(formattedId, "essay.pdf");
      
    }
  }
}


function renameFile(type, url, userId){

  
  var filePieces=url.split("?id=");
  var fileId=filePieces[1];
  Logger.log("type is %s, url is %s", type, fileId);

  fileName=userId+"_"+type+".pdf";

  if(DriveApp.getFileById(fileId).setName(fileName)){
    return true;
  }
  else{
    return false;
  }
}


// Helper function to ensure consistent ID formatting
function formatIdForFileName(rawValue) {
  if (rawValue === null || typeof rawValue === 'undefined') {
    return ""; // Handle completely blank cells
  }
  
  // Step 1: Convert to a string, handling scientific notation and decimals.
  // Math.round(Number(rawValue)) converts the value to a number, stripping 
  // decimals and resolving scientific notation (e.g., 2.3575245E7 -> 23575245).
  var numberString = Math.round(Number(rawValue)).toString();
  
  // Step 2: Determine the intended length and pad accordingly.
  // Since all IDs are 7 or 8 digits, we check the length of the converted number 
  // and pad it back to that original length if it lost leading zeros.
  
  var length = numberString.length;
  
  if (length <= 7) {
    // If the number is 7 digits or less, pad to a minimum of 7.
    // E.g., "166733" (6 digits) becomes "0166733" (7 digits).
    return numberString.padStart(7, '0');
  } else if (length === 8) {
    // If it's 8 digits, no padding is needed.
    return numberString;
  } else {
    // For numbers longer than 8 digits, just return the number as is (no padding).
    return numberString;
  }
}


