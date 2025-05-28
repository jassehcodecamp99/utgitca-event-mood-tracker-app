export const Home = () => {
  const currentDate = document.getElementById(
    "current-date"
  ) as HTMLParagraphElement;
  // set current date
  const today = new Date();
  currentDate.textContent = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return;
};
Home();

// get mood entries from json file
interface SleepEntry {
  date: string;
  hours: number;
  mood: string;
}

const chart = document.getElementById("mood-chart") as HTMLDivElement;

fetch("/data.json")
  .then((res) => res.json())
  .then((data: SleepEntry[]) => {
    data.forEach((entry) => {
      let color = "";
      console.log(entry.mood);
      if (entry.hours >= 9) {
        color = "bg-orange-400";
        entry.mood = `<img
            src="/images/icon-very-happy-white.svg"
            class="w-8 h-8 rounded-full p-1 mb-64"
          />`;
      } else if (entry.hours >= 7) {
        color = "bg-green-400";
        entry.mood = `<img
            src="/images/icon-happy-white.svg"
            class="w-8 h-8 rounded-full p-1 mb-52"
          />`;
      } else if (entry.hours >= 5) {
        color = "bg-blue-400";
        entry.mood = `<img
            src="/images/icon-neutral-white.svg"
            class="w-8 h-8 rounded-full p-1 mb-36"
          />`;
      } else if (entry.hours >= 3) {
        color = "bg-purple-400";
        entry.mood = `<img
            src="/images/icon-sad-white.svg"
            class="w-8 h-8 rounded-full p-1 mb-24"
          />`;
      } else {
        color = "bg-red-400";
        entry.mood = `<img
            src="/images/icon-very-sad-white.svg"
            class="w-8 h-8 rounded-full p-1 mb-12"
          />`;
      }

      const bar = document.createElement("div");
      bar.className = `flex flex-col items-center text-center over-flow `;
      bar.innerHTML = `
        <div class="${color} w-8 rounded-t-full flex items-center justify-center text-2xl text-white">
          ${entry.mood}
        </div>
        <div class="mt-2 text-sm">${entry.date}</div>
      `;
      chart.appendChild(bar);
    });
  });

//mood form open
const moodFormOpen = document.querySelector(
  ".btn-mood-open"
) as HTMLButtonElement;

moodFormOpen.addEventListener("click", () => {
  const moodLoggerFormEl = document.querySelector(
    ".mood-popup "
  ) as HTMLDivElement;
  moodLoggerFormEl?.classList.remove("hidden");
  const moodForm = document.querySelector(".mood-form") as HTMLFormElement;
  moodForm?.classList.remove("hidden");
});
//mood form close
const moodFormClose = document.querySelector(".btn-mood-close") as HTMLElement;

moodFormClose.addEventListener("click", () => {
  const moodLoggerFormEl = document.querySelector(
    ".mood-popup"
  ) as HTMLDivElement;
  moodLoggerFormEl?.classList.add("hidden");
});

// feeling form open
let currentStep: number = 1;

function showStep(step: number) {
  const allSteps = document.querySelectorAll(".step");
  allSteps.forEach((el, index) => {
    (el as HTMLElement).classList.toggle("hidden", index !== step - 1);
  });

  // Progress bar update
  for (let i = 1; i <= 2; i++) {
    const bar = document.getElementById(`step-${i}-bar`);
    if (bar) {
      bar.style.backgroundColor = i <= step ? "#3b82f6" : "#e5e7eb";
    }
  }
}
// Step 1 validation
const moodSubmit = document.querySelector(".btn-mood-continue") as HTMLElement;

moodSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const selected = document.querySelector(
    'input[name="mood"]:checked'
  ) as HTMLInputElement;
  const errorMsg = document.getElementById("errorStep1");

  if (!selected) {
    errorMsg?.classList.remove("hidden");
  } else {
    errorMsg?.classList.add("hidden");
    currentStep++;
    showStep(currentStep);
    const moodLoggerFormEl = document.querySelector(
      ".mood-popup "
    ) as HTMLDivElement;
    moodLoggerFormEl?.classList.remove("hidden");
    const moodForm = document.querySelector(".mood-form") as HTMLFormElement;
    moodForm?.classList.add("hidden");
    const feelingForm = document.querySelector(
      ".feeling-form"
    ) as HTMLFormElement;
    feelingForm?.classList.remove("hidden");
  }
});
