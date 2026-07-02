// =============================================================================
// ÖVNINGS-MOUSELAB — visas en gång efter consent, innan experimentet
// =============================================================================


const practiceCards = {};

const practice_mouselab = {
  type: jsPsychHtmlButtonResponse,

  // stimulus bygger upp hela HTML-strukturen precis innan trialen visas
  stimulus: function() {
    const cards = [
      { id: "pr_pos_1", type: "positive", label: "Grannens iakttagelse", description: "Grannen, tvärs över gatan säger att Eriks lampor var tända hela kvällen" },
      { id: "pr_pos_2", type: "positive", label: "Telefonens position",  description: "Eriks telefon kopplade upp mot masten närmast hemmet klockan 20:13" },
      { id: "pr_neg_1", type: "negative", label: "Möjlig observation",   description: "En bekant tror att hon såg Erik på stan men är inte säker" },
      { id: "pr_neg_2", type: "negative", label: "Bilens placering",     description: "Eriks bil stod inte på delen av gatan som han oftast parkerar på" }
    ];

    // Para ihop positiva och negativa alternativ slumpmässigt (ett par per rad)
    const positives = jsPsych.randomization.shuffle(cards.filter(c => c.type === 'positive'));
    const negatives = jsPsych.randomization.shuffle(cards.filter(c => c.type === 'negative'));
    const positiveOnLeft = Math.random() < 0.5;
    const randomized = positives.flatMap((c, i) => positiveOnLeft ? [c, negatives[i]] : [negatives[i], c]);

    // Bygg uppslagstabell så on_load kan visa rätt text när ett kort klickas
    randomized.forEach(c => { practiceCards[c.id] = c; });

    // Skapa en knapp-HTML för varje informationskort
    const optionDivs = randomized.map(c =>
      `<button class="mouselab-option" id="${c.id}" type="button">
        <span class="card-symbol">${c.type === 'positive' ? '+' : '−'}</span>
        <span class="card-label">${c.label}</span>
      </button>`
    ).join('\n');

    return `
      <h2>Övning</h2>
<p>Under testet kommer du att få en uppgift som liknar den här. Din uppgift är att avgöra om påståendet är sant eller inte utifrån informationen på korten. Tryck på ett kort för att läsa mer. Korten med <span class="symbol-icon">+</span> talar för påståendet och korten med <span class="symbol-icon">−</span> talar emot det. Du kan öppna korten i vilken ordning du vill.</p>      <p><strong>Påstående: Erik var hemma i sin lägenhet hela kvällen.</strong></p>
      <div class="option-list">${optionDivs}</div>
      <div id="info-modal">
        <div id="modal-content">
          <h3 id="modal-heading"></h3>
          <p id="modal-text"></p>
          <button id="modal-close" type="button">Stäng</button>
        </div>
      </div>
    `;
  },
  choices: ["Fortsätt"],
  save_trial_parameters: { stimulus: false },

  // on_load kopplar klick-interaktivitet när HTML:en är inlagd i DOM
  on_load: function() {
    // Lyssna på klick på varje informationskort
    document.querySelectorAll(".mouselab-option").forEach(option => {
      option.addEventListener("click", () => {
        const card = practiceCards[option.id];
        document.getElementById("modal-heading").textContent = card.label;
        document.getElementById("modal-text").textContent = card.description;
        document.getElementById("info-modal").style.display = "flex";
        option.classList.add("visited");
      });
    });

    // När deltagaren stänger ett infokort: dölj modalen
    document.getElementById("modal-close").addEventListener("click", () => {
      document.getElementById("info-modal").style.display = "none";
    });
  },
  data: { category: "practice" }
};

// =============================================================================
// HUVUD-MOUSELAB — körs för varje narrativ via buildMouselabTrial()
// =============================================================================

// --- Datainsamling: klickordning och tidsåtgång per knapp ---
// pre = före mittfrågan, post = efter mittfrågan
var preClickData = [];
var preClickOrder = [];
var postClickData = [];
var postClickOrder = [];
var currentStartTime = 0;     // när deltagaren öppnade senaste infokort
var postMidPhase = false;     // blir true när mittfrågan besvarats
var midAnswers = { credibility: null, refugee_status: null };

