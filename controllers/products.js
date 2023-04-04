import fetch from "node-fetch";

const product =  async (req, res) => {
    // res.render("pages/home")
    console.log(req.params.id)
}
export default product;

// Check input and give correct fetch link
function GetFetchLink(type, barcode) {
	if (type === 'string') {
		return `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
	} else {
		return `https://world.openfoodfacts.org/api/v0/product/${barcode.productCode}.json`;
	}
}



// Fetching data
async function GetData(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('This product is not available');
		}
		console.log('apple')

		return await response.json();
	} catch (error) {
		console.log('peer')
		console.log(error);
	}
}


async function ReplanishData(barcode, dataType) {
	// DataIsLoading(true);
	console.log('banaan')
	console.log(barcode)

	const data = await GetData(GetFetchLink(typeof barcode, barcode));

	console.log(dataType + " meloen")
	switch (dataType) {
		case 'product':
			// Product Detail
			return data;
			// DataIsLoading(false);
			break;

		case 'listItem':
			// Groceries List
			console.log(data)
			const obj = {
				product: data.product,
				productAmount: barcode.productAmount,
			};

			return obj;
		default:
			console.log('data type not found');
	}
}

export {
	ReplanishData
}