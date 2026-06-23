// === Narrativ-array för sex konditioner (3 berättelser × neutral/emotionell) ===
// Används av narrative_procedure i index.js via jsPsych timeline variables.
// CONDITION 1-2: Haile, CONDITION 3-4: Narrativ 2 (platshållare), CONDITION 5-6: Narrativ 3 (platshållare)

var stimuli_narrative = [

  // === KONDITION 1: Haile — neutral ===
  {
    stimulus_id: "haile_neutral",
    person_name: "Haile Gebremedhin",
    narrative_heading: "Haile berättar",
    narrative_content: "Jag heter Haile Gebremedhin. Jag har etniciteten tigrean, men jag är inte från regionen Tigray. Min familj kommer istället från landsbygden i Afar i norra Etiopien. Under kriget flydde många tigreaner från Afar till Addis Abeba. Det anses vara säkrare för tigreaner där, men jag har ingen familj eller bekanta i staden och har därför inte flyttat dit. Jag saknar även ett giltigt Addis Abeba-id-kort, vilket innebär att jag inte kan öppna ett bankkonto där. Däremot har jag ett pass, och det är enklare att förnya det än att ansöka om ett nytt. Det är konstigt men sant.\nMedan kriget pågick i Tigray var situationen svår för tigreaner i hela landet. Det var många hårda strider i min hemregion Afar, och både jag och många andra tigreaner blev arresterade på grund av den tigreanska etniciteten. Jag satt i fängelse en längre tid under undantagstillståndet i november 2021. Det har naturligtvis påverkat mig.\nJag är tigrean men jag har ingen koppling alls till TPLF (Tigreanska folkets befrielsefront). Jag är inte en terrorist och jag har inte heller begått något brott någonsin. Trots att jag har utbildning och erfarenhet har det varit svårt för mig att få arbete, eftersom det alla vet att jag är tigrean där jag bor. Det är tydligt hur landet ser ut: det finns inga tigreaner i parlamentet, det finns inga tigreaner i polisen. Vi är inte representerade någonstans.\nUnder kriget blev flera av mina tigreanska grannar grovt misshandlade på grund av att de bodde på fel ställe eller för etniciteten på deras id-kort. Det var en otrygg tid för tigreaner i Etiopien.\nTrots fredsavtalet 2022 känner jag mig fortfarande inte säker. Medierna uttrycker ofta olika negativa åsikter om tigreaner. Jag var frihetsberövad på grund av min etnicitet, och nyligen arresterade polisen mig igen. Jag släpptes dagen därpå, men de uttryckte att de inte tyckte om tigreaner och att jag skulle akta mig. Jag finns i deras register nu. Under kriget var det många tigreaner som inte återvände efter att de hade häktats.\nJag vill helst inte lämna mitt hem i Etiopien. Jag har inga släktingar eller vänner i Addis, och i Tigray är livet inte lätt. Jag saknar alternativ och har ingen som kan hjälpa mig om jag skulle behöva hjälp av någon annan. När min bror dog i en motorcykelolycka för ett halvår sedan så ser jag ingen väg till ett gott liv i Etiopien. Jag har ingen familj kvar. Jag är på egen hand och jag har inte längre samma anknytning till landet.\nJag är muslim och har tidigare fått stöd i moskén och i min tro, men det känns inte som att det räcker. Jag behöver lämna Etiopien även om beslutet är svårt.",
    instructions_body: "Tack för att du vill delta.\n\n Du kommer strax att få läsa en berättelse från en person som söker asyl i Sverige. Tänk dig att du arbetar på Migrationsverket. Din uppgift är att avgöra om du tror att personen talar sanning eller inte. Du ska också bedöma om personen bör få flyktingstatus i Sverige eller inte. \n\nBakgrund: Haile Gebremedhin anländer från Addis Abeba och säger sig tillhöra den tigreanska etniska minoriteten i huvudstaden. Han har identifierat sig med ett etiopiskt id-kort utfärdat i Addis Abeba som verkar vara äkta. Var snäll och läs texten noggrant. Du kommer få svara på flera frågor om den efter att du läst klart.",
    options: [
      { id: "religios_tillhorighet",          label: "Religion etnicitet",             type: "positive", description: "Det finns en muslimsk minoritet bland tigreanerna." },
      { id: "situationsutveckling_tigreaner", label: "Situationsutveckling tigreaner", type: "positive", description: "Hur starkt Etiopiens regering har agerat mot tigreaner har ändrat sig över tid, bland annat beroende på det tillfälliga läget i kriget i Tigray. Det kan alltså lätt förvärras igen." },
      { id: "rorelsefrihet_sanktioner",       label: "Rörelsefrihet sanktioner",       type: "positive", description: "Enligt den senaste landinformationen om Etiopien har statens åtgärder mot tigreaner utanför Tigray främst handlat om arresteringar och kvarhållanden. Man har också använt sig av ekonomiska sanktioner och försvårat resor." },
      { id: "etnisk_polarisering",            label: "Etnisk polarisering",            type: "positive", description: "Enligt den senaste landinformationen om Etiopien har polariseringen i det etiopiska samhället börjat öka, liksom samhällets fokus på etnicitet." },
      { id: "identitetshandlingar_etnicitet", label: "Identitetshandlingar",           type: "negative", description: "I Haile Gebremdhins identitetshandlingar framgår inte att hans etnicitet är tigreansk." },
      { id: "sprak_etnicitet",                label: "Språk etnicitet",                type: "negative", description: "Haile Gebremedhin har ingen tigreansk dialekt, trots att det är känt att man i Tigray har en utpräglad och lättigenkännlig dialekt." },
      { id: "arresteringar_tigreaner",        label: "Arresteringar: utveckling",      type: "negative", description: "Andelen arresteringar och kvarhållningar av tigreaner har enligt landinformationen minskat sedan början av 2022. Efter hösten 2022 finns ingen information om mass-arresteringar av tigreaner i Etiopien." },
      { id: "sakerhetssituation_tigray",      label: "Krigsbrott i Tigray",            type: "negative", description: "Det är enbart i regionen Tigray det finns kännedom om grova krigsbrott i dagsläget." }
    ],
    mouselab_heading: "Ytterligare information om fallet",
    bigQ: "bör få flyktingstatus i Sverige?",
    motivation_prompt_yes: "Du valde att bevilja Haile flyktingstatus baserat på hans berättelse och den ytterligare informationen. Motivera vad som gjorde att du valde det beslutet:",
    motivation_prompt_no: "Du valde att neka Haile flyktingstatus baserat på hans berättelse och den ytterligare informationen. Motivera vad som gjorde att du valde det beslutet:"
  },

  // === KONDITION 2: Haile — emotionell ===
  {
    stimulus_id: "haile_emotion",
    person_name: "Haile Gebremedhin",
    narrative_heading: "Haile berättar",
    narrative_content: "Jag heter Haile Gebremedhin. Jag har etniciteten tigrean, men jag är inte från regionen Tigray. Min familj kommer istället från landsbygden i det vackra Afar i norra Etiopien. Under kriget flydde många tigreaner från Afar till Addis Abeba. Det anses vara säkrare för tigreaner där, men jag har ingen familj eller ens någon jag känner i huvudstaden. Jag vågar inte flytta dit. Jag har inte ett Addis Abeba‑id‑kort, så jag kan inte ens öppna ett bankkonto där borta. Tack och lov har jag alltid haft ett pass, och att förnya det är en av få saker som fortfarande fungerar.\nMedan kriget pågick i Tigray var livet fruktansvärt svårt för tigreaner i hela landet. Det var fasansfulla strider i min hemregion Afar, och vi var många tigreaner som arresterades på grund av vår etnicitet. Jag satt fängslad en lång och jobbig tid under undantagstillståndet i november 2021. Det har påverkat mig så mycket.\nJag är tigrean, men jag har ingen koppling alls till TPLF (Tigreanska folkets befrielsefront). Jag är inte en terrorist. Jag har aldrig gjort något ont, aldrig begått något brott – bara försökt leva som alla andra. Ändå har det varit nästan omöjligt att få arbete, trots att jag både är utbildad och erfaren. Där jag bor vet alla att jag är tigrean, och jag känner hur de ser ner på mig. Det är lika illa i hela Etiopien: inga tigreaner i parlamentet, inga tigreaner i polisen. Det är som att vi inte räknas.\nUnder kriget blev flera av mina tigreanska grannar brutalt misshandlade, bara för att de bodde på fel ställe eller för etniciteten på deras id-kort. Under den här tiden var jag rädd hela tiden och det tror jag gällde för alla tigreaner.\nTrots fredsavtalet 2022 känner jag mig fortfarande inte säker någonstans. Media fortsätter att skriva fruktansvärda saker om tigreaner. Jag har redan suttit fängslad länge och det bara på grund av min etnicitet, och nyligen arresterade polisen mig igen. De släppte mig dagen därpå, men sa åt mig att akta mig – att de inte tyckte om tigreaner. Det väckte hemska minnen. Jag finns i deras register nu och de vet vem jag är. Under kriget var det så många som aldrig återvände efter att de häktats.\nJag vill verkligen inte lämna mitt hem. Jag har ingen familj eller vänner i Addis, och i Tigray är livet så väldigt svårt. Det finns ingenstans jag kan ta vägen och om något skulle hända finns det ingen som kan hjälpa mig längre. När min bror dog i en fruktansvärd motorcykelolycka för ett halvår sedan slutade jag hoppas på att någonsin kunna ha ett ens drägligt liv i Etiopien. Jag har ingen nära familj kvar alls nu och känner mig väldigt ensam. Nu finns det ingenting som håller mig kvar längre.\nJag är muslim och har tidigare fått stöd i moskén och i min tro, men det känns inte som att det räcker. Jag behöver lämna Etiopien, även om jag sörjer och det gör ont att fatta det beslutet.",
    instructions_body: "Tack för att du vill delta.\n\n Du kommer strax att få läsa en berättelse från en person som söker asyl i Sverige. Tänk dig att du arbetar på Migrationsverket. Din uppgift är att avgöra om du tror att personen talar sanning eller inte. Du ska också bedöma om personen bör få flyktingstatus i Sverige eller inte. \n\nBakgrund: Haile Gebremedhin anländer från Addis Abeba och säger sig tillhöra den tigreanska etniska minoriteten i huvudstaden. Han har identifierat sig med ett etiopiskt id-kort utfärdat i Addis Abeba som verkar vara äkta. Var snäll och läs texten noggrant. Du kommer få svara på flera frågor om den efter att du läst klart.",
    options: [
      { id: "religios_tillhorighet",          label: "Religion etnicitet",             type: "positive", description: "Det finns en muslimsk minoritet bland tigreanerna." },
      { id: "situationsutveckling_tigreaner", label: "Situationsutveckling tigreaner", type: "positive", description: "Hur starkt Etiopiens regering har agerat mot tigreaner har ändrat sig över tid, bland annat beroende på det tillfälliga läget i kriget i Tigray. Det kan alltså lätt förvärras igen." },
      { id: "rorelsefrihet_sanktioner",       label: "Rörelsefrihet sanktioner",       type: "positive", description: "Enligt den senaste landinformationen om Etiopien har statens åtgärder mot tigreaner utanför Tigray främst handlat om arresteringar och kvarhållanden. Man har också använt sig av ekonomiska sanktioner och försvårat resor." },
      { id: "etnisk_polarisering",            label: "Etnisk polarisering",            type: "positive", description: "Enligt den senaste landinformationen om Etiopien har polariseringen i det etiopiska samhället börjat öka, liksom samhällets fokus på etnicitet." },
      { id: "identitetshandlingar_etnicitet", label: "Identitetshandlingar",           type: "negative", description: "I Haile Gebremdhins identitetshandlingar framgår inte att hans etnicitet är tigreansk." },
      { id: "sprak_etnicitet",                label: "Språk etnicitet",                type: "negative", description: "Haile Gebremedhin har ingen tigreansk dialekt, trots att det är känt att man i Tigray har en utpräglad och lättigenkännlig dialekt." },
      { id: "arresteringar_tigreaner",        label: "Arresteringar: utveckling",      type: "negative", description: "Andelen arresteringar och kvarhållningar av tigreaner har enligt landinformationen minskat sedan början av 2022. Efter hösten 2022 finns ingen information om mass-arresteringar av tigreaner i Etiopien." },
      { id: "sakerhetssituation_tigray",      label: "Krigsbrott i Tigray",            type: "negative", description: "Det är enbart i regionen Tigray det finns kännedom om grova krigsbrott i dagsläget." }
    ],
    mouselab_heading: "Ytterligare information om fallet",
    bigQ: "bör få flyktingstatus i Sverige?",
    motivation_prompt_yes: "Du valde att bevilja Haile flyktingstatus baserat på hans berättelse och den ytterligare informationen. Motivera vad som gjorde att du valde det beslutet:",
    motivation_prompt_no: "Du valde att neka Haile flyktingstatus baserat på hans berättelse och den ytterligare informationen. Motivera vad som gjorde att du valde det beslutet:"
  },

  // === KONDITION 3: Narrativ 2 — neutral (PLATSHÅLLARE) ===
  {
    stimulus_id: "narrativ_2_neutral",
    person_name: "[NAMN SAKNAS]",
    narrative_heading: "[RUBRIK SAKNAS]",
    narrative_content: "[NARRATIVTEXT SAKNAS]",
    instructions_body: "[INSTRUKTIONSTEXT SAKNAS]",
    options: [
      { id: "n2_pos_1", label: "[ETIKETT SAKNAS]", type: "positive", description: "[TEXT SAKNAS]" },
      { id: "n2_pos_2", label: "[ETIKETT SAKNAS]", type: "positive", description: "[TEXT SAKNAS]" },
      { id: "n2_pos_3", label: "[ETIKETT SAKNAS]", type: "positive", description: "[TEXT SAKNAS]" },
      { id: "n2_pos_4", label: "[ETIKETT SAKNAS]", type: "positive", description: "[TEXT SAKNAS]" },
      { id: "n2_neg_1", label: "[ETIKETT SAKNAS]", type: "negative", description: "[TEXT SAKNAS]" },
      { id: "n2_neg_2", label: "[ETIKETT SAKNAS]", type: "negative", description: "[TEXT SAKNAS]" },
      { id: "n2_neg_3", label: "[ETIKETT SAKNAS]", type: "negative", description: "[TEXT SAKNAS]" },
      { id: "n2_neg_4", label: "[ETIKETT SAKNAS]", type: "negative", description: "[TEXT SAKNAS]" }
    ],
    mouselab_heading: "[RUBRIK SAKNAS]",
    bigQ: "[FRÅGA SAKNAS]",
    motivation_prompt_yes: "[TEXT SAKNAS]",
    motivation_prompt_no: "[TEXT SAKNAS]"
  },

  // === KONDITION 4: Narrativ 2 — emotionell (PLATSHÅLLARE) ===
  {
    stimulus_id: "narrativ_2_emotion",
    person_name: "[NAMN SAKNAS]",
    narrative_heading: "[RUBRIK SAKNAS]",
    narrative_content: "[NARRATIVTEXT SAKNAS]",
    instructions_body: "[INSTRUKTIONSTEXT SAKNAS]",
    options: [
      { id: "n2_pos_1", label: "[ETIKETT SAKNAS]", type: "positive", description: "[TEXT SAKNAS]" },
      { id: "n2_pos_2", label: "[ETIKETT SAKNAS]", type: "positive", description: "[TEXT SAKNAS]" },
      { id: "n2_pos_3", label: "[ETIKETT SAKNAS]", type: "positive", description: "[TEXT SAKNAS]" },
      { id: "n2_pos_4", label: "[ETIKETT SAKNAS]", type: "positive", description: "[TEXT SAKNAS]" },
      { id: "n2_neg_1", label: "[ETIKETT SAKNAS]", type: "negative", description: "[TEXT SAKNAS]" },
      { id: "n2_neg_2", label: "[ETIKETT SAKNAS]", type: "negative", description: "[TEXT SAKNAS]" },
      { id: "n2_neg_3", label: "[ETIKETT SAKNAS]", type: "negative", description: "[TEXT SAKNAS]" },
      { id: "n2_neg_4", label: "[ETIKETT SAKNAS]", type: "negative", description: "[TEXT SAKNAS]" }
    ],
    mouselab_heading: "[RUBRIK SAKNAS]",
    bigQ: "[FRÅGA SAKNAS]",
    motivation_prompt_yes: "[TEXT SAKNAS]",
    motivation_prompt_no: "[TEXT SAKNAS]"
  },

  // === KONDITION 5: Narrativ 3 — neutral (PLATSHÅLLARE) ===
  {
    stimulus_id: "narrativ_3_neutral",
    person_name: "[NAMN SAKNAS]",
    narrative_heading: "[RUBRIK SAKNAS]",
    narrative_content: "[NARRATIVTEXT SAKNAS]",
    instructions_body: "[INSTRUKTIONSTEXT SAKNAS]",
    options: [
      { id: "n3_pos_1", label: "[ETIKETT SAKNAS]", type: "positive", description: "[TEXT SAKNAS]" },
      { id: "n3_pos_2", label: "[ETIKETT SAKNAS]", type: "positive", description: "[TEXT SAKNAS]" },
      { id: "n3_pos_3", label: "[ETIKETT SAKNAS]", type: "positive", description: "[TEXT SAKNAS]" },
      { id: "n3_pos_4", label: "[ETIKETT SAKNAS]", type: "positive", description: "[TEXT SAKNAS]" },
      { id: "n3_neg_1", label: "[ETIKETT SAKNAS]", type: "negative", description: "[TEXT SAKNAS]" },
      { id: "n3_neg_2", label: "[ETIKETT SAKNAS]", type: "negative", description: "[TEXT SAKNAS]" },
      { id: "n3_neg_3", label: "[ETIKETT SAKNAS]", type: "negative", description: "[TEXT SAKNAS]" },
      { id: "n3_neg_4", label: "[ETIKETT SAKNAS]", type: "negative", description: "[TEXT SAKNAS]" }
    ],
    mouselab_heading: "[RUBRIK SAKNAS]",
    bigQ: "[FRÅGA SAKNAS]",
    motivation_prompt_yes: "[TEXT SAKNAS]",
    motivation_prompt_no: "[TEXT SAKNAS]"
  },

  // === KONDITION 6: Narrativ 3 — emotionell (PLATSHÅLLARE) ===
  {
    stimulus_id: "narrativ_3_emotion",
    person_name: "[NAMN SAKNAS]",
    narrative_heading: "[RUBRIK SAKNAS]",
    narrative_content: "[NARRATIVTEXT SAKNAS]",
    instructions_body: "[INSTRUKTIONSTEXT SAKNAS]",
    options: [
      { id: "n3_pos_1", label: "[ETIKETT SAKNAS]", type: "positive", description: "[TEXT SAKNAS]" },
      { id: "n3_pos_2", label: "[ETIKETT SAKNAS]", type: "positive", description: "[TEXT SAKNAS]" },
      { id: "n3_pos_3", label: "[ETIKETT SAKNAS]", type: "positive", description: "[TEXT SAKNAS]" },
      { id: "n3_pos_4", label: "[ETIKETT SAKNAS]", type: "positive", description: "[TEXT SAKNAS]" },
      { id: "n3_neg_1", label: "[ETIKETT SAKNAS]", type: "negative", description: "[TEXT SAKNAS]" },
      { id: "n3_neg_2", label: "[ETIKETT SAKNAS]", type: "negative", description: "[TEXT SAKNAS]" },
      { id: "n3_neg_3", label: "[ETIKETT SAKNAS]", type: "negative", description: "[TEXT SAKNAS]" },
      { id: "n3_neg_4", label: "[ETIKETT SAKNAS]", type: "negative", description: "[TEXT SAKNAS]" }
    ],
    mouselab_heading: "[RUBRIK SAKNAS]",
    bigQ: "[FRÅGA SAKNAS]",
    motivation_prompt_yes: "[TEXT SAKNAS]",
    motivation_prompt_no: "[TEXT SAKNAS]"
  }

];
