let table = document.getElementById('table')

let player_data_array = []

let data = [...table.rows]

let cells_data_array = []
data.forEach(elem => {
    let cell_data = [...elem.cells]
    cells_data_array.push(cell_data)
})

cells_data_array.forEach((elem, i) => {
    let player_data = {
        recomendacao: elem[0].innerHTML,
        informacao: elem[1].innerHTML,
        nome: elem[2].innerHTML,
        id: elem[51].innerHTML,
        posicoes: elem[3].innerHTML.split(' '),
        atributos: {
            visao: Number(elem[4].innerHTML),
            um_pra_um: Number(elem[5].innerHTML),
            trab_equipe: Number(elem[6].innerHTML),
            tecnica: Number(elem[7].innerHTML),
            sem_bola: Number(elem[8].innerHTML),
            remate_longe: Number(elem[9].innerHTML),
            reflexos: Number(elem[10].innerHTML),
            primeiro_toque: Number(elem[11].innerHTML),
            posicionamento: Number(elem[12].innerHTML),
            pontape: Number(elem[13].innerHTML),
            passe: Number(elem[14].innerHTML),
            penalti: Number(elem[15].innerHTML),
            marcacao: Number(elem[16].innerHTML),
            livres: Number(elem[17].innerHTML),
            lideranca: Number(elem[18].innerHTML),
            lanca_longo: Number(elem[19].innerHTML),
            lancamento: Number(elem[20].innerHTML),
            jogo_de_mao: Number(elem[21].innerHTML),
            ind_trabalho: Number(elem[22].innerHTML),
            imprevisibilidade: Number(elem[23].innerHTML),
            finta: Number(elem[24].innerHTML),
            finalizacao: Number(elem[25].innerHTML),
            excentricidade: Number(elem[26].innerHTML),
            determinacao: Number(elem[27].innerHTML),
            desarme: Number(elem[28].innerHTML),
            decisao: Number(elem[29].innerHTML),
            cruzamento: Number(elem[30].innerHTML),
            concentracao: Number(elem[31].innerHTML),
            comunicacao: Number(elem[32].innerHTML),
            compostura: Number(elem[33].innerHTML),
            comando_area: Number(elem[34].innerHTML),
            cantos: Number(elem[35].innerHTML),
            cabeceamento: Number(elem[36].innerHTML),
            bravura: Number(elem[37].innerHTML),
            antecipacao: Number(elem[38].innerHTML),
            alcance_aereo: Number(elem[39].innerHTML),
            agressividade: Number(elem[40].innerHTML),
            tenden_socar: Number(elem[41].innerHTML),
            aceleracao: Number(elem[42].innerHTML),
            agilidade: Number(elem[43].innerHTML),
            equilibrio: Number(elem[44].innerHTML),
            impulsao: Number(elem[45].innerHTML),
            apti_fisica: Number(elem[46].innerHTML),
            velocidade: Number(elem[47].innerHTML),
            resistencia: Number(elem[48].innerHTML),
            forca: Number(elem[49].innerHTML),
            tenden_sair_bali: Number(elem[50].innerHTML)
        }

    }
    player_data_array.push(player_data)

})

console.log(player_data_array)

let avancados = []
let medio_ofensivo = []
let meias = []
let defesas = []
let goleiros = []

player_data_array.forEach((elem, i) => {
    elem.posicoes.forEach(pos => {
        if (pos == "PL"){
            avancados.push(elem)
        }
        else if(pos == "MO"){
            medio_ofensivo.push(elem)
        }
        else if(pos == "M"){
            meias.push(elem)
        }
        else if(pos == "D"){
            defesas.push(elem)
        }
        else if(pos == "GR"){
            goleiros.push(elem)
        }
        else if(pos == "D/M/MO"){
            defesas.push(elem)
            meias.push(elem)
            medio_ofensivo.push(elem)
        }
        else if(pos == "M/MO"){
            meias.push(elem)
            medio_ofensivo.push(elem)
        }
        else if(pos == "D/M"){
            defesas.push(elem)
            meias.push(elem)
        }
        else if(pos == "MD,"){
            meias.push(elem)
        }
        else if (pos == 'DA/M'){
            defesas.push(elem)
            meias.push(elem)
        }
        else if(pos == "D/DA"){
            defesas.push(elem)
        }
    })
    
})
 
