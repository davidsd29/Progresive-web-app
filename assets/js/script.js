import { popUp, scan, count } from './variables.js';
import { ChangeCounterValue, SetProduct } from './set-list.js';
import { StartCameraScan } from './barcode-handler.js';

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('../serviceWorker.js').then((registration)=> {
		console.log('Service worker registerd' + registration.scope);
	});
}

if (scan.start) {
	scan.start.addEventListener('click', () => {
		StartCameraScan('product');
		popUp.scan.classList.remove('open');
	});

	scan.toggle.addEventListener('click', () => {
		popUp.scan.classList.add('open');
	});
}

if (count.increaseBtn) {
	count.increaseBtn.addEventListener('click', () => {
		if (count.counterIndex.classList.contains('required'))
			count.counterIndex.classList.remove('required');
		ChangeCounterValue(1);
	});

	count.decreaseBtn.addEventListener('click', () => {
		ChangeCounterValue(-1);
	});

	count.addToListBtn.addEventListener('click', (e) => {
		SetProduct(Number(e.target.getAttribute('data-barcode')));
	});
}
