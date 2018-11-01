import KOS from 'kos-core';
import createLogger from 'redux-logger';
import '@/common/themes/index.less';
import { formMiddleware } from 'kos-form';
import createLoading from '../lib/kos-loading';
import Router from './router';

KOS.use(createLogger);
KOS.use(formMiddleware);
KOS.use(createLoading);

KOS.start(Router, '#app');
