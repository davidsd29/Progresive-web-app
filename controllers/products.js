const product =  async (req, res) => {
    // res.render("pages/home")
    console.log(req.params.id)
}
export default product;

// Check input and give correct fetch link
function GetFetchLink(type, barcode) {
	if (type === 'string') {
		return fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
	} else {
		return fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode.productCode}.json`);
	}
}


// Fetching data
async function GetData(url) {
	try {
		const response = await url;
		if (!response.ok) {
			throw new Error('This product is not available');
		}

		return await response.json();
	} catch (error) {
		console.log(error);
	}
}

export {
    GetData,
    GetFetchLink
}