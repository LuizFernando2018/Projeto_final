async function carregarAnimais() {
    try {
        const response = await fetch('http://localhost:3000/animais');
        if (!response.ok) {
            throw new Error('Erro ao buscar animais');
        }
        const animais = await response.json();
        const galeria = document.querySelector('.animais__lista');
        if (!galeria) {
            console.error('Elemento .animais__lista não encontrado no HTML');
            return;
        }
        galeria.innerHTML = ''; // Limpa a galeria estática

        animais.forEach(animal => {
            const card = `
                <div class="lista__item">
                    <div class="lista__item--container">        
                        <div class="item__texto">
                        <article class="animal" style="flex: 1 1 calc(33.33% - 40px); box-sizing: border-box; max-width: 350px; border-radius: 10px; margin-bottom: -25px; box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.25);">
                            <img src="${animal.imagem_url || './assets/img/Bar.png'}" alt="Foto de ${animal.nome || 'um animal'}" class="animal__imagem">
                            <div class="animal__descricao">
                                <h2 class="animal__nome">${animal.nome}</h2>
                                <p class="animal__descricao--texto">${animal.idade}</p>
                                <p class="animal__descricao--texto">${animal.descricao}</p>
                                <p class="animal__local">${animal.localizacao || 'Localização não informada'}</p> <!-- Changed this line -->
                                <div class="animal__mensagem">
                                    <p class="animal__mensagem--texto">
                                        <button class="botao--falar-responsavel" data-animal-id="${animal.id}" style="background: rgba(0, 0, 0, 0); color:rgb(51, 51, 51); border: none; cursor: pointer;">Falar com responsável</button>
                                    </p>
                                </div>
                            </div>
                        </article>
                        </div>
                    </div>
                </div>
            `;/*
            const card = `
                <li class="lista__item">
                    <div class="lista__item--container">
                        
                        <div class="item__texto">
                            <h3 class="item__titulo">${animal.nome}</h3>
                            <p class="item__idade">${animal.idade}</p>
                            <p class="item__caracteristica">${animal.descricao}</p>
                            <p class="item__localizacao">RJ</p>
                            <button class="botao--falar-responsavel" data-animal-id="${animal.id}">Falar com responsável</button>
                        </div>
                    </div>
                </li>
            `;
            */galeria.innerHTML += card;
        });

        // Adicionar evento aos botões "Falar com responsável"
        document.querySelectorAll('.botao--falar-responsavel').forEach(botao => {
            botao.addEventListener('click', (e) => {
                const animalId = e.target.getAttribute('data-animal-id');
                window.location.href = `mensagem.html?animal_id=${animalId}`;
            });
        });
    } catch (erro) {
        console.error('Erro ao carregar animais:', erro);
    }
}

document.addEventListener('DOMContentLoaded', carregarAnimais);

$('#acessibilidade').load('../acessibilidade.html');