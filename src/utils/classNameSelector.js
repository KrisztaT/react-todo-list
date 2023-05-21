import { STATUS_DONE, STATUS_IN_PROGRESS,CLASSNAME_DONE,CLASSNAME_IN_PROGRESS,CLASSNAME_OVERDUE } from "../constants/statuses";

export const classNameSelector = (dueDate, status) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    if (due < today && status !== STATUS_DONE) {
      return CLASSNAME_OVERDUE;
    } else if (status === STATUS_DONE) {
      return CLASSNAME_DONE;
    } else if (status === STATUS_IN_PROGRESS) {
      return CLASSNAME_IN_PROGRESS;
    }else {
      return "";
    }
  };