function buildMouselabTrial() {
  let positiveOnLeft;
  let displayOrder = [];
  const infoData = {};
  const labelData = {};

  return {
    type: jsPsychHtmlButtonResponse,

    // stimulus körs precis innan trialen visas och bygger upp hela HTML-strukturen
    stimulus: function() {
      const options   = jsPsych.evaluateTimelineVariable('options');
      const name      = jsPsych.evaluateTimelineVariable('person_name');
      const bigQ      = jsPsych.evaluateTimelineVariable('bigQ');
      const lowLabel  = jsPsych.evaluateTimelineVariable('low_label');
      const highLabel = jsPsych.evaluateTimelineVariable('high_label');

      // Para ihop positiva och negativa alternativ slumpmässigt (ett par per rad)
      const positives = jsPsych.randomization.shuffle(options.filter(opt => opt.type === 'positive'));
      const negatives = jsPsych.randomization.shuffle(options.filter(opt => opt.type === 'negative'));
      positiveOnLeft = Math.random() < 0.5;
      const randomizedOptions = positives.flatMap((opt, i) =>
        positiveOnLeft ? [opt, negatives[i]] : [negatives[i], opt]);

      // Bygg uppslagstabeller och spara display-ordningen (position 1 = övre vänster, rad för rad)
      displayOrder = randomizedOptions.map(opt => opt.label);
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

      return `
      <h2>Ytterligare information om fallet</h2>
      <p>Välj vilka kort med information du vill läsa. Korten med <span class="symbol-icon">+</span> stödjer ${name}s berättelse och <span class="symbol-icon">−</span> går emot den.</p>
      <div class="option-list">
        ${optionDivs.join('\n        ')}
      </div>

      <div id="info-modal">
        <div id="modal-content">
          <h3 id="modal-heading"></h3>
          <p id="modal-text"></p>
          <button id="modal-close" type="button">Stäng</button>
        </div>
      </div>

      <div id="mid-modal">
        <div id="mid-modal-content">
          <h3>Efter 4 kort ber vi dig besvara frågorna igen</h3>
          <div class="mid-question">
            <p>Hur trovärdig tyckte du att ${name} verkade?</p>
            <div class="slider-wrapper">
              <input type="range" class="jspsych-slider" id="mid-credibility-slider" min="0" max="100" value="50" step="1">
            </div>
            <div class="slider-label-row">
              <span>Inte alls trovärdig</span>
              <span>Mycket trovärdig</span>
            </div>
          </div>
          <div class="mid-question">
            <p>Anser du att ${name} ${bigQ}</p>
            <div class="slider-wrapper">
              <input type="range" class="jspsych-slider" id="mid-refugee-slider" min="0" max="100" value="50" step="1">
            </div>
            <div class="slider-label-row">
              <span>${lowLabel}</span>
              <span>${highLabel}</span>
            </div>
          </div>
          <button id="mid-modal-close" type="button">Fortsätt</button>
        </div>
      </div>
    `;
    },

    choices: ["Fortsätt"],
    save_trial_parameters: { stimulus: false },

    // on_load kopplar all interaktivitet när HTML:en är inlagd i DOM
    on_load: function() {
      let totalClicks = 0;
      let midShown = false;
      let hasClosedCard = false;

      const continueBtn = document.querySelector('.jspsych-btn');
      continueBtn.disabled = true;

      // Lyssna på klick på varje informationskort
      document.querySelectorAll(".mouselab-option").forEach(option => {
        option.addEventListener("click", () => {
          if (postMidPhase) {
            postClickOrder.push(labelData[option.id]);
          } else {
            preClickOrder.push(labelData[option.id]);
          }

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

        if (!hasClosedCard) {
          hasClosedCard = true;
          continueBtn.disabled = false;
        }

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

        function updateMidState() {
          midCloseBtn.disabled = !(credibilityTouched && refugeeTouched);
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

        midCloseBtn.addEventListener("click", () => {
          midModal.style.display = "none";
          postMidPhase = true;
        });
      }
    },

    // on_finish sparar all insamlad data till jsPsych när deltagaren klickar "Fortsätt"
    on_finish: function(data) {
      data.category = 'mouselab';
      data.pre_click_order = preClickOrder.join(' > ');
      data.pre_click_durations = JSON.stringify(preClickData);
      data.post_click_order = postClickOrder.join(' > ');
      data.post_click_durations = JSON.stringify(postClickData);
      data.mid_main_q_credibility = midAnswers.credibility;
      data.mid_main_q_refugee_status = midAnswers.refugee_status;
      data.positive_side = positiveOnLeft ? 'left' : 'right';
      data.display_order = displayOrder.join(' > ');
    }
  };
}
