async function getVersion() {
    const data = await chrome.storage.sync.get(['version']);
    if (!data?.version) {
        return 'short'
    }
    return data.version
}

async function saveVersion(version) {
    chrome.storage.sync.set({ version })
}

document.addEventListener('DOMContentLoaded', async function() {
    const radios = document.querySelectorAll('input[name="version"]');
    const saveButton = document.getElementById('saveSettings');

    const version = await getVersion()
    console.log(version)
    if (version === 'full') {
        radios[0].checked = true;
    } else {
        radios[1].checked = true;
    }

    saveButton.addEventListener('click', function() {
        let selectedVersion = Array.from(radios).find(r => r.checked).value;
        saveVersion(selectedVersion)
        window.close()
    });
});