chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentTab = tabs[0];
    const url = currentTab.url;

    if (url.includes("https://curupirasa132885.rm.cloudtotvs.com.br/FrameHTML/web/app/RH/PortalMeuRH/#/timesheet/clockingsGeo/register")) {
        chrome.scripting.executeScript({
            target: {tabId: currentTab.id},
            files: ["content.js"]
        });
    }
});

const funnyMessages = {
    before8Hours: [
        "Segura o coração! Só às {estimatedEnd}",
        "Ainda não, guerreiro! Só às {estimatedEnd}",
        "Falta só um pouquinho... Só às {estimatedEnd}",
        "A persistência é o caminho! Só às {estimatedEnd}",
        "Quase lá! Só às {estimatedEnd}",
        "Pense positivo: só faltam algumas horas até {estimatedEnd}!",
        "Vamos lá, campeão! O fim está próximo às {estimatedEnd}",
        "Contando os minutos? Só falta até {estimatedEnd}!",
        "Mantenha a calma! A liberdade te aguarda às {estimatedEnd}",
        "Respire fundo! Logo às {estimatedEnd} você estará livre.",
        "O relógio não para, e nem você! Até {estimatedEnd}",
        "Nem pense em sair... Só às {estimatedEnd}!",
        "O descanso está vindo! Só esperar até {estimatedEnd}",
        "Força na peruca! Só mais um pouquinho até {estimatedEnd}",
        "Eu sei, eu sei... Só às {estimatedEnd}!",
        "A recompensa? Sair às {estimatedEnd}!",
        "Paciência é uma virtude... Pratique até {estimatedEnd}",
        "Se anima! Falta pouco para as {estimatedEnd}",
        "Não desanime! Seu horário mágico é {estimatedEnd}",
        "A contagem regressiva começa... para {estimatedEnd}!",
        "Paciência é uma virtude! Fique até as {estimatedEnd}.",
        "Não corra! Você ainda tem até as {estimatedEnd}.",
        "Ainda não é a hora! Seu relógio diz {estimatedEnd}.",
        "Não se apresse, seu dia termina às {estimatedEnd}.",
        "Ainda não é hora da liberdade! Espere até as {estimatedEnd}.",
        "Ainda tem tempo! Relaxe até as {estimatedEnd}.",
        "Vai um café? Você ainda tem até as {estimatedEnd}.",
        "Ainda não é a hora do happy hour! Fique até as {estimatedEnd}.",
        "Respire fundo e aguente até as {estimatedEnd}.",
        "O dia ainda não acabou! Seu final é às {estimatedEnd}."
    ],
    after8Hours: [
        "Hey, o mundo não vai acabar se você parar agora!",
        "Você está pegando pesado! Já são {extraHours} a mais!",
        "Seu compromisso de 8 horas já foi! Está na hora do bônus.",
        "Olha você fazendo hora extra! Já são {extraHours} a mais.",
        "Relaxa, você já fez sua parte! Agora é hora extra.",
        "Você é incrível! Já se passaram {time} desde que você completou suas 8 horas.",
        "Hora de um merecido descanso! Você já trabalhou {time} a mais!",
        "Vai descansar! Você merece após {time} extras!",
        "Você é um guerreiro! {time} a mais e contando.",
        "Já pensou em uma pausa? {time} extra é um bom motivo.",
        "Hora extra detectada! {time} e contando.",
        "Cuidado para não se sobrecarregar! Você já tem {time} a mais.",
        "Você é um exemplo! Mas lembre-se de descansar após essas {time} extras.",
        "Parece que alguém está se esforçando! {time} a mais já!",
        "Dê uma pausa, herói do escritório! Você já tem {time} extras.",
        "Você está on fire! Já são {time} além do seu horário.",
        "Seu comprometimento é evidente. Já são {time} a mais!",
        "Lembre-se de cuidar de si mesmo após essas {time} extras.",
        "Uau, você está determinado! Já são {time} a mais.",
        "Não esqueça de se esticar após essas {time} extras.",
        "Seu tempo extra é impressionante! Já são {time}.",
        "Não esqueça de se hidratar após {time} de trabalho extra!",
        "Quem é essa máquina de trabalho? Já são {time} a mais!",
        "Você está brilhando! E já são {time} extras.",
        "Não se esqueça de fazer uma pausa após essas {time} a mais.",
        "Impressionante! Você já tem {time} de trabalho extra.",
        "Espero que esteja se mantendo hidratado com essas {time} extras.",
        "Lembre-se de descansar os olhos após {time} a mais.",
        "Vai com calma! Já são {time} a mais.",
        "Seu esforço não passa despercebido! Já são {time} extras.",
        "Você é a estrela do dia com essas {time} a mais!",
        "Continue assim e você será o funcionário do mês! Já são {time} extras.",
        "Você está indo além! Já são {time} a mais.",
        "Não esqueça de fazer uma pausa, já são {time} extras!",
        "Você é imparável! Mas lembre-se de descansar após {time} a mais."
    ]
};

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
document.getElementById('openSettings').addEventListener('click', function() {
    window.open(chrome.runtime.getURL('settings.html'), 'settings', 'width=300,height=200');
});

