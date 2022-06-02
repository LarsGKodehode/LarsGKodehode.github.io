// valgte å legge oppgavene inn som funksjoner for å enkelt kjøre igjennom alle/utvalgte, se nederst i koden,
//hpåer jeg ikke ødela noe oppsett du har

// har satt inn mer utfyllendes kommentarer, ble muligens noe mye.

// valgte å bruke norske variabel og funksjonsnavn. jeg er usikker på hvordan næringslivet stiller seg til
// å få norske ord inn i koding
// vs
// dra nytte av internasjonal kompetanse, uten ordbok



// ----- DEL 1 -----

// oppgave 1
const loremStreng =
  "Lorem Ipsum er rett og slett dummytekst fra og for trykkeindustrien. Lorem Ipsum har vært bransjens standard for dummytekst helt siden 1500-tallet, da en ukjent boktrykker stokket en mengde bokstaver for å lage et prøveeksemplar av en bok. Lorem Ipsum har tålt tidens tann usedvanlig godt, og har i tillegg til å bestå gjennom fem århundrer også tålt spranget over til elektronisk typografi uten vesentlige endringer. Lorem Ipsum ble gjort allment kjent i 1960-årene ved lanseringen av Letraset-ark med avsnitt fra Lorem Ipsum, og senere med sideombrekkingsprogrammet Aldus PageMaker som tok i bruk nettopp Lorem Ipsum for dummytekst.";

function oppgave1() {
  const maksOrd = 30;
  const loremStrengOrd = loremStreng.split("");

  if (loremStrengOrd.length > maksOrd) {
    console.log(`Strengen er lengre enn ${maksOrd} ord, med sine ${loremStrengOrd.length} ord`);
  } else {
    console.log(`Strengen har ${loremStrengOrd.length} ord, det er mindre enn ${maksOrd} ord`);
  };
};



// oppgave 2
function oppgave2() {
  for (let i = 1; i <= 10; i++) {
    console.log(i);
  };
};



// oppgave 3
// list over strenger som er dratt ut av den orginale teksten
let strengUtdrag = [];

// teksten jeg valgte inneholdt ikke veldig mange tilfeller av ordene du ønsket så valgte noen andre,
// problemer med håndtering av strenger som forekommer som del av ord, trenger å lese meg opp på regex
const strengUtvalg = [
  "til",
  " er ",
  "og",
  "jeg eksisterer ikke",
];

function oppgave3() {
  // en [list av lister for [lengden, indeksene]] til strengene som søkes etter
  let alleIndekser = [];

  // setter alt til små bokstaver for å fange alle tilfeller,
  //muligens ikke ønskelig,
  // respekterer lokale lingvistiske finurligheter 
  const småStreng = loremStreng.toLocaleLowerCase();

  // går igjenom hvert ord i listen vår
  for (streng of strengUtvalg) {
    let nyIndeks = småStreng.indexOf(streng); // indeksen til første forekomst av strengen
    if (nyIndeks === -1) { continue }; // hopper over ord som ikke forekommer
    let strengForekomster = []; // indeksene til forekomster av strengen

    // finner alle tilfeller av strengen og putter de i listen
    while (nyIndeks !== -1) {
      strengForekomster.push(nyIndeks);
      nyIndeks = småStreng.indexOf(streng, nyIndeks + 1); // flytter start indeksen
    };

    const strengLengde = streng.length;
    alleIndekser.push([strengLengde, strengForekomster]);
  };

  let utdrag = [];
  const omegne = 5;

  // dra ut streng med omegne
  for ([lengde, streng] of alleIndekser) { //løper igjenom alle strengene
    streng.forEach(indeks => { // løper igjennom alle forekomstene
      if (indeks < omegne) { // ungår å dra ut deler av slutten
        strengUtdrag.push(loremStreng.slice(indeks, indeks + lengde + omegne));
      } else {
        strengUtdrag.push(loremStreng.slice(indeks - omegne, indeks + lengde + omegne));
      };
    });
  };
  console.log(strengUtdrag);
};



