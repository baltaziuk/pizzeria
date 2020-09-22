//const { default: BaseWidget } = require("./BaseWidget");
import BaseWidget from './BaseWidget.js';
import { select, settings} from '../settings.js';
import { utils } from '../utils.js';



class DatePicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, utils.dateToStr(new Date()));

    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.dataPicker.input);
    console.log('input', thisWidget.dom.input);

    thisWidget.initPlugin();

  }

  initPlugin() {
    const thisWidget = this;

    thisWidget.minDate = new Date(thisWidget.value);
    thisWidget.maxDate = utils.addDays(thisWidget.minDate, settings.datePicker.maxDaysInFuture);

    flatpickr(thisWidget.dom.input, {
      defaultDate: thisWidget.minDate,
      minDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,
      locale: {
        firstDayOfWeek: 1,
      },
      disable: [
        function(date) {
          return (date.getDay() === 1);
        }
      ],
      onChange: function(selectedDates, dateStr){
        thisWidget.value = dateStr;
        console.log('selectedDates:', selectedDates);
        console.log('thisWidget.value:', thisWidget.value);

      }
    });
    console.log('dom.input', thisWidget.dom.input);



  }

  parseValue(value){
    return value; //??????
  }

  isValid(value){
    return value==value;
  }
  renderValue(){

  }

}

export default DatePicker;
