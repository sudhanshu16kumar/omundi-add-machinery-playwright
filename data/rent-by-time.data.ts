import { RentByTimeMachinery } from './machinery-types';

/*
 * ==========================================================
 * EDIT ONLY THIS FILE FOR NEW "RENT BY TIME" MACHINERY
 * ==========================================================
 *
 * Keep exactly 5 records if you want one command to create
 * five time-based machines.
 *
 * The automation framework itself does not need to change.
 */

export const rentByTimeMachineries: RentByTimeMachinery[] = [
  {
    name: 'umesh - rent by time machine 1',
    image: 'machine1.jpg',
    rentalType: 'Rent by time',
    modelYear: '2023',
    conditionLabel: 'New',
    categoryLabel: 'Tractors',
    statusLabel: 'Active',
    description:
      'Agricultural tractor prepared for cultivation, hauling, planting support, and general field transport. The machine is suitable for routine farm rental work and provides dependable traction, practical maneuverability, and reliable operating performance across prepared agricultural fields.',
    terms: [
      'Minimum rental period is one hour and all operating time is recorded against the agreed rental period.',
      'The operator must follow standard agricultural safety procedures and return the machine in the agreed operating condition.'
    ],
    features: [
      'Strong agricultural traction supports cultivation, hauling, and general field operations.',
      'Practical steering and field-ready construction support routine farm work and transport.'
    ],
    includedInRental: [
      'Pre-rental machinery inspection before the tractor is released.',
      'Basic operating guidance and standard safety instructions.'
    ],
    additionalService: {
      key: 'Farm Delivery',
      value: 'Farm-site delivery can be arranged depending on customer location and transport availability.'
    },
    specification: {
      title: 'Technical Specifications',
      subtitle: 'Agricultural tractor operating configuration',
      key: 'Machine Type',
      value: 'Agricultural Tractor'
    },
    pricing: {
      hourly: '100',
      daily: '500',
      weekly: '2500',
      monthly: '8000'
    }
  },
  {
    name: 'umesh - rent by time machine 2',
    image: 'machine1.jpg',
    rentalType: 'Rent by time',
    modelYear: '2022',
    conditionLabel: 'Good',
    categoryLabel: 'Tractors',
    statusLabel: 'Active',
    description:
      'Field tractor configured for dependable agricultural rental work including tillage support, material movement, crop operations, and farm transport. Its durable working setup is suitable for regular use across cultivated land where consistent pulling performance and stable operation are required.',
    terms: [
      'Rental duration is calculated from the agreed start time until the machine is formally returned.',
      'Fuel level, machine condition, and operating hours must be checked during handover and return.'
    ],
    features: [
      'Durable field configuration supports extended agricultural work.',
      'Large tyres provide stable ground contact across cultivated farm surfaces.'
    ],
    includedInRental: [
      'Standard pre-rental operating inspection.',
      'Basic tractor controls and safety briefing.'
    ],
    additionalService: {
      key: 'Operator Support',
      value: 'Operator support may be arranged subject to availability and the agreed farm location.'
    },
    specification: {
      title: 'Machine Specifications',
      subtitle: 'General tractor rental configuration',
      key: 'Primary Use',
      value: 'General Farm Operations'
    },
    pricing: {
      hourly: '120',
      daily: '575',
      weekly: '2800',
      monthly: '8500'
    }
  },
  {
    name: 'umesh - rent by time machine 3',
    image: 'machine1.jpg',
    rentalType: 'Rent by time',
    modelYear: '2024',
    conditionLabel: 'Excellent',
    categoryLabel: 'Tractors',
    statusLabel: 'Active',
    description:
      'Modern agricultural tractor suitable for time-based rental across cultivation, hauling, field preparation, and transport activities. The machine provides a practical combination of traction, operator visibility, and working stability for medium-scale and commercial farm operations.',
    terms: [
      'Time-based rental charges apply according to the selected hourly, daily, weekly, or monthly rate.',
      'Any additional attachments or special operating requirements must be agreed before the rental begins.'
    ],
    features: [
      'Reliable pulling performance for cultivation and hauling activities.',
      'Operator-focused cab and steering configuration support controlled field movement.'
    ],
    includedInRental: [
      'Pre-deployment mechanical and safety inspection.',
      'Basic operating guidance before machinery handover.'
    ],
    additionalService: {
      key: 'Field Handover',
      value: 'On-site machinery handover can be arranged for supported farm locations.'
    },
    specification: {
      title: 'Technical Details',
      subtitle: 'Tractor rental and field configuration',
      key: 'Equipment Class',
      value: 'Farm Tractor'
    },
    pricing: {
      hourly: '140',
      daily: '650',
      weekly: '3100',
      monthly: '9200'
    }
  },
  {
    name: 'umesh - rent by time machine 4',
    image: 'machine1.jpg',
    rentalType: 'Rent by time',
    modelYear: '2021',
    conditionLabel: 'Good',
    categoryLabel: 'Tractors',
    statusLabel: 'Active',
    description:
      'Agricultural tractor maintained for routine farm rental tasks such as soil preparation, hauling, field logistics, and support for compatible implements. The machine is intended for dependable time-based use with straightforward rental terms and practical operating support.',
    terms: [
      'The renter is responsible for using the machine only within the agreed agricultural work scope.',
      'Rental extensions must be approved before the original rental period expires.'
    ],
    features: [
      'Field-ready tractor setup for routine agricultural tasks.',
      'Stable wheel and chassis configuration supports farm transport and hauling.'
    ],
    includedInRental: [
      'Standard condition inspection at collection or delivery.',
      'Basic safety and control instructions.'
    ],
    additionalService: {
      key: 'Transport',
      value: 'Machine transport to the farm can be quoted separately based on distance.'
    },
    specification: {
      title: 'Operating Specifications',
      subtitle: 'Agricultural tractor rental information',
      key: 'Rental Mode',
      value: 'Time Based'
    },
    pricing: {
      hourly: '90',
      daily: '450',
      weekly: '2200',
      monthly: '7200'
    }
  },
  {
    name: 'umesh - rent by time machine 5',
    image: 'machine1.jpg',
    rentalType: 'Rent by time',
    modelYear: '2025',
    conditionLabel: 'Excellent',
    categoryLabel: 'Tractors',
    statusLabel: 'Active',
    description:
      'High-capacity farm tractor prepared for scheduled agricultural rental activities including cultivation support, material hauling, field transport, and general machinery operations. Its strong field configuration and practical operator environment make it suitable for demanding seasonal farm requirements.',
    terms: [
      'The agreed time rate applies only to the confirmed rental period and operating scope.',
      'The machine must be returned clean and in the same general condition recorded during handover.'
    ],
    features: [
      'Strong field performance for demanding agricultural operations.',
      'Comfortable operator layout supports longer scheduled rental periods.'
    ],
    includedInRental: [
      'Pre-rental operational inspection.',
      'Basic user guidance and safety information.'
    ],
    additionalService: {
      key: 'Priority Delivery',
      value: 'Priority farm delivery can be requested subject to transport availability.'
    },
    specification: {
      title: 'Equipment Specifications',
      subtitle: 'Time-based tractor rental configuration',
      key: 'Application',
      value: 'Agricultural Field Work'
    },
    pricing: {
      hourly: '160',
      daily: '725',
      weekly: '3500',
      monthly: '10000'
    }
  }
];
