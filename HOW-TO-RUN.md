# How to Run

## First-time setup

```powershell
npm install
npx playwright install chromium
```

The supplied framework already contains `.env` for the test supplier account used during this project.

## Add 5 machines using Rent by time

```powershell
npm run add:time
```

This opens Chromium and creates the 5 machines defined in:

```text
data/rent-by-time.data.ts
```

For a new batch, edit/replace only that data file.

## Add 5 machines using Rent by usage

```powershell
npm run add:usage
```

This opens Chromium and creates exactly one machine for each:

- Per Acre
- Per Hectare
- Per Job
- Per Ton
- Per Kilometer

The content is defined in:

```text
data/rent-by-usage.data.ts
```

For a new batch, edit/replace only that data file.

## Headless commands

```powershell
npm run add:time:headless
npm run add:usage:headless
```

## Debug

```powershell
npm run debug:time
npm run debug:usage
```

## Type check

```powershell
npm run typecheck
```

## Report

```powershell
npm run report
```
