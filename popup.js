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
        "Você é incrível! Já se passaram {extraHours} desde que você completou suas 8 horas.",
        "Hora de um merecido descanso! Você já trabalhou {extraHours} a mais!",
        "Vai descansar! Você merece após {extraHours} extras!",
        "Você é um guerreiro! {extraHours} a mais e contando.",
        "Já pensou em uma pausa? {extraHours} extra é um bom motivo.",
        "Hora extra detectada! {extraHours} e contando.",
        "Cuidado para não se sobrecarregar! Você já tem {extraHours} a mais.",
        "Você é um exemplo! Mas lembre-se de descansar após essas {extraHours} extras.",
        "Parece que alguém está se esforçando! {extraHours} a mais já!",
        "Dê uma pausa, herói do escritório! Você já tem {extraHours} extras.",
        "Você está on fire! Já são {extraHours} além do seu horário.",
        "Seu compromeextraHoursnto é evidente. Já são {extraHours} a mais!",
        "Lembre-se de cuidar de si mesmo após essas {extraHours} extras.",
        "Uau, você está determinado! Já são {extraHours} a mais.",
        "Não esqueça de se esticar após essas {extraHours} extras.",
        "Seu tempo extra é impressionante! Já são {extraHours}.",
        "Não esqueça de se hidratar após {extraHours} de trabalho extra!",
        "Quem é essa máquina de trabalho? Já são {extraHours} a mais!",
        "Você está brilhando! E já são {extraHours} extras.",
        "Não se esqueça de fazer uma pausa após essas {extraHours} a mais.",
        "Impressionante! Você já tem {extraHours} de trabalho extra.",
        "Espero que esteja se mantendo hidratado com essas {extraHours} extras.",
        "Lembre-se de descansar os olhos após {extraHours} a mais.",
        "Vai com calma! Já são {extraHours} a mais.",
        "Seu esforço não passa despercebido! Já são {extraHours} extras.",
        "Você é a estrela do dia com essas {extraHours} a mais!",
        "Continue assim e você será o funcionário do mês! Já são {extraHours} extras.",
        "Você está indo além! Já são {extraHours} a mais.",
        "Não esqueça de fazer uma pausa, já são {extraHours} extras!",
        "Você é imparável! Mas lembre-se de descansar após {extraHours} a mais."
    ],
    notClockedYetMessages: [
        "Ei! Você esqueceu de algo? Ainda não marcou o ponto!",
        "Parece que alguém esqueceu de bater o ponto. Será que é você?",
        "Seu relógio está te chamando... Vai marcar o ponto?",
        "Opa! Não vi seu ponto aqui. Já marcou?",
        "Está esperando um convite especial para marcar o ponto?",
        "Não queremos que você trabalhe de graça! Vai lá e marque o ponto.",
        "Bater o ponto é como dizer 'Oi' para o relógio. Já disse 'Oi' hoje?",
        "Alô? Seu ponto está esperando...",
        "Não se preocupe, o relógio não morde. Pode marcar o ponto!",
        "Se você não marcar o ponto, quem vai?",
        "O relógio está se sentindo solitário. Dê uma passada lá!",
        "Marcar o ponto é como dar check-in no trabalho. Não se esqueça!",
        "Pssst... Você esqueceu de algo importante. Seu ponto!",
        "Vai uma dica? Marque o ponto antes que o relógio sinta sua falta.",
        "Seu chefe pode não ter visto, mas eu vi. Vai marcar o ponto?",
        "Não deixe o relógio esperando. Ele está ansioso pelo seu ponto.",
        "Opa! Acho que você esqueceu de um detalhe... Seu ponto!",
        "Marcar o ponto é o primeiro passo do dia. Já deu o seu?",
        "Você sente que está esquecendo algo? Ah, é o ponto!",
        "Antes de tudo, marque o ponto. O resto vem depois!",
        "Hey! O relógio está te chamando. Atenda e marque o ponto.",
        "Já tomou café? Já marcou o ponto? Não? Então vá lá!",
        "Não se esqueça: café primeiro, depois o ponto. Ou seria o contrário?",
        "Se está lendo isso, é um lembrete para marcar o ponto.",
        "Bater o ponto é o 'bom dia' que você dá para o relógio. Já deu o seu hoje?"
    ]
};

