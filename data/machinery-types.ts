export type PricingUnit =
  | 'Per Acre'
  | 'Per Hectare'
  | 'Per Job'
  | 'Per Ton'
  | 'Per Kilometer';

export type MachineryCommon = {
  name: string;
  image: string;
  modelYear: string;
  conditionLabel: string;
  categoryLabel: string;
  statusLabel: string;
  description: string;
  terms: string[];
  features: string[];
  includedInRental: string[];
  additionalService: {
    key: string;
    value: string;
  };
  specification: {
    title: string;
    subtitle: string;
    key: string;
    value: string;
  };
};

export type RentByTimeMachinery = MachineryCommon & {
  rentalType: 'Rent by time';
  pricing: {
    hourly: string;
    daily: string;
    weekly: string;
    monthly: string;
  };
};

export type RentByUsageMachinery = MachineryCommon & {
  rentalType: 'Rent by usage';
  pricingUnit: PricingUnit;
  usageRate: string;
};
