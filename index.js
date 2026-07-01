// Säkerställ korrekt skalning på mobil — måste ske innan jsPsych renderar något
document.head.insertAdjacentHTML('beforeend', '<meta name="viewport" content="width=device-width, initial-scale=1.0">');

// === STEG 0: Initiera jsPsych ===
// 0 = normalt avslut, 1 = kvalitetsbortfall (attention check), 2 = screenout (inget samtycke)
var complete_type = 0;

var jsPsych = initJsPsych({
  on_finish: function() {
    if (complete_type == 0) {
      window.location = 'https://unsplash.com'; // TODO: byt till Maximiles complete-URL
    } else if (complete_type == 1) {
      window.location = 'https://earthview.withgoogle.com'; // TODO: byt till Maximiles quality-URL
    } else if (complete_type == 2) {
      window.location = 'https://www.google.com'; // TODO: byt till Maximiles screenout-URL
    }
  }
});

// Cognition.run sätter CONDITION automatiskt; URL-parameter (?condition=N) används för lokal testning
if (typeof CONDITION === 'undefined') {
  CONDITION = parseInt(jsPsych.data.getURLVariable('condition')) || 1;
}

// debug
//console.log('CONDITION:', CONDITION);

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
  save_trial_parameters: { stimulus: false },
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
  save_trial_parameters: { stimulus: false },
  data: { category: "consent" },
  on_finish: function (data) {
    if (data.response == 1) {
      complete_type = 2;
      jsPsych.abortExperiment();
    }
  }
};

// === STEG 3: Övnings-mouselab (körs en gång efter consent, innan experimentet) ===


// === STEG 4: Övnings-fråga ===
const practice_binary_q = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<div class="text-content"><p>Var Erik hemma i sin lägenhet hela kvällen?</p></div>`,
  choices: ["Ja", "Nej"],
  save_trial_parameters: { stimulus: false },
  data: { category: "practice" },
  on_load: function() {
    document.getElementById('jspsych-html-button-response-btngroup').classList.add('btn-row');
  }
};
// = transition snurran =
const experiment_start_transition = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<div style="display:flex;align-items:center;justify-content:center;height:200px;"><div class="loading-spinner"></div></div>`,
  choices: "NO_KEYS",
  trial_duration: 1100,
  save_trial_parameters: { stimulus: false },
  data: { category: "transition" }
};

// === STEG 5: Introduction to experiment ===
const instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function() {
    const body = jsPsych.evaluateTimelineVariable('instructions_body');
    return `<div class="text-content"><h2>Instruktioner till studien</h2>${body.split('\n\n').map(p => `<p>${p}</p>`).join('')}</div>`;
  },
  choices: ["Starta"],
  save_trial_parameters: { stimulus: false },
  data: { category: "test_instructions" }
};

// === STEG 6: Narrativsidan ===
const narrative_page = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function() {
    const heading = jsPsych.evaluateTimelineVariable('narrative_heading');
    const content = jsPsych.evaluateTimelineVariable('narrative_content');
    return `<div class="text-content"><h2>${heading}</h2><p>${content.replace(/\n/g, '</p><p>')}</p></div>`;
  },
  choices: ["Fortsätt"],
  save_trial_parameters: { stimulus: false },
  data: function() {
    return { category: "narrative_page", assigned_narrative: jsPsych.evaluateTimelineVariable('stimulus_id') };
  }
};

// === STEG 7: Pre main questions — före mouselab ===
const pre_main_q_1 = {
  type: jsPsychHtmlSliderResponse,
  stimulus: function() {
    return `<p>Hur trovärdig tyckte du att ${jsPsych.evaluateTimelineVariable('person_name')} verkade?</p>`;
  },
  labels: ["Inte alls trovärdig", "Mycket trovärdig"],
  slider_width: 200,
  require_movement: true,
  button_label: "Fortsätt",
  save_trial_parameters: { stimulus: false },
  data: { category: "pre_main_q", question: "credibility_pre" }
};

