import { RentByUsageMachinery } from './machinery-types';

/*
 * ==========================================================
 * EDIT ONLY THIS FILE FOR NEW "RENT BY USAGE" MACHINERY
 * ==========================================================
 *
 * Keep one record for each pricing unit:
 * Per Acre, Per Hectare, Per Job, Per Ton, Per Kilometer.
 *
 * The automation framework itself does not need to change.
 */

export const rentByUsageMachineries: RentByUsageMachinery[] = [
  {
    name: 'umesh - rent by usage machine 1 - per acre',
    image: 'machine1.jpg',
    rentalType: 'Rent by usage',
    pricingUnit: 'Per Acre',
    usageRate: '500',
    modelYear: '2023',
    conditionLabel: 'New',
    categoryLabel: 'Tractors',
    statusLabel: 'Active',
    description:
      'Agricultural tractor offered on a per-acre usage basis for field work such as cultivation support, crop operations, and general farm tasks. The machine is prepared for reliable agricultural deployment with clear work-area pricing and practical operating support.',
    terms: [
      'The customer must confirm the total work area in acres before the job begins.',
      'Any additional acreage outside the agreed work area must be approved before work continues.'
    ],
    features: [
      'Strong field traction for agricultural work across cultivated land.',
      'Suitable for area-based farm jobs where work is measured by acreage.'
    ],
    includedInRental: [
      'Pre-job machinery inspection.',
      'Basic operator and safety guidance.'
    ],
    additionalService: {
      key: 'Farm Delivery',
      value: 'Farm-site delivery can be arranged depending on location and transport availability.'
    },
    specification: {
      title: 'Usage Specifications',
      subtitle: 'Per-acre tractor service configuration',
      key: 'Billing Unit',
      value: 'Per Acre'
    }
  },
  {
    name: 'umesh - rent by usage machine 2 - per hectare',
    image: 'machine1.jpg',
    rentalType: 'Rent by usage',
    pricingUnit: 'Per Hectare',
    usageRate: '650',
    modelYear: '2023',
    conditionLabel: 'New',
    categoryLabel: 'Tractors',
    statusLabel: 'Active',
    description:
      'Farm tractor configured for usage-based agricultural work billed by hectare. It is suitable for planned field operations where the customer provides the total working area in advance, allowing the job to be priced consistently against the confirmed land coverage.',
    terms: [
      'The farm area must be confirmed in hectares before machinery deployment.',
      'Work outside the confirmed area requires an updated job agreement.'
    ],
    features: [
      'Reliable agricultural performance for hectare-based field operations.',
      'Practical field configuration for medium and large farm areas.'
    ],
    includedInRental: [
      'Pre-deployment machinery inspection.',
      'Basic safety and operating instructions.'
    ],
    additionalService: {
      key: 'Area Review',
      value: 'The work area can be reviewed before deployment when field access or boundaries require confirmation.'
    },
    specification: {
      title: 'Usage Specifications',
      subtitle: 'Per-hectare tractor service configuration',
      key: 'Billing Unit',
      value: 'Per Hectare'
    }
  },
  {
    name: 'umesh - rent by usage machine 3 - per job',
    image: 'machine1.jpg',
    rentalType: 'Rent by usage',
    pricingUnit: 'Per Job',
    usageRate: '1200',
    modelYear: '2024',
    conditionLabel: 'Excellent',
    categoryLabel: 'Tractors',
    statusLabel: 'Active',
    description:
      'Agricultural tractor available for complete farm jobs priced as a defined assignment. This usage model is suitable when the customer describes a specific task, working area, expected output, and field conditions before the machinery is deployed.',
    terms: [
      'The job scope must be agreed before the machine is dispatched.',
      'Changes to the job scope may require a revised price before additional work begins.'
    ],
    features: [
      'Flexible tractor configuration for clearly defined agricultural assignments.',
      'Suitable for one-off jobs with an agreed work scope and completion target.'
    ],
    includedInRental: [
      'Pre-job machine inspection.',
      'Basic operating guidance for the agreed assignment.'
    ],
    additionalService: {
      key: 'Job Assessment',
      value: 'A basic job assessment can be arranged before deployment when the task requires additional planning.'
    },
    specification: {
      title: 'Usage Specifications',
      subtitle: 'Per-job tractor service configuration',
      key: 'Billing Unit',
      value: 'Per Job'
    }
  },
  {
    name: 'umesh - rent by usage machine 4 - per ton',
    image: 'machine1.jpg',
    rentalType: 'Rent by usage',
    pricingUnit: 'Per Ton',
    usageRate: '300',
    modelYear: '2022',
    conditionLabel: 'Good',
    categoryLabel: 'Tractors',
    statusLabel: 'Active',
    description:
      'Agricultural tractor available for usage-based work priced according to tonnage handled during the agreed farm operation. The machine can support suitable hauling, movement, and field logistics tasks where the completed workload is measured by weight.',
    terms: [
      'The expected tonnage and material type must be agreed before the work starts.',
      'Final billing may be based on the verified tonnage completed during the job.'
    ],
    features: [
      'Strong hauling capability for suitable agricultural material movement.',
      'Usage model supports jobs measured by completed tonnage.'
    ],
    includedInRental: [
      'Pre-rental machine condition check.',
      'Basic operating and safety guidance.'
    ],
    additionalService: {
      key: 'Load Planning',
      value: 'Basic load-planning support can be arranged when the job requires coordinated farm transport.'
    },
    specification: {
      title: 'Usage Specifications',
      subtitle: 'Per-ton tractor service configuration',
      key: 'Billing Unit',
      value: 'Per Ton'
    }
  },
  {
    name: 'umesh - rent by usage machine 5 - per kilometer',
    image: 'machine1.jpg',
    rentalType: 'Rent by usage',
    pricingUnit: 'Per Kilometer',
    usageRate: '75',
    modelYear: '2025',
    conditionLabel: 'Excellent',
    categoryLabel: 'Tractors',
    statusLabel: 'Active',
    description:
      'Agricultural tractor configured for usage-based transport or field movement priced by distance travelled. This option is suitable for supported farm logistics where the agreed work can be measured in kilometers and the route is confirmed before deployment.',
    terms: [
      'The expected route and total distance must be agreed before the job begins.',
      'Additional distance beyond the agreed route may be billed using the same per-kilometer rate.'
    ],
    features: [
      'Suitable for supported agricultural transport and farm logistics.',
      'Distance-based pricing provides a clear rate for measured travel.'
    ],
    includedInRental: [
      'Pre-deployment machinery inspection.',
      'Basic operating and safety instructions.'
    ],
    additionalService: {
      key: 'Route Review',
      value: 'The planned route can be reviewed before deployment when access or distance requires confirmation.'
    },
    specification: {
      title: 'Usage Specifications',
      subtitle: 'Per-kilometer tractor service configuration',
      key: 'Billing Unit',
      value: 'Per Kilometer'
    }
  }
];
