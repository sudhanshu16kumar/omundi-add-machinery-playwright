import { test } from '@playwright/test';

import { rentByUsageMachineries } from '../../data/rent-by-usage.data';
import {
  createRentByUsageMachinery,
  login,
  validateMachines
} from '../../framework/machinery-flow';

test(
  'supplier adds five machinery records using all Rent by usage pricing units',
  async ({ page }) => {
    test.setTimeout(2_400_000);

    validateMachines(
      rentByUsageMachineries,
      5
    );

    const expectedUnits = [
      'Per Acre',
      'Per Hectare',
      'Per Job',
      'Per Ton',
      'Per Kilometer'
    ];

    const actualUnits =
      rentByUsageMachineries.map(
        machinery =>
          machinery.pricingUnit
      );

    if (
      JSON.stringify(actualUnits) !==
      JSON.stringify(expectedUnits)
    ) {
      throw new Error(
        `Rent by usage data must contain exactly: ${expectedUnits.join(', ')}`
      );
    }

    await login(page);

    for (
      let index = 0;
      index < rentByUsageMachineries.length;
      index++
    ) {
      console.log(
        `Creating Rent by usage machine ${index + 1} of ${rentByUsageMachineries.length}`
      );

      await createRentByUsageMachinery(
        page,
        rentByUsageMachineries[index]
      );
    }

    console.log(
      'ALL 5 RENT-BY-USAGE MACHINES COMPLETED'
    );
  }
);