const pre_main_q_2 = {
  type: jsPsychHtmlSliderResponse,
  stimulus: function() {
    return `<p>Anser du att ${jsPsych.evaluateTimelineVariable('person_name')} ${jsPsych.evaluateTimelineVariable('bigQ')}</p>`;
  },
  labels: function() {
    return [jsPsych.evaluateTimelineVariable('low_label'), jsPsych.evaluateTimelineVariable('high_label')];
  },
  slider_width: 200,
  require_movement: true,
  button_label: "Fortsätt",
  save_trial_parameters: { stimulus: false },
  data: { category: "pre_main_q", question: "main_judgment_pre" }
};

const pre_main_questions = [pre_main_q_1, pre_main_q_2];

// === STEG 8: pre binary question ===
const pre_binary_q = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function() {
    const name = jsPsych.evaluateTimelineVariable('person_name');
    const bigQ = jsPsych.evaluateTimelineVariable('bigQ');
    return `<div class="text-content"><p>Ta ett ögonblick och tänk igenom allt du fått veta om ${name}s fall. Anser du att ${name} ${bigQ}</p></div>`;
  },
  choices: ["Ja", "Nej"],
  save_trial_parameters: { stimulus: false },
  data: { category: "pre_binary", question: "binary_judgment_pre" },
  on_load: function() {
    document.getElementById('jspsych-html-button-response-btngroup').classList.add('btn-row');
  }
};

// === STEG 9: Uppmärksamhetskontroll ===
const attention_1 = {
  type: jsPsychHtmlSliderResponse,
  stimulus: `<div class="text-content">
    <p>Svaret på denna frågan är väldigt enkel, det är bara att flytta markören så långt åt vänster som du kan. Detta är en uppmärksamhetskontroll.</p>
    <p>Baserat på instruktionen ovan, flytta markören på skalan nedan.</p>
  </div>`,
  labels: ["Vänster", "Höger"],
  slider_start: 50,
  slider_width: 200,
  require_movement: true,
  button_label: "Fortsätt",
  save_trial_parameters: { stimulus: false },
  data: { category: "attention_check" },
  on_finish: function(data) {
    if (data.response >= 5) {
      complete_type = 1;
      jsPsych.abortExperiment();
    }
  }
};

// === STEG 10: Instruktioner inför mouselab ===
const pre_mouselab_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function() {
    const name = jsPsych.evaluateTimelineVariable('person_name');
    const bigQ = jsPsych.evaluateTimelineVariable('bigQ');
    return `<div class="text-content"><h2>Ytterligare information om fallet</h2><p>Nu har du läst ${name}s egen berättelse. På nästa sida kommer du att få mer information om fallet. En del av information där stödjer ${name}s berättelse och markeras med  <span class="symbol-icon">+</span> . Annat talar emot den och markeras då med  <span class="symbol-icon">−</span> . När du läst så mycket information du tycker du behöver om fallet gör du en ny bedömning om ${name} ${bigQ} Du kan läsa informationen i vilken ordning du vill.</p></div>`;
  },
  choices: ["Fortsätt"],
  save_trial_parameters: { stimulus: false },
  data: { category: "mouselab_instructions" }
};

// === STEG 11: mouselabben and mid main questions ===

// === STEG 12: Post main questions — efter mouselab ===
const post_main_q_1 = {
  type: jsPsychHtmlSliderResponse,
  stimulus: function() {
    return `<p>Hur trovärdig tyckte du att ${jsPsych.evaluateTimelineVariable('person_name')} verkade?</p>`;
  },
  labels: ["Inte alls trovärdig", "Mycket trovärdig"],
  slider_width: 200,
  require_movement: true,
  button_label: "Fortsätt",
  save_trial_parameters: { stimulus: false },
  data: { category: "post_main_q", question: "credibility_post" }
};

const post_main_q_2 = {
  type: jsPsychHtmlSliderResponse,
  stimulus: function() {
    return `<p>Anser du att ${jsPsych.evaluateTimelineVariable('person_name')} ${jsPsych.evaluateTimelineVariable('bigQ')}</p>`;
  },
  labels: function() {
    return [jsPsych.evaluateTimelineVariable('low_label'), jsPsych.evaluateTimelineVariable('high_label')];
  },
  slider_width: 200,
  require_movement: true,
  button_label: "Fortsätt",
  save_trial_parameters: { stimulus: false },
  data: { category: "post_main_q", question: "main_judgment_post" }
};

