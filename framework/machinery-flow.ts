import { expect, Locator, Page } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import {
  MachineryCommon,
  RentByTimeMachinery,
  RentByUsageMachinery
} from '../data/machinery-types';

dotenv.config({
  path: path.resolve(process.cwd(), '.env')
});

const baseUrl = (
  process.env.OMUNDI_URL ?? ''
).replace(/\/$/, '');

const supplierEmail =
  process.env.SUPPLIER_EMAIL ?? '';

const supplierPassword =
  process.env.SUPPLIER_PASSWORD ?? '';

function validateEnvironment(): void {
  if (
    !baseUrl ||
    !supplierEmail ||
    !supplierPassword
  ) {
    throw new Error(
      'Missing OMUNDI_URL, SUPPLIER_EMAIL, or SUPPLIER_PASSWORD in .env'
    );
  }
}

function getImagePath(
  machinery: MachineryCommon
): string {
  return path.resolve(
    process.cwd(),
    'machinery-images',
    machinery.image
  );
}

export function validateMachines(
  machines: MachineryCommon[],
  expectedCount: number
): void {
  validateEnvironment();

  if (machines.length !== expectedCount) {
    throw new Error(
      `Expected ${expectedCount} machinery records but found ${machines.length}.`
    );
  }

  for (const machinery of machines) {
    const imagePath = getImagePath(machinery);

    if (!fs.existsSync(imagePath)) {
      throw new Error(
        `Machinery image is missing: ${imagePath}`
      );
    }

    if (!machinery.name.trim()) {
      throw new Error('Machinery name is required.');
    }

    if (!machinery.description.trim()) {
      throw new Error(
        `Description is missing for ${machinery.name}`
      );
    }

    const year = Number(machinery.modelYear);

    if (
      !Number.isInteger(year) ||
      year < 1900 ||
      year > new Date().getFullYear() + 1
    ) {
      throw new Error(
        `Invalid model year for ${machinery.name}: ${machinery.modelYear}`
      );
    }

    if (!machinery.terms.length) {
      throw new Error(
        `At least one term is required for ${machinery.name}.`
      );
    }

    if (!machinery.features.length) {
      throw new Error(
        `At least one feature is required for ${machinery.name}.`
      );
    }

    if (!machinery.includedInRental.length) {
      throw new Error(
        `At least one included-in-rental item is required for ${machinery.name}.`
      );
    }
  }
}

export async function login(
  page: Page
): Promise<void> {
  validateEnvironment();

  console.log('Opening login page...');

  await page.goto(
    `${baseUrl}/login`,
    {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    }
  );

  await expect(
    page.getByRole('textbox', {
      name: 'supplier@example.com'
    })
  ).toBeVisible({
    timeout: 30_000
  });

  await expect(
    page.getByRole('textbox', {
      name: '••••••••'
    })
  ).toBeVisible({
    timeout: 30_000
  });

  /*
   * The Omundi login form has previously re-rendered after
   * initial paint and cleared values that were filled too early.
   */
  console.log(
    'Waiting 10 seconds for login page initialization...'
  );

  await page.waitForTimeout(10_000);

  const emailInput =
    page.getByRole('textbox', {
      name: 'supplier@example.com'
    });

  const passwordInput =
    page.getByRole('textbox', {
      name: '••••••••'
    });

  const loginButton =
    page.getByRole('button', {
      name: /^login$/i
    });

  await emailInput.fill(supplierEmail);
  await passwordInput.fill(supplierPassword);

  await expect(emailInput)
    .toHaveValue(supplierEmail);

  await expect(passwordInput)
    .toHaveValue(supplierPassword);

  await expect(loginButton)
    .toBeEnabled({
      timeout: 10_000
    });

  await loginButton.click();

  await page.waitForURL(
    url =>
      !url.pathname
        .toLowerCase()
        .endsWith('/login'),
    {
      timeout: 45_000
    }
  );

  await expect(
    page.getByRole('link', {
      name: /machinery/i
    }).first()
  ).toBeVisible({
    timeout: 30_000
  });

  console.log(
    `Login successful: ${page.url()}`
  );
}

