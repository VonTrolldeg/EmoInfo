// === STEG 0: Initiera jsPsych ===
var jsPsych = initJsPsych();

var mouselab_list = buildMouselabTrial();

var timeline = [];

// === STEG 1: Consent information ===
const consent_info = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div class="text-content">
      <h2>Välkommen</h2>
      <p>Vi undrar om du vill vara med i vår studie om att bedöma andras berättelser. Här nedanför finns information om studien. När du läst all information kommer du att få frågan om du vill vara med i studien. Svarar du ja, länkas du vidare till själva studien.</p>
      <p><strong>Observera att det är viktigt att du gör studien i en sittning. Du ska inte lämna studien och återkomma vid ett senare tillfälle.</strong></p>
      <h3>Syfte</h3>
      <p>Studiens syfte är att bättre förstå hur vi bedömer trovärdighet. Resultaten kommer att användas i vetenskaplig forskning.</p>
      <h3>Procedur</h3>
      <p>När du deltar i studien kommer du att läsa igenom en berättelse från en person som du ska bedöma. Sedan ber vi dig svara på frågor om hur du uppfattade personen och dess berättelse. Vi kommer att samla in dina svar och reaktioner på berättelsen och vad du tror om den.</p>
      <h3>Risker och nytta</h3>
      <p>Vi förväntar oss inte att du utsätts för några fysiska risker när du deltar i studien. Det skulle dock kunna vara så att några försökspersoner upplever att det är känslomässigt ansträngande att läsa berättelsen. Om du tycker att det känns jobbigt kan du avsluta ditt deltagande när helst du vill utan att uppge varför du väljer att avsluta deltagandet.</p>
      <h3>Konfidentialitet</h3>
      <p>All information som samlas in under undersökningen kommer att vara konfidentiell och anonym. Ditt namn och annan information som kan identifiera dig kommer inte att sparas eller delas med någon. Om andra forskare är intresserade av studien kommer de att få tillgång till våra rådata för att säkerställa öppen vetenskaplig forskning. Sammanställd data från studien kommer att presenteras i vetenskapliga arbeten och på seminarier och konferenser.</p>
      <p>Datan kommer att lagras i enlighet med Lunds universitets (Sverige) riktlinjer. Studien har blivit godkänd av svenska etikprövningsmyndigheten och har diarienummer 2024-02311-01.</p>
      <h3>Frivilligt deltagande</h3>
      <p>Att delta i studien är frivilligt. Du kan avsluta ditt deltagande när du vill utan att behöva förklara varför.</p>
      <h3>Kontaktinformation</h3>
      <p>Om du har frågor eller funderingar rörande undersökningen kan du kontakta ansvarig forskare på <a href="mailto:annika.wallin@lucs.lu.se">annika.wallin@lucs.lu.se</a></p>
      <p><strong>På nästa sida kan du ge ditt medgivande till att delta i studien.</strong></p>
    </div>
  `,
  choices: ["Fortsätt till medgivande"],
  data: { category: "consent" }
};

// === STEG 2: Consent  ===
const consent_provide = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div class="text-content">
      <h2>Samtycke</h2>
      <p>Att delta i studien är frivilligt. Du kan avsluta ditt deltagande när du vill utan att behöva förklara varför. Klicka i så fall på "Nej, jag samtycker inte till att delta".</p>
      <p>Om du istället väljer "Ja, jag samtycker till att delta" påbörjas experimentet. När du trycker på knappen intygar du att du har läst och förstått den information du fått, som att ditt deltagande är frivilligt och att du kan avsluta det när du vill.</p>
    </div>
  `,
  choices: ["Ja, jag samtycker till att delta", "Nej, jag samtycker inte till att delta"],
  data: { category: "consent" },
  on_finish: function (data) {
    if (data.response == 1) {
      jsPsych.abortExperiment();
    }
  }
};

// === STEG 3: Introduction to experiment ===
const instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<div class="text-content"><h2>${stimuli.instructions.heading}</h2>${stimuli.instructions.body.split('\n\n').map(p => `<p>${p}</p>`).join('')}</div>`,
  choices: [stimuli.instructions.button]
};

var narrative_page;

const data = stimuli;

// === STEG 4: Narrativsidan (slumpar emotionell eller neutral berättelse) ===
const randomIndex = Math.floor(Math.random() * data.narratives.length);
const selectedNarrative = data.narratives[randomIndex];

narrative_page = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<div class="text-content"><h2>${selectedNarrative.heading}</h2><p>${selectedNarrative.content.replace(/\n/g, '</p><p>')}</p></div>`,
  choices: ["Fortsätt"],
  save_trial_parameters: { stimulus: false },
  data: { assigned_narrative: selectedNarrative.id }
};

// Sätter slider-bredden till 75% av skärmbredden, max 500px
function sliderOnLoad() {
  const w = Math.min(Math.round(window.innerWidth * 0.75), 500);
  document.querySelectorAll('input[type="range"]').forEach(el => {
    el.style.width = w + 'px';
  });
}

