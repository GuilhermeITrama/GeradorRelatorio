# Gerador de Relatório de Visitas Institucionais

Este projeto é uma aplicação web desenvolvida para registrar e gerar relatórios de visitas institucionais em formato PDF. O sistema permite o registro de locais visitados (sítios funcionais), observações associadas, horários e fotos, organizando essas informações em um relatório bem formatado com cabeçalho e rodapé personalizados.

## 🧩 Funcionalidades

- Registro do nome do visitante.
- Seleção de data e hora de início e fim da visita.
- Inserção de múltiplos **sítios funcionais** visitados.
- Adição de observações para cada local.
- Upload de até 2 fotos por entrada.
- Visualização e remoção das entradas antes da geração do relatório.
- Geração de um relatório em **formato PDF** contendo todas as informações e imagens, com cabeçalho e rodapé personalizados.

## 🛠️ Tecnologias Utilizadas

- **HTML5** – Estrutura da aplicação.
- **CSS3** – Estilização.
- **JavaScript (ES6)** – Funcionalidade interativa.
- **jsPDF** – Geração do arquivo PDF.
- **FileReader API** – Leitura de imagens locais para visualização e inserção no PDF.

## 📁 Estrutura do Projeto

```
📦 relatorio-visita
 ┣ 📄 index.html            # Página principal do sistema
 ┣ 📄 styles.css            # Estilização do layout
 ┣ 📄 script.js             # Lógica de interação e geração do PDF
 ┣ 📄 header.png            # Imagem do cabeçalho (opcional)
 ┣ 📄 footer.png            # Imagem do rodapé (opcional)
```

## 🚀 Como Usar

1. Clone ou baixe este repositório.
2. Coloque os arquivos `header.png` e `footer.png` (se desejar) na mesma pasta do projeto.
3. Abra o arquivo `index.html` no seu navegador.
4. Preencha os campos obrigatórios:
   - Visitado por
   - Data e hora de início e fim da visita
   - Informações sobre os sítios funcionais e observações
   - Selecione até 2 fotos por entrada
5. Clique em **"Adicionar Sítio Funcional"** para cada local visitado.
6. Após adicionar todas as entradas, clique em **"Gerar PDF"** para baixar o relatório.

## 📌 Requisitos

- Navegador moderno (Chrome, Firefox, Edge, etc.)
- Conexão com a internet (para carregar a biblioteca `jsPDF` via CDN)

## ⚠️ Observações

- O sistema não armazena dados no servidor — todo o processamento é feito localmente no navegador.
- As imagens utilizadas no cabeçalho e rodapé devem ter dimensões adequadas para uma boa visualização no PDF.

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usar, modificar e distribuir.

---

Desenvolvido com 💻 por Guilherme Trama