async function openAddMachinery(
  page: Page
): Promise<void> {
  const machineryLink =
    page.getByRole('link', {
      name: /machinery/i
    }).first();

  await expect(machineryLink)
    .toBeVisible({
      timeout: 30_000
    });

  await machineryLink.click();

  await expect(
    page.getByRole('heading', {
      name: 'Machinery Rental',
      exact: true
    })
  ).toBeVisible({
    timeout: 30_000
  });

  const addMachineryButton =
    page.getByRole('button', {
      name: /add machinery/i
    });

  await expect(addMachineryButton)
    .toBeVisible({
      timeout: 30_000
    });

  await expect(addMachineryButton)
    .toBeEnabled({
      timeout: 30_000
    });

  await addMachineryButton.click();

  /*
   * Use UI state rather than only URL navigation. This is more
   * reliable for the application's SPA route transition.
   */
  await expect(
    page.getByRole('heading', {
      name: 'Add Machinery',
      exact: true
    })
  ).toBeVisible({
    timeout: 30_000
  });

  await expect(
    page.getByRole('heading', {
      name: 'Add General Information',
      exact: true
    })
  ).toBeVisible({
    timeout: 30_000
  });

  console.log(
    `Add Machinery opened: ${page.url()}`
  );
}

async function selectByLabel(
  page: Page,
  selector: string,
  label: string
): Promise<void> {
  const select = page.locator(selector);

  await expect(select)
    .toBeVisible({
      timeout: 20_000
    });

  await select.selectOption({
    label
  });
}

async function fillCommonStep1(
  page: Page,
  machinery: MachineryCommon
): Promise<void> {
  await page
    .getByRole('textbox', {
      name: 'e.g. Mahindra 575',
      exact: true
    })
    .fill(machinery.name);

  await page
    .getByRole('spinbutton', {
      name: 'e.g. 2023',
      exact: true
    })
    .fill(machinery.modelYear);

  await selectByLabel(
    page,
    'select[name="condition_id"]',
    machinery.conditionLabel
  );

  await selectByLabel(
    page,
    'select[name="category_id"]',
    machinery.categoryLabel
  );

  await selectByLabel(
    page,
    'select[name="status"]',
    machinery.statusLabel
  );

  await page
    .getByRole('textbox', {
      name: 'Describe your product...'
    })
    .fill(machinery.description);
}

async function fillRentByTimeStep1(
  page: Page,
  machinery: RentByTimeMachinery
): Promise<void> {
  const rentByTime =
    page.getByText(
      'Rent by time',
      {
        exact: true
      }
    );

  await expect(rentByTime)
    .toBeVisible({
      timeout: 20_000
    });

  await rentByTime.click();

  /*
   * When Rent by time is selected, usage unit and RATE must
   * not be required for Step 1.
   */
  await fillCommonStep1(
    page,
    machinery
  );
}

async function fillRentByUsageStep1(
  page: Page,
  machinery: RentByUsageMachinery
): Promise<void> {
  const rentByUsage =
    page.getByText(
      'Rent by usage',
      {
        exact: true
      }
    );

  await expect(rentByUsage)
    .toBeVisible({
      timeout: 20_000
    });

  await rentByUsage.click();

  const pricingUnit =
    page.getByRole(
      'button',
      {
        name: machinery.pricingUnit,
        exact: true
      }
    );

  await expect(pricingUnit)
    .toBeVisible({
      timeout: 20_000
    });

  await pricingUnit.click();

  const rateInput =
    page.getByRole(
      'spinbutton',
      {
        name: 'e.g. 500',
        exact: true
      }
    );

  await expect(rateInput)
    .toBeVisible({
      timeout: 20_000
    });

  await rateInput.fill(
    machinery.usageRate
  );

  await expect(rateInput)
    .toHaveValue(
      machinery.usageRate
    );

  await fillCommonStep1(
    page,
    machinery
  );
}

