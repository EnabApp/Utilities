import moment from "moment/src/moment.js";
import ar from "moment/src/locale/ar";

moment.updateLocale("ar", ar);

moment.updateLocale("ar", {
  longDateFormat: {
    LT: "h:mm A",
  },
});

export const useMoment = () => {
  return moment;
};
