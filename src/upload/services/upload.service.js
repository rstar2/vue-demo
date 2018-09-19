import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

/**
 *
 * @param {FormData} formData
 * @param {String} uploadUrl
 * @returns {Promise<[]>}
 */
function upload(formData, uploadUrl= 'upload/files') {
    const url = `${BASE_URL}/${uploadUrl}`;
    return axios.post(url, formData)
        // get data
        .then(res => res.data)
        // add url field
        .then(data => data.map(file => Object.assign({},
            file, { url: `${BASE_URL}/file/${file.id}` })));
}

export { upload };