async function saveChanges(
  page: Page
): Promise<void> {
  const saveButton =
    page.getByRole('button', {
      name: 'Save Changes'
    });

  await expect(saveButton)
    .toBeVisible({
      timeout: 30_000
    });

  await expect(saveButton)
    .toBeEnabled({
      timeout: 30_000
    });

  await saveButton.click();
}

async function saveChangesAndNext(
  page: Page
): Promise<void> {
  /*
   * Required Omundi wizard sequence:
   * Save Changes -> Next
   */
  await saveChanges(page);

  const nextButton =
    page.getByRole('button', {
      name: 'Next'
    });

  await expect(nextButton)
    .toBeVisible({
      timeout: 30_000
    });

  await expect(nextButton)
    .toBeEnabled({
      timeout: 30_000
    });

  await nextButton.click();
}

async function uploadImage(
  page: Page,
  machinery: MachineryCommon
): Promise<void> {
  const imagePath =
    getImagePath(machinery);

  const imageInput =
    page.getByLabel(
      'Drop images here or browse'
    );

  await expect(imageInput)
    .toBeAttached({
      timeout: 20_000
    });

  await imageInput
    .setInputFiles(imagePath);

  console.log(
    `Image uploaded: ${path.basename(imagePath)}`
  );
}

async function fillRepeatedTextboxes(
  page: Page,
  accessibleName: string,
  addButtonName: string,
  values: string[]
): Promise<void> {
  if (!values.length) return;

  const firstInput =
    page
      .getByRole('textbox', {
        name: accessibleName
      })
      .first();

  await expect(firstInput)
    .toBeVisible({
      timeout: 20_000
    });

  await firstInput.fill(values[0]);

  for (
    let index = 1;
    index < values.length;
    index++
  ) {
    const addButton =
      page.getByRole('button', {
        name: addButtonName
      });

    await expect(addButton)
      .toBeVisible({
        timeout: 20_000
      });

    await addButton.click();

    const currentInput =
      page
        .getByRole('textbox', {
          name: accessibleName
        })
        .nth(index);

    await expect(currentInput)
      .toBeVisible({
        timeout: 20_000
      });

    await currentInput.fill(
      values[index]
    );
  }
}

async function fillOverview(
  page: Page,
  machinery: MachineryCommon
): Promise<void> {
  await fillRepeatedTextboxes(
    page,
    'e.g. Minimum rental period: 1',
    'Add another terms',
    machinery.terms
  );

  await fillRepeatedTextboxes(
    page,
    'e.g. Power Steering',
    'Add another feature',
    machinery.features
  );

  await fillRepeatedTextboxes(
    page,
    'e.g. Full fuel tank',
    'Add another included in rental',
    machinery.includedInRental
  );

  const addKeyValueButton =
    page.getByRole('button', {
      name: 'Add keys & values'
    });

  await expect(addKeyValueButton)
    .toBeVisible({
      timeout: 20_000
    });

  await addKeyValueButton.click();

  await page
    .getByRole('textbox', {
      name: 'Enter keys'
    })
    .fill(
      machinery.additionalService.key
    );

  await page
    .getByRole('textbox', {
      name: 'Enter Values'
    })
    .fill(
      machinery.additionalService.value
    );
}

async function fillSpecifications(
  page: Page,
  machinery: MachineryCommon
): Promise<void> {
  const createSpecification =
    page.getByRole('button', {
      name: 'Create New Specification'
    });

  await expect(createSpecification)
    .toBeVisible({
      timeout: 20_000
    });

  await createSpecification.click();

  await page
    .getByRole('textbox', {
      name: 'Enter Title name'
    })
    .fill(
      machinery.specification.title
    );

  await page
    .getByRole('textbox', {
      name: 'Enter Subtitle name'
    })
    .fill(
      machinery.specification.subtitle
    );

  await page
    .getByRole('button', {
      name: 'Create',
      exact: true
    })
    .click();

  const keyFeaturesButton =
    page.getByRole('button', {
      name: 'Key Features'
    });

  await expect(keyFeaturesButton)
    .toBeVisible({
      timeout: 20_000
    });

  await keyFeaturesButton.click();

  await page
    .getByRole('textbox', {
      name: 'Enter keys'
    })
    .last()
    .fill(
      machinery.specification.key
    );

  await page
    .getByRole('textbox', {
      name: 'Enter Values'
    })
    .last()
    .fill(
      machinery.specification.value
    );
}

