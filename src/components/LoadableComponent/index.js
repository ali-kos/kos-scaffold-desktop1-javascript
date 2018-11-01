import Loadable from 'react-loadable';
import Loader from '@/components/Loader';

export default function (loader) {
  return Loadable({
    loader,
    loading: Loader,
  });
}