document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.local.get(["workingHoursData", "version"], function(result) {
        const data = result.workingHoursData;
        const version = result.version || 'funny';

        if (data && data.items) {
            let totalMillis = calculateTotalMillis(data);
            const totalHours = Math.floor(totalMillis / (60 * 60 * 1000));
            const totalMinutes = Math.floor((totalMillis % (60 * 60 * 1000)) / (60 * 1000));

            const remainingMillis = (8 * 60 * 60 * 1000) - totalMillis;
            let adjustedRemainingMillis = remainingMillis < 0 ? 0 : remainingMillis;

            const now = new Date();
            const estimatedEndMillis = now.getTime() + adjustedRemainingMillis;
            const estimatedEnd = new Date(estimatedEndMillis);
            const formattedEstimatedEnd = `${String(estimatedEnd.getHours()).padStart(2, '0')}:${String(estimatedEnd.getMinutes()).padStart(2, '0')}`;

            if (version === 'funny') {
                let message;

                if (totalMillis <= 8 * 60 * 60 * 1000) {
                    const randomIndex = Math.floor(Math.random() * funnyMessages.before8Hours.length);
                    message = funnyMessages.before8Hours[randomIndex].replace('{estimatedEnd}', formattedEstimatedEnd);
                } else {
                    const extraMillis = totalMillis - 8 * 60 * 60 * 1000;
                    const extraHours = Math.floor(extraMillis / (60 * 60 * 1000));
                    const extraMinutes = Math.floor((extraMillis % (60 * 60 * 1000)) / (60 * 1000));
                    const extraTime = extraHours > 0 ? `${extraHours} horas e ${extraMinutes} minutos` : `${extraMinutes} minutos`;

                    const randomIndex = Math.floor(Math.random() * funnyMessages.after8Hours.length);
                    message = funnyMessages.after8Hours[randomIndex].replace('{extraHours}', extraTime);
                }

                document.getElementById("hoursData").innerHTML = message;
            } else {
                const formattedWorkedHours = `${String(totalHours).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}`;
                const remainingHours = Math.floor(adjustedRemainingMillis / (60 * 60 * 1000));
                const remainingMinutes = Math.floor((adjustedRemainingMillis % (60 * 60 * 1000)) / (60 * 1000));
                const formattedRemainingHours = `${String(remainingHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;

                document.getElementById("workedHours").textContent = `Horas trabalhadas: ${formattedWorkedHours}`;
                document.getElementById("remainingHours").textContent = `Restante: ${formattedRemainingHours}`;
                document.getElementById("estimatedEnd").textContent = `Você deve trabalhar até as ${formattedEstimatedEnd}`;
            }
        } else {
            document.getElementById("hoursData").textContent = "Dados não disponíveis. Abra a página do RH para atualizar.";
        }
    });
});
