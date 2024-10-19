// static/script.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('/folders')
        .then(response => response.json())
        .then(folders => {
            const folderSelect = document.getElementById('folder-select');
            folders.forEach(folder => {
                const option = document.createElement('option');
                option.value = folder;
                option.textContent = folder;
                folderSelect.appendChild(option);
            });
        });

    document.getElementById('go-button').onclick = () => {
        const selectedFolder = document.getElementById('folder-select').value;
        displayFiles(selectedFolder);
    };

    document.getElementById('back-button').onclick = () => {
        document.getElementById('results').innerHTML = '';
        document.getElementById('folder-select').style.display = 'block';
        document.getElementById('go-button').style.display = 'block';
        document.getElementById('back-button').style.display = 'none';
    };
});

function displayFiles(folder) {
    const results = document.getElementById('results');
    results.innerHTML = `<h2>${folder} Files:</h2><ul>`;
    
    fetch(`/files/${folder}`)
        .then(response => response.json())
        .then(files => {
            if (files.length === 0) {
                results.innerHTML += '<li>No zip files found.</li>';
            } else {
                files.forEach(file => {
                    const cleanName = decodeURIComponent(file.replace(/%20/g, ' ')).replace(/\.zip$/, '');
                    const li = document.createElement('li');
                    li.innerHTML = `${cleanName} <a href="/download/${folder}/${file}" download>Download</a>`;
                    results.appendChild(li);
                });
            }
            results.innerHTML += '</ul>';
            document.getElementById('folder-select').style.display = 'none';
            document.getElementById('go-button').style.display = 'none';
            document.getElementById('back-button').style.display = 'inline-block';
        });
}
