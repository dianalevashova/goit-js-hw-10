import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
// iziToast.error({
//   title: 'Error',
//   message: '❌ Rejected promise in ${delay}ms',
//   position: 'topRight',
// });
// iziToast.success({
//   title: 'OK',
//   message: '✅ Fulfilled promise in ${delay}ms',
//   position: 'topRight',
// });
refs = {
  form: document.querySelector('.form'),
};
refs.form.addEventListener('submit', onFormSubmit);
function onFormSubmit(e) {
  e.preventDefault();
  const { delay, state } = refs.form.elements;
  const inputDelayValue = delay.value.trim();
  const stateValue = state.value.trim();
  if (e.target.NodeName !== 'BUTTON') return;
  const promise = new Promise((resolve, rejected) => {
    resolve(
      iziToast.success({
        title: 'OK',
        message: '✅ Fulfilled promise in ${delay}ms',
        position: 'topRight',
      })
    );
    rejected(
      iziToast.error({
        title: 'Error',
        message: '❌ Rejected promise in ${delay}ms',
        position: 'topRight',
      })
    );
  });
  setTimeout(() => {
    if ((stateValue = 'fulfilled')) {
      return promise.then(value => value);
    }
    if ((stateValue = 'rejected')) {
      return promise.catch(error => error);
    }
  }, inputDelayValue);
}
