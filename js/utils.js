// UTILITY FUNCTIONS
// Just a bonus, code for thought
export const $ = (selector) => document.querySelector(selector)
export const $$ = (selector) => document.querySelectorAll(selector)
export const secsToMins = (secs) => `${Math.floor(secs / 60)}:${Math.round(secs % 60).toString().padStart(2, `0`)}`