# Browser Game Plan — Millionaire-Style Quiz Game

## Goal

Build a browser game inspired by *Who Wants to Be a Millionaire?* using custom questions, custom branding, and extensible features.

## Product Vision

Create a polished single-page web game where players answer multiple-choice questions, climb a prize ladder, use lifelines, and either win the top prize or lose on a wrong answer.

The game should be:

* easy to play in the browser
* easy to update with new questions
* easy to extend with custom features later
* visually polished and responsive

---

## Recommended Stack

### Frontend

* React
* Vite
* CSS or Tailwind CSS

### Data Storage

* Phase 1: local JSON file for questions
* Phase 2: optional admin panel and backend
* Phase 3: optional database for leaderboards and user profiles

### Optional Backend Later

* Supabase or Firebase

---

## Core Features

### MVP

* Start screen
* Game screen
* One question shown at a time
* Four answer choices
* Correct/wrong answer handling
* Prize ladder
* Game over screen
* Winner screen
* Custom question dataset

### Phase 2 Features

* 50:50 lifeline
* Ask the audience lifeline
* Phone a friend lifeline
* Timer per question
* Safe checkpoints
* Sound effects
* Animations and transitions

### Phase 3 Features

* Categories
* Difficulty levels
* Local save/progress
* Local leaderboard
* Question packs
* Custom themes/skins

### Phase 4 Features

* Admin panel for adding/editing questions
* Online leaderboard
* User accounts
* Multiplayer or challenge mode

---

## Game Flow

1. Player opens the game.
2. Player sees the start screen.
3. Player starts a new game.
4. Game loads question 1.
5. Player selects an answer.
6. Game validates the answer.
7. If correct:

   * update prize ladder
   * move to next question
8. If wrong:

   * end game
   * show final winnings
9. If player clears final question:

   * show winner screen

---

## Main Screens

### 1. Start Screen

Purpose:

* present the game title
* show play button
* optionally show instructions and settings

Possible UI:

* game logo/title
* Start Game button
* How to Play button
* Settings button
* Optional category selector

### 2. Game Screen

Purpose:

* display current question
* display answers
* display lifelines
* display timer
* display prize ladder

### 3. Result Modal / Feedback Layer

Purpose:

* show whether the answer was correct or wrong
* briefly pause before moving on or ending the game

### 4. Game Over Screen

Purpose:

* show result after losing
* show final winnings
* offer restart

### 5. Winner Screen

Purpose:

* celebrate completion
* show top prize won
* offer replay

---

## Data Model

Questions should be stored in a JSON file.

Example structure:

```json
[
  {
    "id": 1,
    "question": "What is the capital of Bulgaria?",
    "answers": ["Sofia", "Plovdiv", "Varna", "Burgas"],
    "correctAnswer": "Sofia",
    "difficulty": 1,
    "category": "Geography"
  }
]
```

### Recommended Question Fields

* `id`
* `question`
* `answers`
* `correctAnswer`
* `difficulty`
* `category`
* `explanation` (optional)
* `isFinalQuestion` (optional)

---

## State Model

The game should manage:

* current question index
* current winnings
* prize ladder progress
* selected answer
* used lifelines
* timer state
* game status

Example shape:

```js
{
  currentQuestionIndex: 0,
  currentWinnings: 0,
  gameStatus: "playing",
  usedLifelines: {
    fiftyFifty: false,
    askAudience: false,
    phoneFriend: false
  },
  timeLeft: 30
}
```

---

## Prize Ladder

Define prize levels in a simple array.

Example:

```js
const prizeLevels = [
  100,
  200,
  300,
  500,
  1000,
  2000,
  4000,
  8000,
  16000,
  32000,
  64000,
  125000,
  250000,
  500000,
  1000000
];
```

### Safe Milestones

Recommended safe checkpoints:

* 1000
* 32000

If the player loses after passing a checkpoint, they keep the checkpoint amount.

---

## Lifeline Logic

### 50:50

* remove two incorrect answers
* keep correct answer visible
* allow only one use per game

### Ask the Audience

* generate answer percentages
* correct answer should usually receive the highest percentage
* harder questions may have more spread in the votes

### Phone a Friend

* show a text-based hint
* correct hint chance can scale with difficulty

---

## Timer

Recommended timer:

* 20 to 30 seconds per question

Timer behavior:

* starts when question loads
* stops when answer is locked
* if timer reaches zero, treat it as wrong answer or timeout state

---

## UX and Visual Style

Target feel:

* dramatic
* clean
* high contrast
* responsive for desktop first, mobile second

Recommended design elements:

* dark background
* glowing buttons
* highlighted selected answer
* animated prize ladder
* modal transitions
* sound cues for suspense and results

