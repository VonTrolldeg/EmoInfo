// === STEG 1: Initiera jsPsych ===
var jsPsych = initJsPsych({
  on_finish: function() {
    jsPsych.getDisplayElement().innerHTML = '<div class="text-content"><h2>Tack för ditt deltagande. Du kan nu stänga fönstret.</h2></div>';
  }
});

var timeline = [];

// === STEG 2: Consent ===
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

// === STEG 2b: Instruktionssida ===
const instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div class="text-content">
      <h2>Instruktioner till studien</h2>
      <p>Tack för att du vill delta.</p>
      <p>I det här experimentet kommer du att läsa en berättelse av en person där de beskriver en situation utifrån sitt perspektiv. Vi vill att du läser den noga för att sedan kunna svara på frågor kopplat till den. Därefter får du tillgång till ytterligare information om personen och situationen för att själv skapa dig en uppfattning om händelsen. Du får välja själv vilken information du vill ta del av och i vilken ordning.</p>
      <p>Det finns inga rätta eller felaktiga svar, vi är nyfikna på hur just du tänker. När du är redo trycker du på knappen nedan för att börja.</p>
    </div>
  `,
  choices: ["Starta"]
};

var narrative_page;

const data = stimuli;

// === STEG 3: Narrativsidan (slumpar emotionell eller neutral berättelse) ===
const randomIndex = Math.floor(Math.random() * data.narratives.length);
const selectedNarrative = data.narratives[randomIndex];

narrative_page = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<div class="text-content"><h2>${selectedNarrative.heading}</h2><p>${selectedNarrative.content.replace(/\n/g, '</p><p>')}</p></div>`,
  choices: ["Fortsätt"],
  save_trial_parameters: { stimulus: false },
  data: { assigned_narrative: selectedNarrative.id }
};

// === STEG 4: Pre main questions — före mouselab ===
// TODO: Om fler frågor läggs till här — överväg att samla alla på en sida med custom HTML istället för en jsPsych-trial per fråga.
const pre_main_q_1 = {
  type: jsPsychHtmlSliderResponse,
  stimulus: `<p>${stimuli.main_questions.credibility}</p>`,
  labels: ["Inte alls trovärdig", "Mycket trovärdig"],
  slider_width: 200,
  require_movement: true,
  button_label: "Fortsätt",
  data: { question: "credibility_pre" }
};

const pre_main_q_2 = {
  type: jsPsychHtmlSliderResponse,
  stimulus: `<p>${stimuli.main_questions.refugee_status}</p>`,
  labels: ["Nej", "Ja"],
  slider_width: 200,
  require_movement: true,
  button_label: "Fortsätt",
  data: { question: "refugee_status_pre" }
};

const pre_main_questions = [pre_main_q_1, pre_main_q_2];

// === STEG 5: Instruktioner inför mouselab ===
const pre_mouselab_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<div class="text-content"><h2>${stimuli.mouselab.heading}</h2><p>${stimuli.pre_mouselab_instructions}</p></div>`,
  choices: ["Fortsätt"]
};

// === STEG 6: mouselabben ===

// === STEG 7: Post main questions — efter mouselab ===
// TODO: Om fler frågor läggs till här — överväg att samla alla på en sida med custom HTML istället för en jsPsych-trial per fråga.
const post_main_q_1 = {
  type: jsPsychHtmlSliderResponse,
  stimulus: `<p>${stimuli.main_questions.credibility}</p>`,
  labels: ["Inte alls trovärdig", "Mycket trovärdig"],
  slider_width: 200,
  require_movement: true,
  button_label: "Fortsätt",
  data: { question: "credibility_post" }
};

const post_main_q_2 = {
  type: jsPsychHtmlSliderResponse,
  stimulus: `<p>${stimuli.main_questions.refugee_status}</p>`,
  labels: ["Nej", "Ja"],
  slider_width: 200,
  require_movement: true,
  button_label: "Fortsätt",
  data: { question: "refugee_status_post" }
};

const post_main_questions = [post_main_q_1, post_main_q_2];


// === FLÖDE ===
timeline.push(consent_info, consent_provide, instructions, narrative_page, ...pre_main_questions, pre_mouselab_instructions, mouselab_list, ...post_main_questions);
jsPsych.run(timeline);