const post_main_questions = [post_main_q_1, post_main_q_2];
// === STEG 13: post binary question ===
const post_binary_q = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function() {
    const name = jsPsych.evaluateTimelineVariable('person_name');
    const bigQ = jsPsych.evaluateTimelineVariable('bigQ');
    return `<div class="text-content">
      <p>Det här är ditt slutgiltiga beslut. Du har fått möjlighet att ta del av ${name}s egen berättelse och av ytterligare bevis i fallet. Ta en stund och väg samman allt du fått veta innan du bestämmer dig. Ska ${name} ${bigQ}</p>
    </div>`;
  },
  choices: ["Ja", "Nej"],
  save_trial_parameters: { stimulus: false },
  data: { category: "post_binary", question: "binary_judgment_post" },
  on_load: function() {
    document.getElementById('jspsych-html-button-response-btngroup').classList.add('btn-row');
  }
};

// === STEG 14: motivation ===
const motivation_q = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function() {
    const name = jsPsych.evaluateTimelineVariable('person_name');
    return `
      <div class="text-content">
        <h2>Motivering av beslut</h2>
        <p>Tänk tillbaka på både ${name}s egen berättelse och den ytterligare informationen du fick läsa. Skriv kortfattat ner vad du minns från var och en, gärna i stödord. Ta med det som hade betydelse för fallet, inte din allmänna åsikt.</p>
        <textarea id="motivation-textarea" rows="8" style="width:100%;box-sizing:border-box;font-size:16px;margin-top:12px;padding:8px;border:1px solid #ccc;border-radius:2px;"></textarea>
      </div>`;
  },
  choices: ["Fortsätt"],
  save_trial_parameters: { stimulus: false },
  data: { category: "motivation" },
  on_load: function() {
    setTimeout(() => document.activeElement?.blur(), 50);
    const btn = document.querySelector('.jspsych-btn');
    btn.disabled = true;
    document.getElementById('motivation-textarea').addEventListener('input', function() {
      btn.disabled = this.value.trim().length === 0;
    });
  },
  on_finish: function(data) {
    const ta = document.getElementById('motivation-textarea');
    data.motivation = ta ? ta.value : '';
  }
};

// === STEG 15: Demografifrågor ===
const demographics = {
  type: jsPsychSurveyText,
  questions: [
    { prompt: "Vilket år är du född?", placeholder: "åååå", required: true, name: "birth_year", columns: 6 },
    { prompt: "Vilket kön har du?", placeholder: "man/kvinna", required: true, name: "gender", columns: 12 }
  ],
  button_label: "Fortsätt",
  data: { category: "demographics" }
};

// === STEG 16: avslutningsskärm ===
const finish_screen = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div class="text-content"> <p> Tack för att du har varit med i vår studie. Den handlar om hur vi bedömer andras trovärdighet, och hur detta påverkas av, bland annat, hur känslosam en berättelse eller en berättare är. Resultaten kommer att användas i vetenskaplig forskning. </p>
    <p> Projektet är finansierat av Riksbankens Jubileumsfond, och vill du veta mer om det kan du läsa här: </p>
    <p> <a href="https://www.rj.se/bidrag/2023/hur-paverkar-kanslomassiga-berattelser-informationssokning-i-juridiskt-relevanta-beslut/" target="_blank"> Projektinformation på RJs hemsida. </a> </p>
    <p> Har du frågor om projektet eller av annan anledning vill komma i kontakt med oss når du ansvarig forskare på: annika.wallin@lucs.lu.se </p>
    <p> Tack igen för ditt bidrag! </p>
    <p><strong> Tryck avsluta för att avsluta studien och registrera ditt deltagande. </strong> </p>
    </div>`,
  choices: ['Avsluta'],
  save_trial_parameters: { stimulus: false },
  data: { category: 'finish' }
};




// === FLÖDE ===
const narrative_procedure = {
  timeline: [instructions, narrative_page, ...pre_main_questions, pre_binary_q, attention_1, pre_mouselab_instructions, mouselab_list, ...post_main_questions, post_binary_q, motivation_q],
  timeline_variables: stimuli_narrative,
  sample: {
    type: "custom",
    fn: function() { return [CONDITION - 1]; }
  }
};

timeline.push(consent_info, consent_provide, practice_mouselab, practice_binary_q, experiment_start_transition, narrative_procedure, demographics, finish_screen);
jsPsych.run(timeline);
