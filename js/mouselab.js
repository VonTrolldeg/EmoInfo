var preClickData = [];
var preClickOrder = [];
var postClickData = [];
var postClickOrder = [];
var currentStartTime = 0;
var postMidPhase = false;
var midAnswers = { credibility: null, refugee_status: null };

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const infoData = {};
const labelData = {};

var mouselab_list = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function() {
    const positives = shuffleArray(stimuli.options.filter(opt => opt.type === 'positive'));
    const negatives = shuffleArray(stimuli.options.filter(opt => opt.type === 'negative'));
    const randomizedOptions = positives.flatMap((opt, i) => [opt, negatives[i]]);

    randomizedOptions.forEach(opt => {
      infoData[opt.id] = opt.description;
      labelData[opt.id] = opt.label;
    });

    const optionDivs = randomizedOptions.map(opt =>
      `<button class="mouselab-option" id="${opt.id}" type="button">
        <span class="card-symbol">${opt.type === 'positive' ? '+' : '−'}</span>
        <span class="card-label">${opt.label}</span>
      </button>`
    );

    return `
    <h2>${stimuli.mouselab.heading}</h2>
    <p>${stimuli.mouselab.instructions}</p>
    <div class="option-list">
      ${optionDivs.join('\n      ')}
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
        <div class="mid-question">
          <p>${stimuli.main_questions.credibility}</p>
          <div class="slider-wrapper">
            <input type="range" class="jspsych-slider" id="mid-credibility-slider" min="0" max="100" value="50" step="1">
            <div class="slider-labels">
              <span>Inte alls trovärdig</span>
              <span>Mycket trovärdig</span>
            </div>
          </div>
        </div>
        <div class="mid-question">
          <p>${stimuli.main_questions.refugee_status}</p>
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
  on_load: function () {
    let totalClicks = 0;
    let midShown = false;

    document.querySelectorAll(".mouselab-option").forEach((option) => {
      option.addEventListener("click", () => {
        if (postMidPhase) {
          postClickOrder.push(option.id);
        } else {
          preClickOrder.push(option.id);
        }
        currentStartTime = Date.now();
        document.getElementById("modal-heading").textContent = labelData[option.id];
        document.getElementById("modal-text").textContent = infoData[option.id];
        document.getElementById("info-modal").style.display = "flex";
        option.classList.add("visited");
        totalClicks++;
      });
    });

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

      if (!midShown && totalClicks >= 4) {
        midShown = true;
        showMidModal();
      }
    });

    function showMidModal() {
      const midModal = document.getElementById("mid-modal");
      const midCloseBtn = document.getElementById("mid-modal-close");
      let credibilityTouched = false;
      let refugeeTouched = false;

      midModal.style.display = "flex";
      midCloseBtn.disabled = true;
      midCloseBtn.style.opacity = "0.6";
      midCloseBtn.style.cursor = "not-allowed";

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

      midCloseBtn.addEventListener("click", () => {
        midModal.style.display = "none";
        postMidPhase = true;
      });
    }
  },
  on_finish: function (data) {
    data.pre_click_order = preClickOrder.join(' > ');
    data.pre_click_durations = JSON.stringify(preClickData);
    data.post_click_order = postClickOrder.join(' > ');
    data.post_click_durations = JSON.stringify(postClickData);
    data.mid_main_q_credibility = midAnswers.credibility;
    data.mid_main_q_refugee_status = midAnswers.refugee_status;
  }
};
