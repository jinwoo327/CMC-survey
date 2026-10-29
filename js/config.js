/* ================= researcher settings =================
   Paste the Apps Script web-app URL (ends with /exec) between the quotes. */
window.SURVEY_CONFIG={
  ENDPOINT:"https://script.google.com/macros/s/AKfycbxNm-5MkL5uEUDXlnJJkCBgjsL9ddasTbMh7sdAXIauR1sHf182mWox8aJ8r-qxW28S/exec",
  VERSION:"2026-10-v1",
  DONE_KEY:"reply-survey-done",          // set after a confirmed submit; ?reset=1 clears it
  LANG_KEY:"reply-survey-lang",          // last language chosen on the picker
  PROGRESS_KEY:"reply-survey-progress",  // in-progress scenario answers (resume after reload)
  PROGRESS_MAX_DAYS:7
};
