var ms = 0;
var state = 0;
base = 60;



function startstop() {
   if (state == 0) {
      state = 1;
      then = new Date();
      then.setTime(then.getTime() - ms);
   } else {
      state = 0;
      now = new Date();
      ms = now.getTime() - then.getTime();
      document.clockform.clock.value = convertMsToGeneralView(ms);
   }
}

function swreset() {
   state = 0;
   ms = 0;
   document.clockform.clock.value = convertMsToGeneralView(ms);
}


function display() {
   setTimeout("display();", 50);
   if (state == 1) {
      now = new Date();
      ms = now.getTime() - then.getTime();
      document.clockform.clock.value = convertMsToGeneralView(ms);
   }
}


function convertMsToGeneralView(value) {
   hours = Math.floor(value / (1000 * 60 * 60));
   value = value % (1000 * 60 * 60);
   minutes = Math.floor(value / (1000 * 60));
   value = value % (1000 * 60);
   seconds = Math.floor(value / 1000);
   value = value % 1000;
   milliseconds = value;

   return convertTimeValueToTwoSigns(hours) + ':' +
      convertTimeValueToTwoSigns(minutes) + ':' +
      convertTimeValueToTwoSigns(seconds) + '.' +
      convertTimeValueToThreeSigns(milliseconds);
}

function convertTimeValueToTwoSigns(value) {
   if (value > 0) {
      if (value < 10) {
         value = '0' + value;
      }
   } else {
      value = '00';
   }
   return value;
}

function convertTimeValueToThreeSigns(value) {
   if (value > 0) {
      if (value < 10) {
         value = '00' + value;
      } else  if (value < 100) {
         value = '0' + value;
      }
   } else {
      value = '000';
   }
   return value;
}