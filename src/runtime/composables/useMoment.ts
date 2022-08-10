import moment from 'moment/src/moment';
import ar from "moment/src/locale/ar-sa";

moment.updateLocale("ar", ar);

export const useMoment = () => {
  return moment;
}