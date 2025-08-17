import moment from 'moment';

export const groups = [
  { id: 1, title: 'Diagnostics' },
  { id: 2, title: 'Interventions' },
  { id: 3, title: 'Travel' }
];

export const items = [
  {
    id: 1,
    group: 1,
    title: 'Blood Test',
    start_time: moment().add(-7, 'month'),
    end_time: moment().add(-7, 'month').add(1, 'day')
  },
  {
    id: 2,
    group: 2,
    title: 'Plan Update',
    start_time: moment().add(-5, 'month'),
    end_time: moment().add(-5, 'month').add(1, 'day')
  }
];
