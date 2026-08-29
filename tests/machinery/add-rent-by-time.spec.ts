import { test } from '@playwright/test';

import { rentByTimeMachineries } from '../../data/rent-by-time.data';
import {
  createRentByTimeMachinery,
  login,
  validateMachines
} from '../../framework/machinery-flow';

test(
  'supplier adds five machinery records using Rent by time',
  async ({ page }) => {
    test.setTimeout(2_400_000);

    validateMachines(
      rentByTimeMachineries,
      5
    );

    await login(page);

    for (
      let index = 0;
      index < rentByTimeMachineries.length;
      index++
    ) {
      console.log(
        `Creating Rent by time machine ${index + 1} of ${rentByTimeMachineries.length}`
      );

      await createRentByTimeMachinery(
        page,
        rentByTimeMachineries[index]
      );
    }

    console.log(
      'ALL 5 RENT-BY-TIME MACHINES COMPLETED'
    );
  }
);