async function enablePricingInput(
  input: Locator
): Promise<void> {
  if (await input.isEnabled()) {
    return;
  }

  /*
   * Pricing rows have historically required enabling a rate tier
   * before its numeric input becomes editable. Prefer the nearest
   * row/button instead of global nth() button indexes.
   */
  const ancestorWithButton =
    input.locator(
      'xpath=ancestor::div[.//button][1]'
    );

  const localButtons =
    ancestorWithButton.getByRole('button');

  if (
    (await localButtons.count()) > 0
  ) {
    const button =
      localButtons.first();

    if (
      await button.isVisible()
    ) {
      await button.click();
    }
  }

  if (!(await input.isEnabled())) {
    /*
     * Fallback for builds where the whole pricing row is clickable.
     */
    const row =
      input.locator(
        'xpath=ancestor::div[contains(@class,"justify-between")][1]'
      );

    if (
      (await row.count()) > 0 &&
      await row.isVisible()
    ) {
      await row.click();
    }
  }

  await expect(input)
    .toBeEnabled({
      timeout: 10_000
    });
}

async function fillTimePrice(
  page: Page,
  accessibleName: string,
  value: string
): Promise<void> {
  const input =
    page.getByRole(
      'spinbutton',
      {
        name: accessibleName,
        exact: true
      }
    );

  await expect(input)
    .toBeVisible({
      timeout: 20_000
    });

  await enablePricingInput(input);

  await input.fill(value);

  await expect(input)
    .toHaveValue(value);
}

async function fillTimePricing(
  page: Page,
  machinery: RentByTimeMachinery
): Promise<void> {
  await fillTimePrice(
    page,
    'Enter hourly price',
    machinery.pricing.hourly
  );

  await fillTimePrice(
    page,
    'Enter daily price',
    machinery.pricing.daily
  );

  await fillTimePrice(
    page,
    'Enter weekly price',
    machinery.pricing.weekly
  );

  await fillTimePrice(
    page,
    'Enter monthly price',
    machinery.pricing.monthly
  );

  await saveChangesAndNext(page);
}

async function handleUsagePricingStep(
  page: Page
): Promise<void> {
  /*
   * Rent by usage now receives its Pricing Unit + RATE in Step 1.
   * Depending on the current build, Step 5 may contain only the
   * wizard controls or the app may move directly toward availability.
   */

  const applyToDates =
    page.getByRole('button', {
      name: 'Apply to Selected Dates'
    });

  if (
    (await applyToDates.count()) > 0 &&
    await applyToDates.isVisible()
  ) {
    return;
  }

  const saveButton =
    page.getByRole('button', {
      name: 'Save Changes'
    });

  if (
    (await saveButton.count()) > 0 &&
    await saveButton.isVisible() &&
    await saveButton.isEnabled()
  ) {
    await saveButton.click();
  }

  const nextButton =
    page.getByRole('button', {
      name: 'Next'
    });

  if (
    (await nextButton.count()) > 0 &&
    await nextButton.isVisible()
  ) {
    await expect(nextButton)
      .toBeEnabled({
        timeout: 30_000
      });

    await nextButton.click();
  }
}