async function getClock() {
    try {
        const storedData = await chrome.storage.sync.get(['clocked']);
        if (!storedData.clocked) {
            storedData.clocked = '[]'
        }
        return storedData.clocked
    } catch (err) {
        console.log(err)
        const storedData = await chrome.storage.sync.get(['clocked']);
        if (!storedData.clocked) {
            storedData.clocked = '[]'
        }
        return storedData.clocked
    }
}

async function getVersion() {
    const data = await chrome.storage.sync.get(['version']);
    if (!data?.version) {
        return 'short'
    }
    return data.version
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
    const totalWorked = clock;

    const [workedHours, workedMinutes] = totalWorked.split(":");
    const totalWorkedMinutes = parseInt(workedHours) * 60 + parseInt(workedMinutes);

    const targetMinutes = 8 * 60;

    const remainingMinutes = targetMinutes - totalWorkedMinutes;

    const now = new Date();
    const estimatedExitTime = new Date(now.getTime() + remainingMinutes * 60 * 1000);

    const estimatedExitHours = estimatedExitTime.getHours();
    const estimatedExitMinutes = estimatedExitTime.getMinutes();
    const formattedEstimatedExitTime = `${String(estimatedExitHours).padStart(2, '0')}:${String(estimatedExitMinutes).padStart(2, '0')}`;

    const hoursRemaining = Math.floor(remainingMinutes / 60);
    const minutesRemaining = remainingMinutes % 60;

    const formattedRemainingTime = `${String(hoursRemaining).padStart(2, '0')}:${String(minutesRemaining).padStart(2, '0')}`;

    return {
        formattedEstimatedExitTime,
        totalWorked,
        formattedRemainingTime
    };
}

function shortMode(hour, minute, formattedEstimatedExitTime) {
    let message;
    if (hour < 8) {
        const randomIndex = Math.floor(Math.random() * funnyMessages.before8Hours.length);
        message = funnyMessages.before8Hours[randomIndex].replace('{estimatedEnd}', formattedEstimatedExitTime);
    } else {
        const randomIndex = Math.floor(Math.random() * funnyMessages.after8Hours.length);
        message = funnyMessages.after8Hours[randomIndex].replace('{extraHours}', `${hour}:${minute}`);
    }
    document.getElementById("hoursData").innerHTML = message;
}

function fullMode({ totalWorked, formattedEstimatedExitTime, formattedRemainingTime }) {
    const html = `<p id="workedHours"/>\n<p id="remainingHours"/>\n<p id="estimatedEnd"/>`;
    document.getElementById("hoursData").innerHTML = html;
    document.getElementById("workedHours").textContent = `Horas trabalhadas: ${totalWorked}`;
    document.getElementById("remainingHours").textContent = `Restante: ${formattedRemainingTime}`;
    document.getElementById("estimatedEnd").textContent = `Você deve trabalhar até as ${formattedEstimatedExitTime}`;
}

async function insertElement() {
    const clock = await getClock();
    const totalWorkedT = totalWorkedTime(clock);
    const { totalWorked, formattedEstimatedExitTime, formattedRemainingTime } = timeRemainingTo8Hours(totalWorkedT);
    const [hour, minute] = totalWorked.split(':');
    const version = await getVersion();

    if (version === 'full') {
        fullMode({ totalWorked, formattedEstimatedExitTime, formattedRemainingTime })
    } else {
        shortMode(hour, minute, formattedEstimatedExitTime)
    }
}

document.getElementById('openSettings').addEventListener('click', function () {
    var leftPosition = window.screen.width * 0.45;
    var topPosition = window.screen.height * 0.45;

    settings = window.open(chrome.runtime.getURL('settings.html'), 'settings', `width=300,height=200,left=${leftPosition},top=${topPosition}`);

    settings.addEventListener('beforeunload', function () {
        insertElement()
    })
});


document.addEventListener("DOMContentLoaded", async function () {
    await insertElement()
});