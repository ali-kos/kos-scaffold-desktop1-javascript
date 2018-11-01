export function login() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: '200',
      });
    }, 2000);
  });
}
