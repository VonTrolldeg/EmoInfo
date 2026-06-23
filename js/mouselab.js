// --- Datainsamling: klickordning och tidsåtgång per knapp ---
// pre = före mittfrågan, post = efter mittfrågan
var preClickData = [];
var preClickOrder = [];
var postClickData = [];
var postClickOrder = [];
var currentStartTime = 0;     // när deltagaren öppnade senaste infokort
var postMidPhase = false;     // blir true när mittfrågan besvarats
var midAnswers = { credibility: null, refugee_status: null };

// Fisher-Yates shuffle — blandar en array slumpmässigt
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Slås upp av on_load när ett kort klickas, fylls i av stimulus-funktionen
const infoData = {};
const labelData = {};

function buildMouselabTrial() {
  let positiveOnLeft;

  return {
  type: jsPsychHtmlButtonResponse,

  // stimulus körs precis innan trialen visas och bygger upp hela HTML-strukturen
  stimulus: function() {
    const options     = jsPsych.evaluateTimelineVariable('options');
    const name        = jsPsych.evaluateTimelineVariable('person_name');
    const personName  = jsPsych.evaluateTimelineVariable('person_name');
    const bigQ        = jsPsych.evaluateTimelineVariable('bigQ');
    const heading     = jsPsych.evaluateTimelineVariable('mouselab_heading');

    // Para ihop positiva och negativa alternativ slumpmässigt (ett par per rad)
    const positives = shuffleArray(options.filter(opt => opt.type === 'positive'));
    const negatives = shuffleArray(options.filter(opt => opt.type === 'negative'));
    positiveOnLeft = Math.random() < 0.5;
    const randomizedOptions = positives.flatMap((opt, i) =>
      positiveOnLeft ? [opt, negatives[i]] : [negatives[i], opt]);

    // Bygg uppslagstabeller så on_load kan visa rätt text när ett kort klickas
    randomizedOptions.forEach(opt => {
      infoData[opt.id] = opt.description;
      labelData[opt.id] = opt.label;
    });

    // Skapa en knapp-HTML för varje informationskort
    const optionDivs = randomizedOptions.map(opt =>
      `<button class="mouselab-option" id="${opt.id}" type="button">
        <span class="card-symbol">${opt.type === 'positive' ? '+' : '−'}</span>
        <span class="card-label">${opt.label}</span>
      </button>`
    );

    // Returnera hela sidan: kortraden + info-modal + mitt-modal
    return `
    <h2>${heading}</h2>
    <p>Välj vilka kort med information du vill läsa. Korten med <strong>+</strong> stödjer ${name}s berättelse och <strong>−</strong> går emot den.</p>
    <div class="option-list">
      ${optionDivs.join('\n      ')}
    </div>

    <!-- Popup som visas när deltagaren klickar på ett kort -->
    <div id="info-modal">
      <div id="modal-content">
        <h3 id="modal-heading"></h3>
        <p id="modal-text"></p>
        <button id="modal-close" type="button">Stäng</button>
      </div>
    </div>

    <!-- Mittfråga som visas automatiskt efter 4 klick -->
    <div id="mid-modal">
      <div id="mid-modal-content">
        <h3>Efter 4 kort ber vi dig besvara frågorna igen</h3>
        <div class="mid-question">
          <p>Hur trovärdig tyckte du att ${personName} verkade?</p>
          <div class="slider-wrapper">
            <input type="range" class="jspsych-slider" id="mid-credibility-slider" min="0" max="100" value="50" step="1">
            <div class="slider-labels">
              <span>Inte alls trovärdig</span>
              <span>Mycket trovärdig</span>
            </div>
          </div>
        </div>
        <div class="mid-question">
          <p>Anser du att ${personName} ${bigQ}</p>
          <div class="slider-wrapper">
            <input type="range" class="jspsych-slider" id="mid-refugee-slider" min="0" max="100" value="50" step="1">
            <div class="slider-labels">
              <span>Nej</span>
              <span>Ja</span>
            </div>
          </div>
        </div>
        <button id="mid-modal-close" type="button">Fortsätt</button>
      </div>
    </div>
  `;
  },

  choices: ["Fortsätt"],

  // on_load kopplar all interaktivitet när HTML:en är inlagd i DOM
  on_load: function () {
    let totalClicks = 0;
    let midShown = false;

    // Lyssna på klick på varje informationskort
    document.querySelectorAll(".mouselab-option").forEach((option) => {
      option.addEventListener("click", () => {
        // Spara klickordning i rätt fas (före/efter mittfrågan)
        if (postMidPhase) {
          postClickOrder.push(option.id);
        } else {
          preClickOrder.push(option.id);
        }

        // Starta tidtagning och visa info-modalen med kortets innehåll
        currentStartTime = Date.now();
        document.getElementById("modal-heading").textContent = labelData[option.id];
        document.getElementById("modal-text").textContent = infoData[option.id];
        document.getElementById("info-modal").style.display = "flex";
        option.classList.add("visited");
        totalClicks++;
      });
    });

    // När deltagaren stänger ett infokort: spara tidsåtgång och visa mittfrågan om det är dags
    document.getElementById("modal-close").addEventListener("click", () => {
      const duration = Date.now() - currentStartTime;
      if (postMidPhase) {
        const id = postClickOrder[postClickOrder.length - 1];
        postClickData.push({ option: id, duration });
      } else {
        const id = preClickOrder[preClickOrder.length - 1];
        preClickData.push({ option: id, duration });
      }
      document.getElementById("info-modal").style.display = "none";

      // Visa mittfrågan första gången deltagaren stängt sitt 4:e kort
      if (!midShown && totalClicks >= 4) {
        midShown = true;
        showMidModal();
      }
    });

    // Hanterar mitt-modalen: låser "Fortsätt"-knappen tills båda sliders rörts
    function showMidModal() {
      const midModal = document.getElementById("mid-modal");
      const midCloseBtn = document.getElementById("mid-modal-close");
      let credibilityTouched = false;
      let refugeeTouched = false;

      midModal.style.display = "flex";
      midCloseBtn.disabled = true;
      midCloseBtn.style.opacity = "0.6";
      midCloseBtn.style.cursor = "not-allowed";

      // Aktiverar knappen först när båda sliders har rörts
      function updateMidState() {
        const allTouched = credibilityTouched && refugeeTouched;
        midCloseBtn.disabled = !allTouched;
        midCloseBtn.style.opacity = allTouched ? "1" : "0.6";
        midCloseBtn.style.cursor = allTouched ? "pointer" : "not-allowed";
      }

      document.getElementById("mid-credibility-slider").addEventListener("input", (e) => {
        midAnswers.credibility = parseFloat(e.target.value);
        credibilityTouched = true;
        updateMidState();
      });

      document.getElementById("mid-refugee-slider").addEventListener("input", (e) => {
        midAnswers.refugee_status = parseFloat(e.target.value);
        refugeeTouched = true;
        updateMidState();
      });

      // Stäng mittfrågan och markera att vi nu är i post-fasen
      midCloseBtn.addEventListener("click", () => {
        midModal.style.display = "none";
        postMidPhase = true;
      });
    }
  },

  // on_finish sparar all insamlad data till jsPsych när deltagaren klickar "Fortsätt"
  on_finish: function (data) {
    data.pre_click_order = preClickOrder.join(' > ');
    data.pre_click_durations = JSON.stringify(preClickData);
    data.post_click_order = postClickOrder.join(' > ');
    data.post_click_durations = JSON.stringify(postClickData);
    data.mid_main_q_credibility = midAnswers.credibility;
    data.mid_main_q_refugee_status = midAnswers.refugee_status;
    data.positive_side = positiveOnLeft ? 'left' : 'right';
  }
  };
}
