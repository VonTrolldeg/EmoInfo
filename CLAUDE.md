# EmoInfo

Ett kognitionsexperiment som testar beslutsfattande i juridiska beslut. Där information som deltagaren tar del av under testet påverkar beslutsfattandet. 
Byggt med jsPsych och hostat på Cognition.run.
Deltagare läser en berättelse (en av sex konditioner) och gör bedömningar via sliders och mouselab.

> Experimentet är i första hand byggt för att fungera på mobiltelefon. Tänk på det innan du ändrar layout, fontstorlekar eller interaktivitet.

## Projektstruktur

- `index.js` — hela experimentets timeline (consent, narrativ, frågor, avslut)
- `js/stimuli.js` — narrativinnehåll för alla 6 konditioner (3 berättelser × neutral/emotionell)
- `js/mouselab.js` — mouselabben (ej jsPsych, se nedan)
- `css/style.css` — layout och utseende
- `jspsych/` — jsPsych-biblioteket (rör ej)

## Konditioner

CONDITION är ett heltal 1–6, satt automatiskt av Cognition.run.
Lokalt testas med `?condition=N` i URL:en.

| CONDITION | Person | Variant    |
|-----------|--------|------------|
| 1         | Haile  | Neutral    |
| 2         | Haile  | Emotionell |
| 3         | Hasse  | Neutral    |
| 4         | Hasse  | Emotionell |
| 5         | Sanna  | Neutral    |
| 6         | Sanna  | Emotionell |

## Deploy

Pushes till `main` triggar GitHub Actions (`.github/workflows/cognition-github-actions.yml`)
som laddar upp till Cognition.run automatiskt. Cognition.run hanterar också
datainsamlingen — trial-data samlas in av jsPsych och sparas som CSV på plattformen
när deltagaren når `on_finish`. Ingen explicit sparlogik behövs i koden.

## Viktiga konventioner

- `index.js` följer jsPsych 7-konventioner så noga som möjligt, men vissa delar är
  anpassade för mobilskärm. Ändra inte dessa utan att testa på mobil — t.ex.
  fritextfältet i motiveringsfrågan.
- Mouselabben är inte byggd i jsPsych och ligger därför i `js/mouselab.js` som ett
  separat vanilla JS-lager. Den kopplas in i jsPsych-timelines via `buildMouselabTrial()`.
- Redirect-URL:er i `on_finish` (index.js rad ~10) är platshållare — byt mot Maximiles
  riktiga URL:er innan studien går live.
- Stimuli-fälten `bigQ`, `low_label`, `high_label`, `person_name` används av generiska
  trial-templates — ändra inte fältnamnen.
- Använd `class="jspsych-slider"` på custom range-inputs för att matcha jsPsych:s stil.
