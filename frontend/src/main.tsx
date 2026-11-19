// Entry point. Styles and fonts load with the page; the app itself (boot.tsx)
// starts only after the browser has painted the prerendered HTML, so the page
// is visible before any of the app's JavaScript runs.
import "./fonts.css";
import "@fontsource-variable/libre-franklin";
import "@fontsource-variable/jetbrains-mono";
import "./index.css";
import "./motion.css";

let started = false;
const start = () => {
  if (started) return;
  started = true;
  void import("./boot");
};

if (document.visibilityState === "hidden") {
  // A background tab never gets an animation frame; don't wait for one.
  start();
} else {
  // The frame callback runs just before a paint; the timeout runs just after it.
  requestAnimationFrame(() => setTimeout(start, 0));
  // Safety net in case the frame never comes.
  setTimeout(start, 1200);
}
