# Omundi Machinery Dual-Mode Automation

This project keeps the successful simple Add Machinery wizard flow and splits the two selling modes into separate commands.

## Commands

### Rent by time — 5 machines

```powershell
npm run add:time
```

### Rent by usage — 5 machines

```powershell
npm run add:usage
```

The Rent by usage command covers exactly:

1. Per Acre
2. Per Hectare
3. Per Job
4. Per Ton
5. Per Kilometer

## Content is separate from framework

To add different machines next time, do not edit the Playwright flow.

Edit only:

```text
data/rent-by-time.data.ts
```

or:

```text
data/rent-by-usage.data.ts
```

Shared types are in:

```text
data/machinery-types.ts
```

Shared Playwright flow is in:

```text
framework/machinery-flow.ts
```

## Wizard rule

Every normal wizard screen follows:

```text
Fill fields -> Save Changes -> Next
```

Rent by time:
- Step 1 selects Rent by time.
- Step 5 fills hourly, daily, weekly and monthly rates.

Rent by usage:
- Step 1 selects Rent by usage.
- Step 1 selects the pricing unit.
- Step 1 fills RATE (`e.g. 500`).
- The framework does not fill hourly/daily/weekly/monthly rates for this mode.

## Image

The same `machinery-images/machine1.jpg` is reused for all 10 records.
