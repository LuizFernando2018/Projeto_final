export function validaCampo(input) {
    console.log(`Validando campo: ${input.id}`);
    const mainContainer = input.closest('.input-container'); // Get the main container

    if (!mainContainer) {
        console.error(`Erro: Elemento .input-container não encontrado para o input ${input.id}`);
        return 'Erro interno de validação: .input-container não encontrado.';
    }

    const erroSpan = mainContainer.querySelector('.input-mensagem-erro'); // Find erroSpan within mainContainer

    if (!erroSpan) {
        console.error(`Erro: Elemento .input-mensagem-erro não encontrado dentro de .input-container para o input ${input.id}`);
        // Not returning here, as the primary validation logic can still proceed for class manipulation on mainContainer
    }

    if (input.validity.valid) {
        mainContainer.classList.remove('input-container--invalido');
        mainContainer.classList.add('input-container--valido');
        if (erroSpan) erroSpan.textContent = ''; // Check if erroSpan was found
        return null;
    } else {
        mainContainer.classList.remove('input-container--valido');
        mainContainer.classList.add('input-container--invalido');
        const erro = getMensagemErro(input);
        if (erroSpan) erroSpan.textContent = erro; // Check if erroSpan was found
        else console.error(`erroSpan not found for input ${input.id} within its .input-container`);
        return erro;
    }
}

function getMensagemErro(input) {
    const tipoInput = input.getAttribute('data-type') || input.type;

    if (input.validity.valueMissing) {
        return {
            email: 'O email é obrigatório.',
            senha: 'A senha é obrigatória.',
            text: 'Este campo é obrigatório.'
        }[tipoInput] || 'Este campo é obrigatório.';
    }

    if (input.validity.typeMismatch && tipoInput === 'email') {
        return 'O email deve seguir o formato exemplo@dominio.com.';
    }

    if (input.validity.patternMismatch) {
        if (tipoInput === 'email') {
            return 'O email deve conter @ e um domínio válido (ex.: exemplo@dominio.com).';
        } else if (tipoInput === 'senha') {
            if (input.value.length < 8) return 'A senha deve ter no mínimo 8 dígitos.';
            if (input.value.length > 12) return 'A senha deve ter no máximo 12 dígitos.';
            if (!/[A-Z]/.test(input.value)) return 'A senha deve conter pelo menos 1 letra maiúscula.';
            if (!/[0-9]/.test(input.value)) return 'A senha deve conter pelo menos 1 número.';
            if (!/[!@#$%^&*]/.test(input.value)) return 'A senha deve conter pelo menos 1 caractere especial (ex.: !@#$%).';
        }
    }

    if (input.validity.tooShort && tipoInput === 'senha') {
        return 'A senha deve ter no mínimo 8 caracteres.';
    }

    if (tipoInput === 'nome') {
        return 'O nome deve ter entre 2 e 100 caracteres.';
    }

    return 'Por favor, verifique os dados inseridos.';
}

export function validaConfirmaSenha(senhaInput, confirmaSenhaInput) {
    const mainContainer = confirmaSenhaInput.closest('.input-container'); // Get the main container

    if (!mainContainer) {
        console.error(`Erro: Elemento .input-container não encontrado para o input confirmaSenha`);
        return 'Erro interno de validação: .input-container não encontrado.';
    }

    const erroSpan = mainContainer.querySelector('.input-mensagem-erro'); // Find erroSpan within mainContainer

    if (!erroSpan) {
        console.error(`Erro: Elemento .input-mensagem-erro não encontrado dentro de .input-container para o input confirmaSenha`);
        // Not returning, allow class manipulation on mainContainer
    }

    if (senhaInput.value === confirmaSenhaInput.value) {
        mainContainer.classList.remove('input-container--invalido');
        mainContainer.classList.add('input-container--valido');
        if (erroSpan) erroSpan.textContent = ''; // Check if erroSpan was found
        return null;
    } else {
        mainContainer.classList.remove('input-container--valido');
        mainContainer.classList.add('input-container--invalido');
        const erro = 'As senhas não coincidem. Tente novamente.';
        if (erroSpan) erroSpan.textContent = erro; // Check if erroSpan was found
        else console.error(`erroSpan not found for input confirmaSenha within its .input-container`);
        return erro;
    }
}