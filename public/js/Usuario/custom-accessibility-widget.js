// Versão universal do widget de acessibilidade
// Funciona para todos os elementos da página, incluindo mensagens de validação
(function() {
  // Variáveis para controlar estados
  var fontState = 'normal'; // 'normal', 'increased', 'decreased'
  var highContrastEnabled = false;
  var linksHighlighted = false;
  
  // Função para criar o botão de acessibilidade
  function createAccessibilityButton() {
    // Verifica se o botão já existe para evitar duplicação
    if (document.querySelector('.custom-accessibility-button')) {
      return;
    }
    
    // Cria o botão de acessibilidade
    var button = document.createElement('button');
    button.className = 'custom-accessibility-button';
    button.setAttribute('aria-label', 'Abrir menu de acessibilidade');
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.left = '20px';
    button.style.zIndex = '9999';
    button.style.width = '50px';
    button.style.height = '50px';
    button.style.borderRadius = '50%';
    button.style.backgroundColor = '#0066FF';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    button.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    button.style.transition = 'all 0.3s ease';
    
    // Ícone de acessibilidade
    button.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-10h2v5h-2zm0-5h2v2h-2z"/></svg>';
    
    // Efeito hover
    button.onmouseover = function() {
      this.style.backgroundColor = '#0052CC';
      this.style.transform = 'scale(1.1)';
    };
    
    button.onmouseout = function() {
      this.style.backgroundColor = '#0066FF';
      this.style.transform = 'scale(1)';
    };
    
    // Adiciona o botão ao corpo da página
    document.body.appendChild(button);
    
    // Cria o menu de acessibilidade
    var menu = document.createElement('div');
    menu.className = 'custom-accessibility-menu';
    menu.style.position = 'fixed';
    menu.style.bottom = '80px';
    menu.style.left = '20px';
    menu.style.zIndex = '9998';
    menu.style.backgroundColor = 'white';
    menu.style.borderRadius = '8px';
    menu.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    menu.style.padding = '15px';
    menu.style.width = '250px';
    menu.style.display = 'none';
    menu.style.flexDirection = 'column';
    menu.style.gap = '10px';
    
    // Título do menu
    var title = document.createElement('h3');
    title.textContent = 'Opções de Acessibilidade';
    title.style.margin = '0 0 10px 0';
    title.style.fontSize = '16px';
    title.style.fontWeight = 'bold';
    title.style.color = '#333';
    menu.appendChild(title);
    
    // Adiciona opções de acessibilidade
    var increaseFontButton = addAccessibilityOption(menu, 'Aumentar Fonte', function() {
      if (fontState === 'increased') {
        // Já está aumentado, volta ao normal
        applyFontSize(1);
        increaseFontButton.textContent = 'Aumentar Fonte';
        decreaseFontButton.textContent = 'Diminuir Fonte';
        fontState = 'normal';
      } else {
        // Aumenta a fonte
        applyFontSize(1.1);
        increaseFontButton.textContent = 'Tamanho Normal';
        decreaseFontButton.textContent = 'Diminuir Fonte';
        fontState = 'increased';
      }
    });
    
    var decreaseFontButton = addAccessibilityOption(menu, 'Diminuir Fonte', function() {
      if (fontState === 'decreased') {
        // Já está diminuído, volta ao normal
        applyFontSize(1);
        decreaseFontButton.textContent = 'Diminuir Fonte';
        increaseFontButton.textContent = 'Aumentar Fonte';
        fontState = 'normal';
      } else {
        // Diminui a fonte
        applyFontSize(0.85);
        decreaseFontButton.textContent = 'Tamanho Normal';
        increaseFontButton.textContent = 'Aumentar Fonte';
        fontState = 'decreased';
      }
    });
    
    var contrastButton = addAccessibilityOption(menu, 'Alto Contraste', function() {
      if (highContrastEnabled) {
        // Desativar alto contraste
        document.body.classList.remove('high-contrast');
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
        
        // Restaurar links e botões
        var links = document.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
          links[i].style.color = '';
        }
        
        var buttons = document.querySelectorAll('button:not(.custom-accessibility-button)');
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.backgroundColor = '';
          buttons[i].style.color = '';
          buttons[i].style.border = '';
        }
        
        // Restaurar elementos com classes específicas
        var elements = document.querySelectorAll('*');
        for (var i = 0; i < elements.length; i++) {
          elements[i].style.backgroundColor = '';
          elements[i].style.color = '';
        }
        
        contrastButton.textContent = 'Alto Contraste';
        highContrastEnabled = false;
      } else {
        // Ativar alto contraste
        document.body.classList.add('high-contrast');
        document.body.style.backgroundColor = '#000';
        document.body.style.color = '#fff';
        
        // Ajusta links e botões para alto contraste
        var links = document.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
          links[i].style.color = '#ffff00';
        }
        
        var buttons = document.querySelectorAll('button:not(.custom-accessibility-button)');
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].style.backgroundColor = '#333';
          buttons[i].style.color = '#fff';
          buttons[i].style.border = '1px solid #fff';
        }
        
        // Ajustar elementos com classes específicas
        var headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, label');
        for (var i = 0; i < headings.length; i++) {
          headings[i].style.color = '#fff';
        }
        
        var containers = document.querySelectorAll('div, section, header, footer, main, aside, nav');
        for (var i = 0; i < containers.length; i++) {
          if (getComputedStyle(containers[i]).backgroundColor !== 'rgba(0, 0, 0, 0)') {
            containers[i].style.backgroundColor = '#000';
          }
        }
        
        contrastButton.textContent = 'Contraste Normal';
        highContrastEnabled = true;
      }
    });
    
    var linksButton = addAccessibilityOption(menu, 'Destacar Links', function() {
      var links = document.querySelectorAll('a');
      
      if (linksHighlighted) {
        // Remover destaque
        for (var i = 0; i < links.length; i++) {
          links[i].style.outline = '';
          links[i].style.textDecoration = '';
          links[i].style.backgroundColor = '';
        }
        linksButton.textContent = 'Destacar Links';
        linksHighlighted = false;
      } else {
        // Adicionar destaque
        for (var i = 0; i < links.length; i++) {
          links[i].style.outline = '2px solid blue';
          links[i].style.textDecoration = 'underline';
          links[i].style.backgroundColor = 'rgba(0, 0, 255, 0.1)';
        }
        linksButton.textContent = 'Remover Destaque';
        linksHighlighted = true;
      }
    });
    
    // Adiciona o menu ao corpo da página
    document.body.appendChild(menu);
    
    // Adiciona evento de clique ao botão
    button.addEventListener('click', function() {
      if (menu.style.display === 'none') {
        menu.style.display = 'flex';
      } else {
        menu.style.display = 'none';
      }
    });
    
    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', function(event) {
      if (!menu.contains(event.target) && event.target !== button) {
        menu.style.display = 'none';
      }
    });
    
    console.log('Widget de acessibilidade personalizado criado com sucesso');
  }
  
  // Função para adicionar opções ao menu
  function addAccessibilityOption(menu, text, callback) {
    var option = document.createElement('button');
    option.textContent = text;
    option.style.padding = '8px 12px';
    option.style.backgroundColor = '#f0f0f0';
    option.style.border = 'none';
    option.style.borderRadius = '4px';
    option.style.cursor = 'pointer';
    option.style.fontSize = '14px';
    option.style.textAlign = 'left';
    option.style.transition = 'background-color 0.2s';
    
    option.onmouseover = function() {
      this.style.backgroundColor = '#e0e0e0';
    };
    
    option.onmouseout = function() {
      this.style.backgroundColor = '#f0f0f0';
    };
    
    option.addEventListener('click', callback);
    menu.appendChild(option);
    
    return option; // Retorna o botão para poder atualizar seu texto
  }
  
  // Função para aplicar tamanho de fonte a todos os elementos
  function applyFontSize(scale) {
    // Cria ou atualiza a folha de estilo
    var styleId = 'accessibility-font-style';
    var styleElement = document.getElementById(styleId);
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    // Define regras CSS para diferentes tipos de elementos
    styleElement.textContent = `
      /* Elementos de texto básicos */
      body, p, span, div, li, td, th, input, textarea, select, option, button {
        font-size: ${scale}em !important;
      }
      
      /* Cabeçalhos */
      h1 { font-size: ${scale * 2}em !important; }
      h2 { font-size: ${scale * 1.75}em !important; }
      h3 { font-size: ${scale * 1.5}em !important; }
      h4 { font-size: ${scale * 1.25}em !important; }
      h5 { font-size: ${scale * 1.1}em !important; }
      h6 { font-size: ${scale}em !important; }
      
      /* Links */
      a { font-size: ${scale}em !important; }
      
      /* Elementos de formulário */
      label { font-size: ${scale}em !important; }
      
      /* Mensagens de validação */
      .input-mensagem-erro { font-size: ${scale * 0.875}em !important; }
      
      /* Classes específicas do projeto */
      .login__titulo { font-size: ${scale * 1.5}em !important; }
      .login__texto { font-size: ${scale}em !important; }
      .login__label { font-size: ${scale}em !important; }
      .login__input { font-size: ${scale}em !important; }
      .login__botao { font-size: ${scale}em !important; }
      
      /* Elementos dinâmicos que podem ser adicionados após o carregamento */
      [data-error], [data-success], .error, .success, .warning, .info {
        font-size: ${scale}em !important;
      }
    `;
    
    // Adiciona um observador para monitorar elementos adicionados dinamicamente
    setupMutationObserver();
  }
  
  // Configura um observador para monitorar mudanças no DOM
  function setupMutationObserver() {
    // Verifica se o observador já existe
    if (window._accessibilityObserver) {
      return;
    }
    
    // Cria um novo observador
    window._accessibilityObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        // Verifica se foram adicionados novos nós
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          // Processa cada nó adicionado
          for (var i = 0; i < mutation.addedNodes.length; i++) {
            var node = mutation.addedNodes[i];
            // Verifica se é um elemento DOM
            if (node.nodeType === 1) {
              // Verifica se é uma mensagem de erro
              if (node.classList && (
                  node.classList.contains('input-mensagem-erro') || 
                  node.classList.contains('error') ||
                  node.hasAttribute('data-error')
              )) {
                // Aplica o estilo atual
                if (fontState === 'increased') {
                  node.style.fontSize = '1.5em';
                } else if (fontState === 'decreased') {
                  node.style.fontSize = '0.75em';
                }
              }
            }
          }
        }
      });
    });
    
    // Inicia a observação
    window._accessibilityObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Cria o widget quando o DOM estiver completamente carregado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createAccessibilityButton);
  } else {
    createAccessibilityButton();
  }
})();
