import moment from "moment/moment.js";
import ar from "moment/locale/ar";

moment.updateLocale("ar", {
  longDateFormat: {
    LT: "h:mm A" 
  },
});

moment.updateLocale("ar", ar);

export const useMoment = () => {
  return moment;
};
