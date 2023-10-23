console.log('Extensão "Calculadora de Horas Trabalhadas" carregada')
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
    let parsedClock = JSON.parse(clock)
    const actualDate = new Date()
    const newClock = parsedClock.some(item => new Date(item).getDate() !== actualDate.getDate())
    if(newClock) {
        parsedClock = []
    }

    parsedClock.push(actualDate)

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
const onMutation = async (mutations) => {
    mo.disconnect();

    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if(node.textContent.includes('Batida realizada') || node.textContent.includes('This is the DIV you added.')) {
                const clock = await getClock()
                await updateClock(clock)
            }
            if(node.className === 'div-clock po-sm-12 po-md-12 po-lg-12 po-xl-12') {
                const clock = await getClock()
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