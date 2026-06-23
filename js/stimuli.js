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
    instructions_body: "Du kommer strax att få läsa en berättelse från en person som söker asyl i Sverige. Tänk dig att du arbetar på Migrationsverket. Din uppgift är att avgöra om du tror att personen talar sanning eller inte. Du ska också bedöma om personen bör få flyktingstatus i Sverige eller inte. \n\nBakgrund: Haile Gebremedhin anländer från Addis Abeba och säger sig tillhöra den tigreanska etniska minoriteten i huvudstaden. Han har identifierat sig med ett etiopiskt id-kort utfärdat i Addis Abeba som verkar vara äkta. Var snäll och läs texten noggrant. Du kommer få svara på flera frågor om den efter att du läst klart.",
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
    bigQ: "bör få flyktingstatus i Sverige?",
    motivation_prompt_yes: "Du valde att bevilja Haile flyktingstatus baserat på hans berättelse och den ytterligare informationen. Motivera vad som gjorde att du valde det beslutet:",
    motivation_prompt_no: "Du valde att neka Haile flyktingstatus baserat på hans berättelse och den ytterligare informationen. Motivera vad som gjorde att du valde det beslutet:"
  },

  // === KONDITION 3: Narrativ 2 — neutral (PLATSHÅLLARE) ===
  {
    stimulus_id: "Hasse_neutral",
    person_name: "Hasse",
    narrative_heading: "Hasse berättar",
    narrative_content: "Det var mycket den där onsdagen. Jag åkte direkt från arbetet till mina barns skolpjäs. Det var stressigt, jag behövde verkligen skynda mig, men jag hann precis dit innan föreställningen började. Jag var stolt när jag såg mitt barn på scen uppträdande som Klas Klättermus. Jag vill inte missa sådana stunder.\nJag har arbetat på Bättre Bygge under många år, och det har varit en del toppar och dalar under den tiden. Jag började som byggarbetare, men sedan jag fått vissa ryggbesvär fick jag ändra på hur jag arbetade. Jag kunde inte längre arbeta fysiskt med att bygga och jag var osäker på hur mitt fortsatta arbetsliv skulle se ut.\nJag flyttades över till att leda byggprojekt istället. Jag var inte säker på att jag skulle få chansen, så jag blev positivt överraskad. Jag tycker faktiskt att min praktiska erfarenhet gör mig till en bra projektledare, och jag är glad att jag fick chansen att byta bana utan att behöva lämna byggbranschen. Jag har liksom en fot på kontoret och en på byggarbetsplatsen. Jag trivs på jobbet. Det finns inte på kartan att jag skulle göra något skadligt mot min arbetsgivare.\nDet är sant att jag har haft skulder till banken som jag nyligen betalade av, men det är för att jag var tvungen att hjälpa min syster, som haft ekonomiska problem med sin blomsteraffär. Hon har kämpat med sin affär, och kan jag hjälpa till gör jag det gärna. Jag lånade ut pengar till henne som jag precis fick tillbaka, och då kunde jag till slut reglera skulden.\nJag har inte varit i trassel med lagen på tjugo år och är rädd om min anställning. Då var jag ung och dum, nu har jag familj och ansvar och ett arbete jag trivs med. Varför skulle jag äventyra det för lite kontanter?\nDet är otrevligt att anklagas för ett brott som jag inte har begått. Det är inte roligt att vara i en domstol och jag oroar mig för vad mina barn ska tänka om mig. Jag tycker om min arbetsgivare och skulle inte stjäla från företaget.",
    instructions_body: "Du kommer strax att få läsa en berättelse från en person som misstänks för brott i Sverige. Föreställ dig att du arbetar som nämndeman i en domstol. Din uppgift är att avgöra om du tror att personen talar sanning eller inte. Du ska också bedöma ifall du tror att personen är skyldig.\n\nBakgrund: Byggnadsfirman Bättre Bygge har ett kassaskåp där man förvarar en större handkassa. Arton personer har tillgång till kassaskåpet, projektledare, kontorsarbetare och så vidare. Kassaskåpet registrerar när det har varit öppet. En onsdag i oktober öppnades kassaskåpet klockan 19.14 och dagen efter upptäcks det att handkassan är borta.\n\nVar snäll och läs texten noggrant. Du kommer få svara på flera frågor om den efter att du läst klart.",
    options: [
      { id: "hasse_pos_1",  label: "Alibi – Sylvia",      type: "positive", description: "Sylvia, som också arbetar på Bättre Bygge, såg Hasse på skolan klockan 20 när han gick ut ur lokalerna tillsammans med sina barn. Hon menar att det tar mellan 45 och 50 minuter att köra från Bättre Bygge till skolan vid den tiden på kvällen." },
      { id: "hasse_pos_3",  label: "Laglydig vuxenliv",   type: "positive", description: "Under sitt vuxna liv har Hasse inte haft kontakt med polisen, inte ens för fortkörning. Han har skaffat familj och barn och anses vara en laglydig och hårt arbetande person." },
      { id: "hasse_pos_1b", label: "Alibi – Sylvia",      type: "positive", description: "Sylvia, som också arbetar på Bättre Bygge, såg Hasse på skolan klockan 20 när han gick ut ur lokalerna tillsammans med sina barn. Hon menar att det tar mellan 45 och 50 minuter att köra från Bättre Bygge till skolan vid den tiden på kvällen." },
      { id: "hasse_pos_3b", label: "Laglydig vuxenliv",   type: "positive", description: "Under sitt vuxna liv har Hasse inte haft kontakt med polisen, inte ens för fortkörning. Han har skaffat familj och barn och anses vara en laglydig och hårt arbetande person." },
      { id: "hasse_neg_1",  label: "Dyr märkesklocka",    type: "negative", description: "Hasse köpte sig en dyr märkesklocka i samband med inbrottet, trots att han oftast är ganska försiktig med sina pengar." },
      { id: "hasse_neg_2",  label: "Kriminella kontakter",type: "negative", description: "Hasse arresterades för ett lägenhetsinbrott i sin ungdom, och är fortfarande kompis med flera av de figurer han hade samröre med då. Två av dessa är hälare som är kända av polisen." },
      { id: "hasse_neg_1b", label: "Dyr märkesklocka",    type: "negative", description: "Hasse köpte sig en dyr märkesklocka i samband med inbrottet, trots att han oftast är ganska försiktig med sina pengar." },
      { id: "hasse_neg_2b", label: "Kriminella kontakter",type: "negative", description: "Hasse arresterades för ett lägenhetsinbrott i sin ungdom, och är fortfarande kompis med flera av de figurer han hade samröre med då. Två av dessa är hälare som är kända av polisen." }
    ],
    bigQ: "är skyldig?",
    motivation_prompt_yes: "Du bedömde Hasse som skyldig till stölden baserat på hans berättelse och den ytterligare informationen. Motivera vad som gjorde att du valde det beslutet:",
    motivation_prompt_no: "Du bedömde Hasse som oskyldig till stölden baserat på hans berättelse och den ytterligare informationen. Motivera vad som gjorde att du valde det beslutet:"
  },

  // === KONDITION 4: Narrativ 2 — emotionell (PLATSHÅLLARE) ===
  {
    stimulus_id: "Hasse_emotion",
    person_name: "Hasse",
    narrative_heading: "Hasse berättar",
    narrative_content: "Den där onsdagen var en av de mest hektiska dagarna i mitt liv. Jag åkte direkt från arbetet till mina barns skolpjäs. Jag var så stressad att jag knappt hann andas, men jag kom precis i tid innan föreställningen började. Mitt hjärta svämmade över av stolthet när jag såg mitt barn på scenen som Klas Klättermus. Det var en stund jag inte skulle missa för allt i världen.\nJag har arbetat på Bättre Bygge i många år, och min tid där har varit som en bergochdalbana. Jag började som byggarbetare, men när jag drabbades av svåra ryggbesvär kändes det som om min värld rasade samman. Jag var tvungen att lämna det fysiska arbetet bakom mig, något som jag älskade, och jag var rädd för framtiden.\nNär jag fick chansen att leda byggprojekt istället, kände jag en enorm lättnad och tacksamhet. Jag tycker faktiskt att min praktiska erfarenhet gör mig till en bra projektledare, och jag är så tacksam för möjligheten att få fortsätta arbeta inom byggbranschen, men på ett sätt som min kropp klarar av. Jag har liksom en fot på kontoret och en på byggarbetsplatsen. Jag älskar verkligen mitt jobb. Jag skulle aldrig utsätta mina kära kollegor och denna fina firma för något hemskt.\nDet är sant att jag har haft skulder till banken som jag nyligen betalade av, men det var för att jag var tvungen att hjälpa min syster som kämpade med sin blomsteraffär. Hon har haft det så svårt, och jag kunde inte stå bredvid och se henne lida. Jag lånade ut pengar till henne, och när hon äntligen kunde betala tillbaka, kunde jag till slut reglera skulden.\nJag har inte varit i trassel med lagen på tjugo år, och jag är så rädd om min anställning. Då var jag ung och dum, men nu har jag en familj och ett ansvar, och ett arbete jag verkligen trivs med. Varför skulle jag äventyra allt detta för lite kontanter?\nDet känns enormt obehagligt och fruktansvärt frustrerande att bli anklagad för ett brott jag vet att jag inte har begått. Att sitta i en domstol är en svår upplevelse, och jag oroar mig ständigt för vad mina barn ska tänka om mig. Jag känner starkt för Bättre Bygg och skulle aldrig stjäla från oss.",
    instructions_body: "Du kommer strax att få läsa en berättelse från en person som misstänks för brott i Sverige. Föreställ dig att du arbetar som nämndeman i en domstol. Din uppgift är att avgöra om du tror att personen talar sanning eller inte. Du ska också bedöma ifall du tror att personen är skyldig.\n\nBakgrund: Byggnadsfirman Bättre Bygge har ett kassaskåp där man förvarar en större handkassa. Arton personer har tillgång till kassaskåpet, projektledare, kontorsarbetare och så vidare. Kassaskåpet registrerar när det har varit öppet. En onsdag i oktober öppnades kassaskåpet klockan 19.14 och dagen efter upptäcks det att handkassan är borta.\n\nVar snäll och läs texten noggrant. Du kommer få svara på flera frågor om den efter att du läst klart.",
    options: [
      { id: "hasse_pos_1",  label: "Alibi – Sylvia",      type: "positive", description: "Sylvia, som också arbetar på Bättre Bygge, såg Hasse på skolan klockan 20 när han gick ut ur lokalerna tillsammans med sina barn. Hon menar att det tar mellan 45 och 50 minuter att köra från Bättre Bygge till skolan vid den tiden på kvällen." },
      { id: "hasse_pos_3",  label: "Laglydig vuxenliv",   type: "positive", description: "Under sitt vuxna liv har Hasse inte haft kontakt med polisen, inte ens för fortkörning. Han har skaffat familj och barn och anses vara en laglydig och hårt arbetande person." },
      { id: "hasse_pos_1b", label: "Alibi – Sylvia",      type: "positive", description: "Sylvia, som också arbetar på Bättre Bygge, såg Hasse på skolan klockan 20 när han gick ut ur lokalerna tillsammans med sina barn. Hon menar att det tar mellan 45 och 50 minuter att köra från Bättre Bygge till skolan vid den tiden på kvällen." },
      { id: "hasse_pos_3b", label: "Laglydig vuxenliv",   type: "positive", description: "Under sitt vuxna liv har Hasse inte haft kontakt med polisen, inte ens för fortkörning. Han har skaffat familj och barn och anses vara en laglydig och hårt arbetande person." },
      { id: "hasse_neg_1",  label: "Dyr märkesklocka",    type: "negative", description: "Hasse köpte sig en dyr märkesklocka i samband med inbrottet, trots att han oftast är ganska försiktig med sina pengar." },
      { id: "hasse_neg_2",  label: "Kriminella kontakter",type: "negative", description: "Hasse arresterades för ett lägenhetsinbrott i sin ungdom, och är fortfarande kompis med flera av de figurer han hade samröre med då. Två av dessa är hälare som är kända av polisen." },
      { id: "hasse_neg_1b", label: "Dyr märkesklocka",    type: "negative", description: "Hasse köpte sig en dyr märkesklocka i samband med inbrottet, trots att han oftast är ganska försiktig med sina pengar." },
      { id: "hasse_neg_2b", label: "Kriminella kontakter",type: "negative", description: "Hasse arresterades för ett lägenhetsinbrott i sin ungdom, och är fortfarande kompis med flera av de figurer han hade samröre med då. Två av dessa är hälare som är kända av polisen." }
    ],
    bigQ: "är skyldig?",
    motivation_prompt_yes: "Du bedömde Hasse som skyldig till stölden baserat på hans berättelse och den ytterligare informationen. Motivera vad som gjorde att du valde det beslutet:",
    motivation_prompt_no: "Du bedömde Hasse som oskyldig till stölden baserat på hans berättelse och den ytterligare informationen. Motivera vad som gjorde att du valde det beslutet:"
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
    bigQ: "[FRÅGA SAKNAS]",
    motivation_prompt_yes: "[TEXT SAKNAS]",
    motivation_prompt_no: "[TEXT SAKNAS]"
  }

];
