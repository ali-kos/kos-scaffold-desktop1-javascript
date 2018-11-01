export function checkLogin() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: '200',
      });
    }, 2000);
  });
}
