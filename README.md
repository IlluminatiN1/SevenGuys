### G-Krav:

#### Kravlista:

- [x] En logga, splashscreen och appikon ska designas och användas. \*
- [x] Applikationen ska byggas med RN, Expo & TS. \*
- [x] Designen av appen ska utgå ifrån befintliga skisser, undantag kan ges men ska diskuteras med produktägare, godkännas och dokumenteras. \*

#### Hushåll:

- [ ] Ett hushåll ska ha ett namn och en genererad (enkel) kod så andra kan gå med i hushållet, namnet ska gå att ändra. \*

#### Konto:

- [x] En användare ska kunna registrera och logga in sig. \*
- [x] En användare ska kunna skapa ett nytt hushåll. \*
- [ ] En användare ska kunna gå med i ett hushåll genom att ange hushållets kod. \*

#### Profil:

- [ ] En användare ska kunna ange sitt namn. \*
- [ ] En användare ska kunna välja en avatar (emoji-djur + färg) från en fördefinierad lista. \*
- [ ] Valda avatarer ska inte kunna väljas av andra användare i hushållet. \*
- [ ] Avataren ska användas i appen för att visa vad användaren har gjort. \*

#### Sysslor:

- [ ] En ägare ska kunna lägga till sysslor att göra i hemmet. \*
- [x] En syssla ska ha ett namn, en beskrivning (text), hur ofta den ska göras (dagar), och en vikt som beskriver hur energikrävande den är. \*
- [ ] En ägare ska kunna redigera en syssla. \*

#### Dagsvyn:

- [ ] Alla sysslor ska listas i en dagsvy och ge en översikt kring vad som behöver göras. \*
- [ ] Utöver sysslans namn ska även vem/vilka som har gjort sysslan visas, hur många dagar sedan sysslan gjordes senast samt om den är försenad. \*
- [ ] När en användare väljer en syssla ska beskrivningen av sysslan visas och det ska även med ett enkelt tryck gå att markera sysslan som gjord. \*

#### Statistik:

- [ ] En användare ska kunna se fördelningen av gjorda sysslor mellan användarna i sitt hushåll. \*
- [ ] Varje statistikvy ska visa den totala fördelningen (inräknat vikterna för sysslorna) samt fördelning av varje enskild syssla. \*
- [ ] Det ska finnas en statistikvy över ”nuvarande vecka”. \*

---

1. create expo app
   npx create-expo-app@latest --template

-- Navigation

2. npm install @react-navigation/native
3. npx expo install react-native-screens react-native-safe-area-context
4. npm install @react-navigation/native-stack
   -- Top Tab navigation

5. npm install @react-navigation/material-top-tabs react-native-tab-view
6. npx expo install react-native-pager-view

-- Redux Toolkit

7. npm install @reduxjs/toolkit
8. npm install react-redux

-- React Paper

1. npm install react-native-paper
2. npm install react-native-vector-icons

REDOVISNING
del 1 - pitch (2-3 min)
vilka problem löser vi?

- strukturera sysslor för ett hushåll för tydligare översikt över vad som ska och behöver göras.
- se statistik över vem som gör vad och hur ofta
- lättare för alla medlemmar i hushållet att se alla sysslor som behövs göras

designval?

- redux: så vi enklare kan skicka runt states och delar upp koden till rätt ansvarsområde.
- react native paper: tidsbesparande pga färdiga komponenter (knappar, textfält etc), plattformsoberoende och responsiv (anpassar sig till iOS och android).
  Enkelt ändra på komponenternas utseende och stil.

del 2 - demo av app
registrering
logga in
profilsidan
skapa nytt hushåll
navigera till mockade hushåll
task listan visas
skapa nytt task
visa statistik

del 3 - reflektion av projekt
alla tar fram 2-3 punkter var som vi sammanställer sedan.

del 2+3 ca 20 min
