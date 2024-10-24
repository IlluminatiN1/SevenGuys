### G-Krav:

#### Kravlista:
- [ ] En logga, splashscreen och appikon ska designas och användas. *
- [ ] Applikationen ska byggas med RN, Expo & TS. *
- [ ] Designen av appen ska utgå ifrån befintliga skisser, undantag kan ges men ska diskuteras med produktägare, godkännas och dokumenteras. *

#### Hushåll:
- [ ] Ett hushåll ska ha ett namn och en genererad (enkel) kod så andra kan gå med i hushållet, namnet ska gå att ändra. *

#### Konto:
- [ ] En användare ska kunna registrera och logga in sig. *
- [ ] En användare ska kunna skapa ett nytt hushåll. *
- [ ] En användare ska kunna gå med i ett hushåll genom att ange hushållets kod. *

#### Profil:
- [ ] En användare ska kunna ange sitt namn. *
- [ ] En användare ska kunna välja en avatar (emoji-djur + färg) från en fördefinierad lista. *
- [ ] Valda avatarer ska inte kunna väljas av andra användare i hushållet. *
- [ ] Avataren ska användas i appen för att visa vad användaren har gjort. *

#### Sysslor:
- [ ] En ägare ska kunna lägga till sysslor att göra i hemmet. *
- [ ] En syssla ska ha ett namn, en beskrivning (text), hur ofta den ska göras (dagar), och en vikt som beskriver hur energikrävande den är. *
- [ ] En ägare ska kunna redigera en syssla. *

#### Dagsvyn:
- [ ] Alla sysslor ska listas i en dagsvy och ge en översikt kring vad som behöver göras. *
- [ ] Utöver sysslans namn ska även vem/vilka som har gjort sysslan visas, hur många dagar sedan sysslan gjordes senast samt om den är försenad. *
- [ ] När en användare väljer en syssla ska beskrivningen av sysslan visas och det ska även med ett enkelt tryck gå att markera sysslan som gjord. *

#### Statistik:
- [ ] En användare ska kunna se fördelningen av gjorda sysslor mellan användarna i sitt hushåll. *
- [ ] Varje statistikvy ska visa den totala fördelningen (inräknat vikterna för sysslorna) samt fördelning av varje enskild syssla. *
- [ ] Det ska finnas en statistikvy över ”nuvarande vecka”. *

----------------------------------------------------------------------------------------

1. create expo app
npx create-expo-app@latest --template

--  Navigation

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