// === STEG 5: Pre main questions — före mouselab ===
// TODO: Om fler frågor läggs till här — överväg att samla alla på en sida med custom HTML istället för en jsPsych-trial per fråga.
const pre_main_q_1 = {
  type: jsPsychHtmlSliderResponse,
  stimulus: `<p>${stimuli.main_questions.credibility}</p>`,
  labels: ["Inte alls trovärdig", "Mycket trovärdig"],
  require_movement: true,
  button_label: "Fortsätt",
  data: { question: "credibility_pre" },
  on_load: sliderOnLoad
};

const pre_main_q_2 = {
  type: jsPsychHtmlSliderResponse,
  stimulus: `<p>${stimuli.main_questions.refugee_status}</p>`,
  labels: ["Nej", "Ja"],
  require_movement: true,
  button_label: "Fortsätt",
  data: { question: "refugee_status_pre" },
  on_load: sliderOnLoad
};

const pre_main_questions = [pre_main_q_1, pre_main_q_2];

// === STEG 6: pre binary question ===
const pre_binary_q = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<div class="text-content"><p>${stimuli.binary_questions.pre}</p></div>`,
  choices: stimuli.binary_questions.buttons,
  data: { question: "refugee_status_binary_pre" },
  on_load: function() {
    document.getElementById('jspsych-html-button-response-btngroup').classList.add('btn-row');
  }
};

// === STEG 7: Instruktioner inför mouselab ===
const pre_mouselab_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<div class="text-content"><h2>${stimuli.mouselab.heading}</h2><p>${stimuli.pre_mouselab_instructions}</p></div>`,
  choices: ["Fortsätt"]
};

// === STEG 8: mouselabben and mid main questions ===

// === STEG 9: Post main questions — efter mouselab ===
const post_main_q_1 = {
  type: jsPsychHtmlSliderResponse,
  stimulus: `<p>${stimuli.main_questions.credibility}</p>`,
  labels: ["Inte alls trovärdig", "Mycket trovärdig"],
  require_movement: true,
  button_label: "Fortsätt",
  data: { question: "credibility_post" },
  on_load: sliderOnLoad
};

const post_main_q_2 = {
  type: jsPsychHtmlSliderResponse,
  stimulus: `<p>${stimuli.main_questions.refugee_status}</p>`,
  labels: ["Nej", "Ja"],
  require_movement: true,
  button_label: "Fortsätt",
  data: { question: "refugee_status_post" },
  on_load: sliderOnLoad
};

const post_main_questions = [post_main_q_1, post_main_q_2];
// === STEG 10: post binary question ===
const post_binary_q = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<div class="text-content"><p>${stimuli.binary_questions.post}</p></div>`,
  choices: stimuli.binary_questions.buttons,
  data: { question: "refugee_status_binary_post" },
  on_load: function() {
    document.getElementById('jspsych-html-button-response-btngroup').classList.add('btn-row');
  }
};

// === STEG 11: motivation ===
const motivation_q = {
  type: jsPsychSurveyText,
  preamble: `
    <div class="text-content">
      <h2>${stimuli.motivation.heading}</h2>
      <p>${stimuli.motivation.instruction}</p>
    </div>`,
  questions: function() {
    const lastBinary = jsPsych.data.get().filter({ question: "refugee_status_binary_post" }).last(1).values()[0];
    const isYes = lastBinary && lastBinary.response === 0;
    const prompt = isYes ? stimuli.motivation.prompt_yes : stimuli.motivation.prompt_no;
    return [{ prompt, rows: 8, name: 'motivation' }];
  },
  button_label: stimuli.motivation.button
};

// === STEG 12: avslutningsskärm ===
const finish_screen = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div class='box-1;' text-align: left'> <p> Tack för att du har varit med i vår studie. Den handlar om hur vi bedömer andras trovärdighet, och hur detta påverkas av, bland annat, hur känslosam en berättelse eller en berättare är. Resultaten kommer att användas i vetenskaplig forskning. </p>
    <p> Projektet är finansierat av Riksbankens Jubileumsfond, och vill du veta mer om det kan du läsa här: </p>
    <p> <a href="https://www.rj.se/bidrag/2023/hur-paverkar-kanslomassiga-berattelser-informationssokning-i-juridiskt-relevanta-beslut/" target="_blank"> Projektinformation på RJs hemsida. </a> </p>
    <p> Har du frågor om projektet eller av annan anledning vill komma i kontakt med oss når du ansvarig forskare på: annika.wallin@lucs.lu.se </p>
    <p> Tack igen för ditt bidrag! </p>
    <p><strong> Tryck avsluta för att avsluta studien och registrera ditt deltagande. </strong> </p>
    </div>`,
  choices: ['Avsluta'],
  data: { category: 'finish' }
};

// === FLÖDE ===
timeline.push(consent_info, consent_provide, instructions, narrative_page, ...pre_main_questions, pre_binary_q, pre_mouselab_instructions, mouselab_list, ...post_main_questions, post_binary_q, motivation_q, finish_screen);
jsPsych.run(timeline);
