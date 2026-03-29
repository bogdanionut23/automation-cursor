## Simple Playwright + TypeScript Testing Framework (Beginner-Friendly)

This project contains a very small and readable setup for testing `https://www.saucedemo.com` using Playwright and TypeScript.  
It includes two tests:
- Invalid login (shows error)
- Valid login (navigates to inventory page)

Screenshots are attached at every step and appear in the HTML report.

### Install
1) Install dependencies and browsers (already done by setup):
```
npm install
npx playwright install
```

### How to run
- Run tests in a visible browser, one at a time:
```
npm run test:headed:one
```

- Open the HTML report after a run:
```
npm run report
```

### Project Structure
```
.
├─ playwright.config.ts          # Playwright settings (HTML report enabled)
├─ tsconfig.json                 # TypeScript settings
├─ tests/                        # Tests live here
│  ├─ invalid-login.spec.ts
│  └─ valid-login.spec.ts
└─ src/
   ├─ pages/
   │  └─ LoginPage.ts            # Very small Login Page Object
   └─ utils/
      └─ stepHelper.ts           # Helper to capture screenshots per step
```

### Notes
- The HTML report shows screenshots attached to each `step`.
- If a cookie popup appears, we try to dismiss it safely.







