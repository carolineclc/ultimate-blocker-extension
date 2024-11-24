# Ultimate Blocker Extension
Plugin para Navegador Web Firefox para Bloqueio de Rastreadores.

## Funcionalidades Principais
- **Identificação de Rastreadores**: 
  - Utiliza listas conhecidas de domínios de rastreamento (ex.: EasyList) e compara com os hosts das requisições.
  
- **Bloqueio de Conteúdo**: 
  - Intercepta requisições para domínios de rastreamento e cancela o envio.

- **Personalização de Listas**: 
  - Permite que o usuário crie e adicione listas personalizadas de domínios a serem bloqueados através de URLs ou manualmente.

- **Interface Simples e Intuitiva**:
  - Interface amigável para gerenciar listas de rastreadores, adicionar URLs personalizadas e visualizar domínios bloqueados.

- **Gerenciamento de Listas Ativas**:
  - O usuário pode ativar/desativar listas de rastreamento diretamente na interface.

## Como Adicionar uma Lista Personalizada por URL
Você pode adicionar uma lista personalizada de rastreadores hospedada online. Siga os passos abaixo:

1. **Crie sua lista personalizada**:
   - Formato da lista: um domínio por linha (sem `https://` ou outros prefixos).  
     Exemplo:
     ```
     tracker1.example.com
     ads.google.com
     analytics.custom.net
     outro-tracker.org
     ```

2. **Hospede a lista online**:
   - Use serviços como:
     - [GitHub](https://github.com) (recomendado).
     - [Pastebin](https://pastebin.com).
     - [Google Drive](https://drive.google.com) (configurar como público).

3. **Adicione a lista ao plugin**:
   - Abra o popup do plugin no navegador.
   - No campo **"Enter list URL"**, insira o link direto do arquivo hospedado.  
     Exemplo de URL:  
     ```
     https://raw.githubusercontent.com/username/repository/main/my-custom-list.txt
     ```
   - Clique no botão **"Add List"**.
   - Sua lista será carregada, ativada e começará a bloquear os domínios listados.

4. **Exemplo de Lista AdGuard**:
   - Você pode adicionar diretamente a lista de rastreamento do AdGuard:  
     ```
     https://adguardteam.github.io/AdGuardSDNSFilter/Filters/filter.txt
     ```
## Como Gerenciar as Listas
- **Ativar/Desativar**:
  - No popup, você pode ativar/desativar qualquer lista adicionada (incluindo a EasyList).
  - Isso permite um controle personalizado sobre quais listas devem ser usadas no bloqueio.

- **Remover Listas Personalizadas**:
  - No popup, você pode remover listas adicionadas manualmente clicando no botão **"Remove"** ao lado da lista.

