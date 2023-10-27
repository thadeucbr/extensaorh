console.log('Extensão "Calculadora de Horas Trabalhadas" carregada')
async function callTotvsApi() {
    const token = localStorage.getItem("token");

    const apiResponse = await fetch("https://curupirasa132885.rm.cloudtotvs.com.br/FrameHTML/rm/api/rest/new/timesheet/todayClockings/%7Bcurrent%7D/0/0/", {
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
    }).then((response) => response.json())

    const data = apiResponse.items.map(item => {
        const dateValue = item.date;
        const hourValue = item.hour;

        const dateObj = new Date(dateValue);

        dateObj.setTime(dateObj.getTime() + hourValue);

        const date = dateObj.toISOString().replace('Z', '')

        return date;
    });
    return data
}
async function getClock() {
    const storedData = await chrome.storage.sync.get(['clocked']);
    if (storedData?.clocked) {
        const actualDate = new Date();
        const parsedClock = JSON.parse(storedData.clocked)
        const newClock = parsedClock.some(clock => new Date(clock).getDate() !== actualDate.getDate())
        if (newClock) {
            storedData.clocked = '[]'
        }
    }
    if (!storedData?.clocked) {
        storedData.clocked = '[]'
    }
    return storedData.clocked
}
async function updateClock (clock) {
    let parsedClock = await callTotvsApi()
    const actualDate = new Date()
    const newClock = parsedClock.some(item => new Date(item).getDate() !== actualDate.getDate())
    if(newClock) {
        parsedClock = []
    }
    await chrome.storage.sync.set({ clocked: JSON.stringify(parsedClock)})
    return JSON.stringify(parsedClock)
}

function totalWorkedTime(clock) {
    const parsedClock = JSON.parse(clock);
    if (parsedClock.length === 0) {
        return "00:00";
    }

    let totalMilliseconds = 0;

    if (parsedClock.length % 2 === 1) {
        parsedClock.push(new Date().toISOString());
    }

    for (let i = 0; i < parsedClock.length; i += 2) {
        const startTime = new Date(parsedClock[i]);
        const endTime = new Date(parsedClock[i + 1]);

        const diffInMilliseconds = endTime - startTime;
        totalMilliseconds += diffInMilliseconds;
    }

    const totalMinutes = totalMilliseconds / (1000 * 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = Math.round(totalMinutes % 60);

    return `${String(totalHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
}


function timeRemainingTo8Hours(clock) {
    const totalWorked = totalWorkedTime(clock);
    const [workedHours, workedMinutes] = totalWorked.split(":");
    const totalWorkedMinutes = parseInt(workedHours) * 60 + parseInt(workedMinutes);

    const targetMinutes = 8 * 60;

    const remainingMinutes = targetMinutes - totalWorkedMinutes;

    const now = new Date();
    const estimatedExitTime = new Date(now.getTime() + remainingMinutes * 60 * 1000);

    const estimatedExitHours = estimatedExitTime.getHours();
    const estimatedExitMinutes = estimatedExitTime.getMinutes();
    const formattedEstimatedExitTime = `${String(estimatedExitHours).padStart(2, '0')}:${String(estimatedExitMinutes).padStart(2, '0')}`;

    return {
        formattedEstimatedExitTime,
        totalWorked
    };
}

async function insertElement(node){
    const clock = await updateClock()
    const remainingTime = timeRemainingTo8Hours(clock)
    const [hour, minute] = remainingTime.totalWorked;
    const timeElement = document.createElement('span');
    if (hour >= 8) {
        timeElement.textContent = `Hoje você trabalhou ${hour}:${minute}`
    } else {
        timeElement.textContent = `Tempo trabalhado ${remainingTime.totalWorked}. Horário estimado de saida ${remainingTime.formattedEstimatedExitTime}`;
    }
    node.appendChild(timeElement)
}
const onMutation = async (mutations) => {
    mo.disconnect();

    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if(node.textContent.includes('Batida realizada') || node.textContent.includes('This is the DIV you added.')) {
                insertElement(node)
            }
            if(node.className === 'div-clock po-sm-12 po-md-12 po-lg-12 po-xl-12') {
               insertElement(node)
            }
        }
    }

    observe();
}

const observe = () => {
    mo.observe(document, {
        subtree: true,
        childList: true,
    });
}

const mo = new MutationObserver(onMutation);

observe();