import LoadableComponent from '@/components/LoadableComponent';
// import A1 from './A1';
const Analysis = LoadableComponent(() => import('./Analysis'));
const Monitor = LoadableComponent(() => import('./Monitor'));

export default [
  {
    path: 'analysis',
    Component: Analysis,
    icon: 'appstore',
    name: 'analysis',
  },
  {
    path: 'monitor',
    Component: Monitor,
    icon: 'appstore',
    name: 'monitor',
  },
];