const Striker = (player_data_array) => {
    let best_strikers_array = []
    player_data_array.forEach((elem, i) => {
        let best_attr_chaves = 140
        let best_attr_secundarios = 128
        let best_attr_mentais = 40

        const CalcOverall = (chaves, secundarios, mentais) => {
            let best_attr = best_attr_chaves + best_attr_mentais + best_attr_secundarios
            let player_attr = chaves + secundarios + mentais
            let overall = (player_attr * 100) / best_attr

            return overall
        }
        const MediaGeral = (obj) => {
            const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);
            let media_geral = sumValues(obj) / 47
            return media_geral
        }

        const MediaPosicao = (chaves, secundarios, mentais) => {
            let media_chaves = chaves / 7
            let media_secundarios = (secundarios / 0.8) / 8
            let media_mentais = (mentais / 0.5) / 4
            let media_posicao = (media_chaves + media_secundarios + media_mentais) / 3

            return media_posicao
        }

        let nome = elem.nome
        let atributos = elem.atributos
        if (i > 0) {
            attr_chaves = (atributos.finalizacao + atributos.finta + atributos.primeiro_toque + atributos.tecnica + atributos.sem_bola + atributos.compostura + atributos.aceleracao)
            attr_secundarios = (atributos.passe + atributos.ind_trabalho + atributos.decisao + atributos.antecipacao + atributos.agilidade + atributos.equilibrio + atributos.resistencia + atributos.velocidade) * 0.8
            attr_mentais = (atributos.antecipacao + atributos.determinacao + atributos.decisao + atributos.apti_fisica) * 0.5
            let best_striker = {
                nome: nome,
                id: elem.id,
                attr_chaves: attr_chaves,
                attr_secundarios: attr_secundarios,
                attr_mentais: attr_mentais,
                media: MediaPosicao(attr_chaves, attr_secundarios, attr_mentais),
                overall: CalcOverall(attr_chaves, attr_secundarios, attr_mentais),
                media_attr: MediaGeral(atributos)
            }
            best_strikers_array.push(best_striker)
        }

    })
    return best_strikers_array.sort((a, b) => b.overall - a.overall).slice(0, 5)
}
const AvançadoInterior = (player_data_array) => {
    let best_avancado_array = []
    player_data_array.forEach((elem, i) => {
        let best_attr_chaves = 160
        let best_attr_secundarios = 96
        let best_attr_mentais = 40

        const CalcOverall = (chaves, secundarios, mentais) => {
            let best_attr = best_attr_chaves + best_attr_mentais + best_attr_secundarios
            let player_attr = chaves + secundarios + mentais
            let overall = (player_attr * 100) / best_attr

            return overall
        }
        const MediaGeral = (obj) => {
            const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);
            let media_geral = sumValues(obj) / 47
            return media_geral
        }

        const MediaPosicao = (chaves, secundarios, mentais) => {
            let media_chaves = chaves / 8
            let media_secundarios = (secundarios / 0.8) / 6
            let media_mentais = (mentais / 0.5) / 4
            let media_posicao = (media_chaves + media_secundarios + media_mentais) / 3

            return media_posicao
        }

        let nome = elem.nome
        let atributos = elem.atributos
        if (i > 0) {
            attr_chaves = (atributos.finalizacao + atributos.finta + atributos.primeiro_toque + atributos.tecnica + atributos.sem_bola + atributos.aceleracao + atributos.agilidade + atributos.equilibrio)
            attr_secundarios = (atributos.passe + atributos.remate_longe + atributos.imprevisibilidade + atributos.antecipacao + atributos.compostura + atributos.velocidade) * 0.8
            attr_mentais = (atributos.antecipacao + atributos.determinacao + atributos.decisao + atributos.apti_fisica) * 0.5
            let best_avancado = {
                nome: nome,
                id: elem.id,
                attr_chaves: attr_chaves,
                attr_secundarios: attr_secundarios,
                attr_mentais: attr_mentais,
                media: MediaPosicao(attr_chaves, attr_secundarios, attr_mentais),
                overall: CalcOverall(attr_chaves, attr_secundarios, attr_mentais),
                media_attr: MediaGeral(atributos)
            }
            best_avancado_array.push(best_avancado)
        }

    })
    return best_avancado_array.sort((a, b) => b.overall - a.overall).slice(0, 10)
}

