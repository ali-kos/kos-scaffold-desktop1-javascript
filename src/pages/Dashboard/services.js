export function login() {
  console.log('request start');
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve({
          code: '0',
        });
      }, 2000);
    } catch (e) {
      reject(e);
    }
  });
}
