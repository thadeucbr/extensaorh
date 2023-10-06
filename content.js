console.log('Extensão "Calculadora de Horas Trabalhadas" carregada');
if (!window.hasRunContentScript) {
    window.hasRunContentScript = true;

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

    function checkPageAndRun() {
        if (window.location.href.includes("https://curupirasa132885.rm.cloudtotvs.com.br/FrameHTML/web/app/RH/PortalMeuRH/#/timesheet/clockingsGeo/register")) {
            const token = localStorage.getItem("token");

            fetch("https://curupirasa132885.rm.cloudtotvs.com.br/FrameHTML/rm/api/rest/new/timesheet/todayClockings/%7Bcurrent%7D/0/0/", {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "pt-PT,pt;q=0.9,en-US;q=0.8,en;q=0.7",
                    "authorization": `Bearer ${token}`,
                    "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-totvs-app": "0533",
                    "Referer": "https://curupirasa132885.rm.cloudtotvs.com.br/FrameHTML/web/app/RH/PortalMeuRH/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                "method": "GET"
            })
                .then(response => response.json())
                .then(data => {
                    chrome.storage.local.set({workingHoursData: data});
                    console.log("Dados armazenados:", data);

                    let totalMillis = calculateTotalMillis(data);

                    const totalHours = Math.floor(totalMillis / (60 * 60 * 1000));
                    const totalMinutes = Math.floor((totalMillis % (60 * 60 * 1000)) / (60 * 1000));

                    const remainingMillis = (8 * 60 * 60 * 1000) - totalMillis;

                    let adjustedRemainingMillis = remainingMillis < 0 ? 0 : remainingMillis;

                    const remainingHours = Math.floor(adjustedRemainingMillis / (60 * 60 * 1000));
                    const remainingMinutes = Math.floor((adjustedRemainingMillis % (60 * 60 * 1000)) / (60 * 1000));

                    const timeElement = document.createElement('span');

                    timeElement.textContent = `Horas trabalhadas: ${totalHours}h ${totalMinutes}m. Restante: ${remainingHours}h ${remainingMinutes}m`;

                    let divClock = document.querySelector(".div-clock");
                    if (divClock) {
                        divClock.appendChild(timeElement);
                    }
                });
        }
    }

    setTimeout(checkPageAndRun, 2000);

    let lastURL = window.location.href;
    new MutationObserver(() => {
        if (lastURL !== window.location.href) {
            lastURL = window.location.href;
            checkPageAndRun();
        }
    }).observe(document, {subtree: true, childList: true});

    window.addEventListener('beforeunload', function (event) {
        updateDataBeforeLeaving();
    });

    function updateDataBeforeLeaving() {
        const token = localStorage.getItem("token");
        console.log('Atualizando dados')
        fetch("https://curupirasa132885.rm.cloudtotvs.com.br/FrameHTML/rm/api/rest/new/timesheet/todayClockings/%7Bcurrent%7D/0/0/", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "pt-PT,pt;q=0.9,en-US;q=0.8,en;q=0.7",
                "authorization": `Bearer ${token}`,
                "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-totvs-app": "0533",
                "Referer": "https://curupirasa132885.rm.cloudtotvs.com.br/FrameHTML/web/app/RH/PortalMeuRH/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "method": "GET"
        })
            .then(response => response.json())
            .then(data => {
                chrome.storage.local.set({workingHoursData: data});
            });
    }
}