function calculateTotalMillis(data) {
    try {
        let totalMillis = 0;
        for (let i = 0; i < data.items.length; i += 2) {
            if (data.items[i + 1]) {
                totalMillis += (data.items[i + 1].hour - data.items[i].hour);
            }
        }

        const lastItem = data.items[data.items.length - 1];
        if (lastItem && lastItem.direction === "entry") {
            const now = new Date();
            const nowMillis = (now.getHours() * 60 * 60 * 1000) + (now.getMinutes() * 60 * 1000) + (now.getSeconds() * 1000);
            totalMillis += nowMillis - lastItem.hour;
        }

        return totalMillis;
    } catch (err) {
        return 0
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Busca os dados das horas trabalhadas no chrome.storage.local
    let teste = ''
    chrome.storage.local.get("workingHoursData", function(result) {
        const data = result.workingHoursData;
        if (data && data.items) {
            let totalMillis = calculateTotalMillis(data);

            const totalHours = Math.floor(totalMillis / (60 * 60 * 1000));
            const totalMinutes = Math.floor((totalMillis % (60 * 60 * 1000)) / (60 * 1000));

            const remainingMillis = (8 * 60 * 60 * 1000) - totalMillis;
            let adjustedRemainingMillis = remainingMillis < 0 ? 0 : remainingMillis;
            const remainingHours = Math.floor(adjustedRemainingMillis / (60 * 60 * 1000));
            const remainingMinutes = Math.floor((adjustedRemainingMillis % (60 * 60 * 1000)) / (60 * 1000));

            const displayText = `Horas trabalhadas: ${totalHours}h ${totalMinutes}m. Restante: ${remainingHours}h ${remainingMinutes}m`;
            document.getElementById("hoursData").textContent = displayText
        } else {
            document.getElementById("hoursData").textContent = "Dados não disponíveis. Abra a página do RH para atualizar.";
        }
    });
});
