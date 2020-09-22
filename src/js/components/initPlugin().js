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
          return (date.getDay() === 2);
        }
      ],
      onChange: function(selectedDates, dateStr){
        thisWidget.value = dateStr;
        console.log('selectedDates:', selectedDates);
        console.log('thisWidget.value:', thisWidget.value);

      }
    });
  }