const Extremo = (player_data_array) => {
    let best_extremo_array = []
    player_data_array.forEach((elem, i) => {
        let best_attr_chaves = 120
        let best_attr_secundarios = 80
        let best_attr_mentais = 40

        const CalcOverall = (chaves, secundarios, mentais) => {
            let best_attr = best_attr_chaves + best_attr_mentais + best_attr_secundarios
            let player_attr = chaves + secundarios + mentais
            let overall = (player_attr * 100) / best_attr

            return overall
        }
        const MediaGeral = (obj) => {
            const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);
            let media_geral = sumValues(obj) / 47
            return media_geral
        }

        const MediaPosicao = (chaves, secundarios, mentais) => {
            let media_chaves = chaves / 6
            let media_secundarios = (secundarios / 0.8) / 5
            let media_mentais = (mentais / 0.5) / 4
            let media_posicao = (media_chaves + media_secundarios + media_mentais) / 3

            return media_posicao
        }

        let nome = elem.nome
        let atributos = elem.atributos
        if (i > 0) {
            attr_chaves = (atributos.cruzamento + atributos.finta + atributos.tecnica + atributos.sem_bola + atributos.aceleracao + atributos.velocidade)
            attr_secundarios = (atributos.passe + atributos.primeiro_toque + atributos.imprevisibilidade + atributos.antecipacao + atributos.agilidade) * 0.8
            attr_mentais = (atributos.antecipacao + atributos.determinacao + atributos.decisao + atributos.apti_fisica) * 0.5
            let best_extremo = {
                nome: nome,
                id: elem.id,
                attr_chaves: attr_chaves,
                attr_secundarios: attr_secundarios,
                attr_mentais: attr_mentais,
                media: MediaPosicao(attr_chaves, attr_secundarios, attr_mentais),
                overall: CalcOverall(attr_chaves, attr_secundarios, attr_mentais),
                media_attr: MediaGeral(atributos)
            }
            best_extremo_array.push(best_extremo)
        }

    })
    return best_extremo_array.sort((a, b) => b.overall - a.overall).slice(0, 5)
}
const AvancadoSombra = (player_data_array) => {
    let best_sombra_array = []
    player_data_array.forEach((elem, i) => {
        let best_attr_chaves = 140
        let best_attr_secundarios = 144
        let best_attr_mentais = 40

        const CalcOverall = (chaves, secundarios, mentais) => {
            let best_attr = best_attr_chaves + best_attr_mentais + best_attr_secundarios
            let player_attr = chaves + secundarios + mentais
            let overall = (player_attr * 100) / best_attr

            return overall
        }
        const MediaGeral = (obj) => {
            const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);
            let media_geral = sumValues(obj) / 47
            return media_geral
        }

        const MediaPosicao = (chaves, secundarios, mentais) => {
            let media_chaves = chaves / 7
            let media_secundarios = (secundarios / 0.8) / 9
            let media_mentais = (mentais / 0.5) / 4
            let media_posicao = (media_chaves + media_secundarios + media_mentais) / 3

            return media_posicao
        }

        let nome = elem.nome
        let atributos = elem.atributos
        if (i > 0) {
            attr_chaves = (atributos.finalizacao + atributos.finta + atributos.primeiro_toque + atributos.sem_bola + atributos.antecipacao + atributos.compostura + atributos.aceleracao)
            attr_secundarios = (atributos.decisao + atributos.concentracao + atributos.tecnica + atributos.passe + atributos.ind_trabalho + atributos.velocidade + atributos.resistencia + atributos.equilibrio + atributos.agilidade) * 0.8
            attr_mentais = (atributos.antecipacao + atributos.determinacao + atributos.decisao + atributos.apti_fisica) * 0.5
            let best_sombra = {
                nome: nome,
                id: elem.id,
                attr_chaves: attr_chaves,
                attr_secundarios: attr_secundarios,
                attr_mentais: attr_mentais,
                media: MediaPosicao(attr_chaves, attr_secundarios, attr_mentais),
                overall: CalcOverall(attr_chaves, attr_secundarios, attr_mentais),
                media_attr: MediaGeral(atributos)
            }
            best_sombra_array.push(best_sombra)
        }

    })
    return best_sombra_array.sort((a, b) => b.overall - a.overall).slice(0, 5)
}
const Mezzala = (player_data_array) => {
    let best_mezzala_array = []
    player_data_array.forEach((elem, i) => {
        let best_attr_chaves = 120
        let best_attr_secundarios = 144
        let best_attr_mentais = 40

        const CalcOverall = (chaves, secundarios, mentais) => {
            let best_attr = best_attr_chaves + best_attr_mentais + best_attr_secundarios
            let player_attr = chaves + secundarios + mentais
            let overall = (player_attr * 100) / best_attr

            return overall
        }
        const MediaGeral = (obj) => {
            const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);
            let media_geral = sumValues(obj) / 47
            return media_geral
        }

        const MediaPosicao = (chaves, secundarios, mentais) => {
            let media_chaves = chaves / 6
            let media_secundarios = (secundarios / 0.8) / 9
            let media_mentais = (mentais / 0.5) / 4
            let media_posicao = (media_chaves + media_secundarios + media_mentais) / 3

            return media_posicao
        }

        let nome = elem.nome
        let atributos = elem.atributos
        if (i > 0) {
            attr_chaves = (atributos.passe + atributos.tecnica + atributos.decisao + atributos.ind_trabalho + atributos.sem_bola + atributos.aceleracao)
            attr_secundarios = (atributos.desarme + atributos.finta + atributos.primeiro_toque + atributos.remate_longe + atributos.visao + atributos.compostura + atributos.antecipacao + atributos.equilibrio + atributos.resistencia) * 0.8
            attr_mentais = (atributos.antecipacao + atributos.determinacao + atributos.decisao + atributos.apti_fisica) * 0.5
            let best_mezzala = {
                nome: nome,
                id: elem.id,
                attr_chaves: attr_chaves,
                attr_secundarios: attr_secundarios,
                attr_mentais: attr_mentais,
                media: MediaPosicao(attr_chaves, attr_secundarios, attr_mentais),
                overall: CalcOverall(attr_chaves, attr_secundarios, attr_mentais),
                media_attr: MediaGeral(atributos)
            }
            best_mezzala_array.push(best_mezzala)
        }

    })
    return best_mezzala_array.sort((a, b) => b.overall - a.overall).slice(0, 5)
}
const Laterais = (player_data_array) => {
    let best_laterais_array = []
    player_data_array.forEach((elem, i) => {
        let best_attr_chaves = 240
        let best_attr_secundarios = 96
        let best_attr_mentais = 40

        const CalcOverall = (chaves, secundarios, mentais) => {
            let best_attr = best_attr_chaves + best_attr_mentais + best_attr_secundarios
            let player_attr = chaves + secundarios + mentais
            let overall = (player_attr * 100) / best_attr

            return overall
        }
        const MediaGeral = (obj) => {
            const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);
            let media_geral = sumValues(obj) / 47
            return media_geral
        }

        const MediaPosicao = (chaves, secundarios, mentais) => {
            let media_chaves = chaves / 12
            let media_secundarios = (secundarios / 0.8) / 9
            let media_mentais = (mentais / 0.5) / 4
            let media_posicao = (media_chaves + media_secundarios + media_mentais) / 3

            return media_posicao
        }

        let nome = elem.nome
        let atributos = elem.atributos
        if (i > 0) {
            attr_chaves = (atributos.primeiro_toque + atributos.finta + atributos.cruzamento + atributos.passe + atributos.tecnica + atributos.decisao + atributos.ind_trabalho + atributos.sem_bola + atributos.trab_equipe + atributos.aceleracao + atributos.resistencia + atributos.velocidade)
            attr_secundarios = (atributos.desarme + atributos.antecipacao + atributos.compostura + atributos.imprevisibilidade + atributos.agilidade + atributos.equilibrio) * 0.8
            attr_mentais = (atributos.antecipacao + atributos.determinacao + atributos.decisao + atributos.apti_fisica) * 0.5
            let best_lateral = {
                nome: nome,
                id: elem.id,
                attr_chaves: attr_chaves,
                attr_secundarios: attr_secundarios,
                attr_mentais: attr_mentais,
                media: MediaPosicao(attr_chaves, attr_secundarios, attr_mentais),
                overall: CalcOverall(attr_chaves, attr_secundarios, attr_mentais),
                media_attr: MediaGeral(atributos)
            }
            best_laterais_array.push(best_lateral)
        }

    })
    return best_laterais_array.sort((a, b) => b.overall - a.overall).slice(0, 50)
}
const Zagueiros = (player_data_array) => {
    let best_zagueiros_array = []
    player_data_array.forEach((elem, i) => {
        let best_attr_chaves = 220
        let best_attr_secundarios = 96
        let best_attr_mentais = 40

        const CalcOverall = (chaves, secundarios, mentais) => {
            let best_attr = best_attr_chaves + best_attr_mentais + best_attr_secundarios
            let player_attr = chaves + secundarios + mentais
            let overall = (player_attr * 100) / best_attr

            return overall
        }
        const MediaGeral = (obj) => {
            const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);
            let media_geral = sumValues(obj) / 47
            return media_geral
        }

        const MediaPosicao = (chaves, secundarios, mentais) => {
            let media_chaves = chaves / 11
            let media_secundarios = (secundarios / 0.8) / 6
            let media_mentais = (mentais / 0.5) / 4
            let media_posicao = (media_chaves + media_secundarios + media_mentais) / 3

            return media_posicao
        }

        let nome = elem.nome
        let atributos = elem.atributos
        if (i > 0) {
            attr_chaves = (atributos.cabeceamento + atributos.desarme + atributos.passe + atributos.agressividade + atributos.bravura + atributos.compostura + atributos.decisao + atributos.posicionamento + atributos.forca + atributos.velocidade)
            attr_secundarios = (atributos.marcacao + atributos.primeiro_toque + atributos.tecnica + atributos.antecipacao + atributos.concentracao + atributos.visao) * 0.8
            attr_mentais = (atributos.antecipacao + atributos.determinacao + atributos.decisao + atributos.apti_fisica) * 0.5
            let best_zagueiro = {
                nome: nome,
                id: elem.id,
                attr_chaves: attr_chaves,
                attr_secundarios: attr_secundarios,
                attr_mentais: attr_mentais,
                media: MediaPosicao(attr_chaves, attr_secundarios, attr_mentais),
                overall: CalcOverall(attr_chaves, attr_secundarios, attr_mentais),
                media_attr: MediaGeral(atributos)
            }
            best_zagueiros_array.push(best_zagueiro)
        }

    })
    return best_zagueiros_array.sort((a, b) => b.overall - a.overall).slice(0, 5)
}
const Goleiros = (player_data_array) => {
    let best_goleiros_array = []
    player_data_array.forEach((elem, i) => {
        let best_attr_chaves = 200
        let best_attr_secundarios = 160
        let best_attr_mentais = 40

        const CalcOverall = (chaves, secundarios, mentais) => {
            let best_attr = best_attr_chaves + best_attr_mentais + best_attr_secundarios
            let player_attr = chaves + secundarios + mentais
            let overall = (player_attr * 100) / best_attr

            return overall
        }
        const MediaGeral = (obj) => {
            const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);
            let media_geral = sumValues(obj) / 47
            return media_geral
        }

        const MediaPosicao = (chaves, secundarios, mentais) => {
            let media_chaves = chaves / 10
            let media_secundarios = (secundarios / 0.8) / 10
            let media_mentais = (mentais / 0.5) / 4
            let media_posicao = (media_chaves + media_secundarios + media_mentais) / 3

            return media_posicao
        }

        let nome = elem.nome
        let atributos = elem.atributos
        if (i > 0) {
            attr_chaves = (atributos.tenden_sair_bali + atributos.comando_area + atributos.pontape + atributos.reflexos + atributos.um_pra_um + atributos.posicionamento + atributos.concentracao + atributos.compostura + atributos.antecipacao + atributos.agilidade)
            attr_secundarios = (atributos.alcance_aereo + atributos.comunicacao + atributos.excentricidade + atributos.jogo_de_mao + atributos.lancamento + atributos.passe + atributos.primeiro_toque + atributos.visao + atributos.aceleracao) * 0.8
            attr_mentais = (atributos.antecipacao + atributos.determinacao + atributos.decisao + atributos.apti_fisica) * 0.5
            let best_goleiro = {
                nome: nome,
                id: elem.id,
                attr_chaves: attr_chaves,
                attr_secundarios: attr_secundarios,
                attr_mentais: attr_mentais,
                media: MediaPosicao(attr_chaves, attr_secundarios, attr_mentais),
                overall: CalcOverall(attr_chaves, attr_secundarios, attr_mentais),
                media_attr: MediaGeral(atributos)
            }
            best_goleiros_array.push(best_goleiro)
        }

    })
    return best_goleiros_array.sort((a, b) => b.overall - a.overall).slice(0, 5)
}

let best_strikers = Striker(avancados)
let best_avancado = AvançadoInterior(medio_ofensivo)
let best_extremo = Extremo(medio_ofensivo)
let best_sombra = AvancadoSombra(medio_ofensivo)
let best_mezzala = Mezzala(meias)
let best_lateral = Laterais(defesas)
let best_zagueiro = Zagueiros(defesas)
let best_goleiro = Goleiros(goleiros)
console.log("Melhoes Atacantes: ",best_strikers)
console.log("Melhores Avançados: ", best_avancado)
console.log("Melhores Extremos: ", best_extremo)
console.log("Melhores Mezzalas: ", best_mezzala)
console.log("Melhores Laterais: ", best_lateral)
console.log("Melhores Zagueiros: ", best_zagueiro)
console.log("Melhores Goleiros: ", best_goleiro)