Custom branding ideas:

* unique color scheme
* custom logo/title
* original sounds
* themed host/narration text

---

## Suggested Project Structure

```txt
millionaire-game/
  src/
    components/
      StartScreen.jsx
      GameScreen.jsx
      QuestionCard.jsx
      AnswerButton.jsx
      MoneyLadder.jsx
      LifelinesPanel.jsx
      Timer.jsx
      ResultModal.jsx
      GameOverScreen.jsx
      WinnerScreen.jsx
    data/
      questions.json
    hooks/
      useGameState.js
      useTimer.js
    utils/
      gameLogic.js
      lifelines.js
      prizeLogic.js
    App.jsx
    main.jsx
  public/
    sounds/
    images/
```

---

## Component Plan

### `App`

* top-level routing/state shell
* handles screen switching

### `StartScreen`

* title
* start button
* optional settings

### `GameScreen`

* renders active question
* includes ladder, timer, lifelines

### `QuestionCard`

* displays question text
* renders answers

### `AnswerButton`

* one answer option
* handles selected/locked/disabled states

### `MoneyLadder`

* shows all prize levels
* highlights current step
* highlights checkpoints

### `LifelinesPanel`

* contains all lifeline buttons
* disables used ones

### `Timer`

* displays countdown
* updates every second

### `ResultModal`

* feedback for correct/wrong result

### `GameOverScreen`

* final loss state
* replay option

### `WinnerScreen`

* final win state
* replay option

---

## Logic Modules

### `gameLogic.js`

Should handle:

* answer validation
* question progression
* win/loss conditions
* checkpoint calculations

### `lifelines.js`

Should handle:

* 50:50 logic
* audience simulation
* phone friend hint generation

### `prizeLogic.js`

Should handle:

* prize ladder values
* checkpoint fallback logic
* formatting winnings for display

---

## Development Phases

## Phase 1 — Playable MVP

Deliverables:

* React app scaffolded with Vite
* Start screen
* Question rendering
* Answer selection
* Correct/wrong logic
* Prize ladder
* Game over / winner states
* Questions loaded from JSON

Success criteria:

* fully playable basic game with at least 5–10 custom questions

## Phase 2 — Core Gameplay Polish

Deliverables:

* 50:50 lifeline
* timer
* answer locking
* result transitions
* safe checkpoints
* better styling
* sounds

Success criteria:

* game feels complete and fun

## Phase 3 — Feature Expansion

Deliverables:

* ask the audience
* phone a friend
* categories
* difficulty support
* localStorage save data
* local leaderboard

Success criteria:

* game has replay value and personalization

## Phase 4 — Content and Admin Tools

Deliverables:

* question editor/admin UI
* import/export questions
* online storage
* player profiles
* online leaderboard

Success criteria:

* non-developers can maintain content easily

---

## Technical Tasks Breakdown

### Setup

* initialize Vite React project
* configure folder structure
* add styling system
* add assets folder

### Data Layer

* create `questions.json`
* create prize configuration
* define game constants

### Core Mechanics

* render questions
* validate answers
* progress through rounds
* end game correctly

### Lifelines

* implement 50:50
* implement audience simulation
* implement phone friend logic

### UI Polish

* animations
* responsive layout
* sounds
* transitions

### Persistence

* save high score in localStorage
* save settings/theme choice in localStorage

---

## Risks and Considerations

### Scope Creep

Avoid adding too many features before the base game works.

### Data Quality

Questions should be well-balanced and difficulty-ranked, or the game will feel unfair.

### Copyright / Branding

Do not copy the original game’s exact branding, sounds, or protected assets. Build an inspired-by version with original visuals, wording, and presentation.

### Accessibility

Consider:

* keyboard navigation
* high contrast text
* clear answer states
* readable timer and buttons

---

## Stretch Ideas

* animated host avatar
* voice narration
* custom categories per game session
* endless mode
* duel mode
* daily challenge
* random question packs
* achievement system

---

## Definition of Done

The project is complete when:

* the game runs in the browser without errors
* custom questions can be added without changing core logic
* the full question flow works from start to finish
* win/lose states are clear
* lifelines work correctly
* UI is polished and responsive
* game can be deployed publicly

---

## Deployment Plan

Recommended options:

* Vercel
* Netlify
* GitHub Pages

Deployment goals:

* fast loading
* mobile-friendly layout
* easy updates when question JSON changes

---

## Next Step

Build the MVP first:

1. scaffold React + Vite app
2. add static question JSON
3. render one question with four answers
4. validate correct/wrong answer
5. add prize ladder
6. add end screens

After MVP works, add lifelines and polish.
