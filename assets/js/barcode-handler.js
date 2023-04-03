import { scan, popUp } from './variables.js';
// import {CreateBarcodeImage} from '../API/create-card.js';
// import { DataIsLoading,} from './rendering/render-products.js';


	
	// const fileCodeReader = new Html5Qrcode("reader");
	const errorText = document.getElementById('error-text');

// Start scanning of the camera for product
function StartCameraScan(type) {
    const scanner = new Html5Qrcode('scanner');
	console.log('banaana');
	// DataIsLoading(true);
	// Set delay on appearance of stopscan button
	setTimeout(function () {
		scan.stop.style.display = 'block';
	}, 1400);

	const config = { fps: 10, qrbox: 200 };
	const qrCodeSuccessCallback = (barcode) => {
		StopCameraScan();

		// Set data in URL;
		if (type === 'product') {
			window.location = `/product/${barcode}`;
		} else {
			//  Shopping card
			// CreateBarcodeImage(barcode, false);
		}
	};

	scanner
		.start({ facingMode: 'environment' }, config, qrCodeSuccessCallback)
		.catch((err) => {
			setTimeout(function () {
				scan.stop.style.display = 'none';
			}, 1400);

			DisplayErrorPopUp(err);
		});
	// .finally( DataIsLoading(false) );
}

// Stops scanning of the camera
function StopCameraScan() {
    const scanner = new Html5Qrcode('scanner');
	scanner
		.stop()
		.then((ignore) => {
			scan.stop.style.display = 'none';
			// QR Code scanning is stopped.
			// Clears scanning instance. Stops the camera
			scanner.clear();

			// Removes reader element from DOM since no longer needed
			// document.getElementById("scanner").remove();
		})
		.catch((err) => {
			// Stop failed, handle it.
			console.log(err);
		});
}

// function GetFileBarcode(event) {
//     popUp.scan.classList.remove("open");

//     if (event.target.files.length == 0) {
//         DisplayErrorPopUp("no file found");
//         return;
//     }

//     const imageFile = event.target.files[0];

//     // Scan QR Code
//     fileCodeReader.scanFile(imageFile, true)
//     .then(barcode => {
//         // barcode succes = true
//         const hash = window.location.hash; // Get the hash from the URL
//         const linkParts = hash.split('/'); // Split the hash into an array of parts

//         window.location.hash = `${linkParts[0]}/#product/${barcode}`;
//         fileCodeReader.clear();
//     })
//     .catch(err => {
//         fileCodeReader.clear();
//         DisplayErrorPopUp(err);
//         console.log(`Error scanning file. Reason: ${err}`)
//     });
// }

function DisplayErrorPopUp(errorMessage) {
	popUp.error.classList.add('open');
	errorText.textContent = errorMessage;
}

export { StartCameraScan, StopCameraScan };
