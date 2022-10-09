export const getDistance = async (start, end) => {
	const getDistanceRequestURL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${start.latitude},${start.longitude}&destinations=${end.latitude}%2C${end.longitude}&key=AIzaSyBKyP60M6uX8_TUqeE5qoZiq2bsEdm9dEE`;
  
	return new Promise(async function (resolve, reject) {
	  try {
		const matrix = await fetch(getDistanceRequestURL, { method: 'GET' });
		const matrixJson = await matrix.json();
		const rows = matrixJson.rows;
		if (!rows || rows.length < 1) {
		  reject();
		}
		const elements = rows[0].elements;
		if (!elements || elements.length < 1) {
		  reject();
		}
		resolve(elements[0]?.distance?.value);
  
	  } catch (error) {
		console.log(error);
		reject();
	  }
	});
  };