async function selectAvailabilityDates(
  page: Page
): Promise<void> {
  const main = page.getByRole('main');
  const today = new Date();

  const lastDayOfMonth =
    new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();

  const candidates = [
    today.getDate() + 1,
    today.getDate() + 2,
    today.getDate() + 3,
    today.getDate() + 4
  ].filter(
    day =>
      day <= lastDayOfMonth
  );

  let selected = 0;

  for (const day of candidates) {
    const dayLocators =
      main.getByText(
        String(day),
        {
          exact: true
        }
      );

    const count =
      await dayLocators.count();

    for (
      let index = count - 1;
      index >= 0;
      index--
    ) {
      const candidate =
        dayLocators.nth(index);

      if (
        !(await candidate.isVisible())
      ) {
        continue;
      }

      try {
        await candidate.click({
          timeout: 5_000
        });

        selected++;
        break;
      } catch {
        // Try the next matching calendar cell.
      }
    }

    if (selected >= 2) {
      break;
    }
  }

  if (selected === 0) {
    throw new Error(
      'No selectable availability date was found.'
    );
  }

  const applyButton =
    page.getByRole('button', {
      name: 'Apply to Selected Dates'
    });

  await expect(applyButton)
    .toBeVisible({
      timeout: 20_000
    });

  await expect(applyButton)
    .toBeEnabled({
      timeout: 20_000
    });

  await applyButton.click();

  await saveChanges(page);
}

async function verifyMachineryCreated(
  page: Page,
  machineryName: string
): Promise<void> {
  const machineryLink =
    page.getByRole('link', {
      name: /machinery/i
    }).first();

  await expect(machineryLink)
    .toBeVisible({
      timeout: 30_000
    });

  await machineryLink.click();

  await expect(
    page.getByRole('heading', {
      name: 'Machinery Rental',
      exact: true
    })
  ).toBeVisible({
    timeout: 30_000
  });

  const search =
    page.getByRole('textbox', {
      name: 'Search machineries...',
      exact: true
    });

  if (
    (await search.count()) > 0 &&
    await search.isVisible()
  ) {
    await search.fill(machineryName);
  }

  await expect(
    page.getByRole('link', {
      name: machineryName,
      exact: true
    })
  ).toBeVisible({
    timeout: 30_000
  });

  console.log(
    `Verified in Machinery list: ${machineryName}`
  );
}

export async function createRentByTimeMachinery(
  page: Page,
  machinery: RentByTimeMachinery
): Promise<void> {
  console.log(
    `\n===== RENT BY TIME: ${machinery.name} =====`
  );

  await openAddMachinery(page);

  // Step 1
  await fillRentByTimeStep1(
    page,
    machinery
  );
  await saveChangesAndNext(page);

  // Step 2
  await uploadImage(page, machinery);
  await saveChangesAndNext(page);

  // Step 3
  await fillOverview(page, machinery);
  await saveChangesAndNext(page);

  // Step 4
  await fillSpecifications(
    page,
    machinery
  );
  await saveChangesAndNext(page);

  // Step 5
  await fillTimePricing(
    page,
    machinery
  );

  // Step 6
  await selectAvailabilityDates(page);

  await verifyMachineryCreated(
    page,
    machinery.name
  );
}

export async function createRentByUsageMachinery(
  page: Page,
  machinery: RentByUsageMachinery
): Promise<void> {
  console.log(
    `\n===== RENT BY USAGE: ${machinery.name} / ${machinery.pricingUnit} =====`
  );

  await openAddMachinery(page);

  // Step 1: Rent by usage + unit + RATE
  await fillRentByUsageStep1(
    page,
    machinery
  );
  await saveChangesAndNext(page);

  // Step 2
  await uploadImage(page, machinery);
  await saveChangesAndNext(page);

  // Step 3
  await fillOverview(page, machinery);
  await saveChangesAndNext(page);

  // Step 4
  await fillSpecifications(
    page,
    machinery
  );
  await saveChangesAndNext(page);

  // Step 5 / transition to Step 6
  await handleUsagePricingStep(page);

  // Step 6
  await selectAvailabilityDates(page);

  await verifyMachineryCreated(
    page,
    machinery.name
  );
}
