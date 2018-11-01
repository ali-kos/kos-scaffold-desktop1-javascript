import Workspace from './Workspace';

export default [
  {
    path: 'workspace',
    Component: Workspace,
    icon: 'appstore',
    name: 'workspace',
  },
  {
    path: 'workspace/:id/:name',
    Component: Workspace,
    icon: 'appstore',
  },
];
