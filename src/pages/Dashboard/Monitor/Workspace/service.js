import request from '@/common/utils/request';

export async function add(data: any) {
  return request('/page/add', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
