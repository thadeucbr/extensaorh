document.addEventListener('DOMContentLoaded', function() {
    const radios = document.querySelectorAll('input[name="version"]');
    const saveButton = document.getElementById('saveSettings');

    chrome.storage.local.get('version', function(data) {
        if (data.version === 'funny') {
            radios[1].checked = true;
        }
    });

    saveButton.addEventListener('click', function() {
        let selectedVersion = Array.from(radios).find(r => r.checked).value;
        chrome.storage.local.set({ 'version': selectedVersion }, function() {
            window.close();
        });
    });
});