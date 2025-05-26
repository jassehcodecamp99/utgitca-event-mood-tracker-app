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

const moodLoggerBtnEl = document.querySelector(".btn-log") as HTMLElement;

moodLoggerBtnEl.addEventListener("click", () => {
  const moodLoggerFormEl = document.querySelector(".mood-popup");
  moodLoggerFormEl?.classList.toggle("hidden");
});

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
      bar.className = `flex flex-col items-center text-center overflow-x-auto `;
      bar.innerHTML = `
        <div class="${color} w-8 rounded-t-full flex items-center justify-center text-2xl text-white">
          ${entry.mood}
        </div>
        <div class="mt-2 text-sm">${entry.date}</div>
      `;
      chart.appendChild(bar);
    });
  });

//error message
const myMood = document.getElementById("mood-form") as HTMLDivElement;
myMood.addEventListener("submit", function (e) {
  e.preventDefault();
  const selected = document.querySelector('input[name="mood"]:checked');
  const errorMessage = document.getElementById(
    "errorMessage"
  ) as HTMLParagraphElement;

  if (!selected) {
    errorMessage.classList.remove("hidden");
  } else {
    errorMessage.classList.add("hidden");

    // You can now POST this value to a backend or store it
  }
});
