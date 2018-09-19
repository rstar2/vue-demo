function upload(formData, inputName = 'files') {
    const files = formData.getAll(inputName);
    const promises = files.map((file) => getImage(file)
        .then(dataUrl => ({
            name: file.name,
            size: file.size,
            url: dataUrl
        })));

    return Promise.all(promises);
}

function getImage(file) {
    return new Promise((resolve, reject) => {
        const fReader = new FileReader();

        fReader.onload = () => {
            resolve(fReader.result);
        };

        fReader.onerror = reject;

        fReader.readAsDataURL(file);
    });
}

export { upload };