// oppgave 4
let nyTekst = "";

function oppgave4() {
  nyTekst = strengUtdrag.join(" ");
  console.log(nyTekst);
};


// oppgave 5
let oversattTekst = "";
// oversettelse av streng utvalget fra oppgave 3
const strengUtvalgOversatt = [
  "to",
  " is ",
  "and",
  "I does not exist",
];

function oppgave5() {
  oversattTekst = nyTekst.slice(); // kopierer inn den nye teksten
  for (i in strengUtvalg) {
    oversattTekst = oversattTekst.replaceAll(strengUtvalg[i], strengUtvalgOversatt[i]);
  };
  console.log(oversattTekst);
};



// ----- DEL 2 -----

// oppgave 6
function oppgave6() {
  let liv = 3;
  const spillOverTekst = `Livet er over`;
  while (liv > 0) {
    const inputTekst = `Du har ${liv} liv igjen\nØnsker du å fortsette å leve?\n("nei" for å miste ett liv)`;
    let input = prompt(inputTekst).toLocaleLowerCase();
    if (input === "nei") { liv -= 1 };
  };
  alert(spillOverTekst);
};



// ----- DEL 3 -----

// oppgave 7
// list over alle ordene i tekst streng
const ordListe = loremStreng.split(" ");
let nyListeTall = [];
let nyListeOrd = [];

// enkle løsninger for oss som har problemer med å velge tilfeldig
function oppgave7() {
  for (let i = 0; i < 10; i++) {
    nyListeTall[i] = Math.floor(Math.random() * 1000);
  };

  console.log(`\nTi tilfeldige tall:`)
  for (i in nyListeTall) {
    console.log(`${i} : ${nyListeTall[i]}`);
  };

  for (let i = 0; i < 10; i++) {
    const tilfeldigIndeks = Math.floor(Math.random() * ordListe.length);
    nyListeOrd[i] = ordListe[tilfeldigIndeks];
  };

  console.log(`\nTi tilfeldige ord:`)
  for (i in nyListeOrd) {
    console.log(`${i} : ${nyListeOrd[i]}`);
  };
};



// ----- DEL 4 -----

// oppgave 8
const nyttTall = 6; // tallet vi ønsker å overskrive med

function oppgave8() {
  for (let i = 0; i < nyListeTall.length; i++) {
    if (i === 0) { continue }; // hopper over første
    if (i === nyListeTall.length - 1) { continue }; // hopper over siste
    nyListeTall.fill(nyttTall, i, i + 1); // bruker en array.methode for å sette tallet
  };

  console.log(`\nAlle tallene, bortsett fra første og siste er nå satt til ${nyttTall}:`)
  for (i in nyListeTall) {
    console.log(`${i} : ${nyListeTall[i]}`);
  };
};



// kjøring av oppgave funksjoner, pakker de ut viss de er nested (nestet? / nøstet?)
function kjørOppgaver(pakke) {
  switch (typeof (pakke)) {
    case "function": // kjører funksjonen
      console.log(`\nkjører: ${pakke.name}`);
      pakke();
      break;
    case "object": // leter dypere i pakken
      for (const objekt of pakke) {
        kjørOppgaver(objekt);
      };
      break;
    case "string": // logger strenger
      console.log(pakke);
      break;
    default: // alt annet
      console.log(`"${typeof (pakke)}" er ikke et akseptert argument for "${kjørOppgaver.name}"`);
  };
};


// list over oppgaver, med streng skiller
const oppgaver = [
  "\n\n\n----- Del 1 ------",
  oppgave1,
  oppgave2,
  [oppgave3,
    oppgave4,
    oppgave5,
  ],
  "\n\n\n----- Del 2 ------",
  //oppgave6,
  "\n\n\n----- Del 3 ------",
  oppgave7,
  "\n\n\n----- Del 4 ------",
  oppgave8,
];

//console.clear();
// bruk listen over oppgaver eller enkelt elementer som argumenter
kjørOppgaver(oppgaver);