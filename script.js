const { jsPDF } = window.jspdf;
let entries = []; // Variável global para armazenar o valor de "Environment, observation e images "
let visited = ''; // Variável global para armazenar o valor de "Visited"

// Função para adicionar uma entrada
function addEntry() {
    const environment = document.getElementById('environment').value; // Captura o valor do campo "environment"
    const observation = document.getElementById('observation').value; // Captura o valor do campo "observation"
    const files = document.getElementById('photoInput').files; // Captura os arquivos de imagem selecionados

    if (!environment) {
        alert("Por favor, adicione um Sítio Funcional.");
        return; // Não permite adicionar a entrada
    }

    // Verificar se pelo menos uma foto foi selecionada
    if (files.length === 0) {
        alert("Por favor, adicione pelo menos uma foto.");
        return;
    }

    // Verificar se foi no máximo 2 fotos selecionadas
    if (files.length > 2) {
        alert("Selecione no máximo 2 fotos.");
        return;
    }
    

    const images = []; // Array para armazenar as imagens
    Array.from(files).forEach(file => { 
        const reader = new FileReader(); // Instancia o leitor de arquivos
        reader.onload = (e) => {
            images.push(e.target.result); // Adiciona a imagem convertida para base64 ao array
        };
        reader.readAsDataURL(file); // Lê a imagem como base64
    });

    setTimeout(() => {
        const entry = { environment, observation, images }; // Cria uma entrada com as informações
        entries.push(entry); // Adiciona a entrada no array global 'entries'
        renderEntries(); // Atualiza a renderização das entradas na tela

        // Limpar o campo de observação e o input de arquivos
        document.getElementById('environment').value = '';
        document.getElementById('observation').value = '';
        document.getElementById('photoInput').value = '';
    }, 500); // Tempo de espera para garantir que as imagens sejam carregadas
}

// Função para renderizar as entradas na tela
function renderEntries() {
    const entriesDiv = document.getElementById('entries'); // Obtém o contêiner onde as entradas serão renderizadas
    entriesDiv.innerHTML = ''; // Limpa o conteúdo do contêiner
    entries.forEach((entry, index) => {
        const div = document.createElement('div'); // Cria uma nova div para cada entrada
        div.className = 'entry'; // Define a classe CSS para a entrada
        div.innerHTML = `
            <button class="delete-btn" onclick="deleteEntry(${index})">X</button>
            <h3>Sítio Funcional: ${entry.environment}</h3>
            <p>Observação: ${entry.observation}</p>
            <div class="image-preview">
                ${entry.images.map(img => `<img src="${img}" alt="Foto">`).join('')}
            </div>
        `;
        entriesDiv.appendChild(div); // Adiciona a nova entrada ao contêiner
    });
}

// Função para deletar uma entrada
function deleteEntry(index) {
    entries.splice(index, 1); // Remove a entrada selecionada do array
    renderEntries(); // Re-renderiza as entradas após a exclusão
}

// Função para gerar o PDF
function generatePDF() {
    const startTime = document.getElementById('startTime').value; // Captura o valor do horário de início
    const endTime = document.getElementById('endTime').value; // Captura o valor do horário de fim
    visited = document.getElementById('visited').value; // Capturar valor do "Visitado por"

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!startTime || !endTime || entries.length === 0 || !visited) {
        alert("Preencha todas as informações antes de gerar o PDF.");
        return;
    }

    // Função para formatar a data e hora para o formato "DD/MM/YYYY HH:mm"
    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
        const yyyy = date.getFullYear();
        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
    };

    const pdf = new jsPDF(); // Cria uma nova instância do jsPDF

    const formattedStartTime = formatDateTime(startTime); // Formata o horário de início
    const formattedEndTime = formatDateTime(endTime); // Formata o horário de fim

    const headerImage = new Image(); // Cria uma imagem para o cabeçalho
    headerImage.src = 'header.png'; // Define a fonte do cabeçalho

    const footerImage = new Image(); // Cria uma imagem para o rodapé
    footerImage.src = 'footer.png'; // Define a fonte do rodapé

    headerImage.onload = () => {
        footerImage.onload = () => {
            const renderHeaderAndFooter = (pdf, isFirstPage) => {
                const canvasHeader = document.createElement('canvas');
                const ctxHeader = canvasHeader.getContext('2d');
                canvasHeader.width = headerImage.width;
                canvasHeader.height = headerImage.height;
                ctxHeader.drawImage(headerImage, 0, 0);
                const base64HeaderImage = canvasHeader.toDataURL('image/png');
                pdf.addImage(base64HeaderImage, 'PNG', 10, 1, 190, 40);
    
                if (isFirstPage) {
                    // Ajuste no espaçamento para o cabeçalho
                    let y = 37; // Posição inicial após o cabeçalho
                    pdf.setFontSize(12);
                    pdf.text("Relatório de Visitas Institucionais", 105, y, { align: 'center' });
                    y += 8; // Espaço menor entre o título e as linhas seguintes
                    pdf.setFontSize(10);
                    pdf.text(`Visitado por: ${visited}`, 105, y, { align: 'center' });
                    y += 6; // Espaço menor
                    pdf.text(`Data e Hora do Início: ${formattedStartTime}`, 105, y, { align: 'center' });
                    y += 6; // Espaço menor
                    pdf.text(`Data e Hora do Fim: ${formattedEndTime}`, 105, y, { align: 'center' });
                }
    
                // Renderizar o rodapé
                const canvasFooter = document.createElement('canvas');
                const ctxFooter = canvasFooter.getContext('2d');
                canvasFooter.width = footerImage.width;
                canvasFooter.height = footerImage.height;
                ctxFooter.drawImage(footerImage, 0, 0);
                const base64FooterImage = canvasFooter.toDataURL('image/png');
                pdf.addImage(base64FooterImage, 'PNG', 10, 280, 220, 12);
            };
    
            let y = 65; // Define a posição inicial do corpo do PDF
    
            renderHeaderAndFooter(pdf, true);
    
            entries.forEach((entry) => {
                const textHeight = 8 + 8; // Altura ajustada para título e observação
                const imageHeight = 70;
                const totalHeight = textHeight + imageHeight + 5;
    
                if (y + totalHeight > 250) {
                    pdf.addPage();
                    renderHeaderAndFooter(pdf, false);
                    y = 50;
                }
    
                pdf.setFontSize(12);
                pdf.text(`Sítio Funcional: ${entry.environment}`, 105, y, { align: 'center' });
                y += 6; // Espaço menor entre o título e o texto
                pdf.setFontSize(10);
                pdf.text(`Observação: ${entry.observation}`, 105, y, { align: 'center' });
                y += 8;
    
                const imageWidth = 80;
                const pageWidth = pdf.internal.pageSize.getWidth();
                const totalImagesWidth = entry.images.length * imageWidth + (entry.images.length - 1) * 10;
                let startX = (pageWidth - totalImagesWidth) / 2;
    
                entry.images.forEach(img => {
                    if (y + imageHeight > 250) {
                        pdf.addPage();
                        renderHeaderAndFooter(pdf, false);
                        y = 50;
                    }
                    pdf.addImage(img, 'JPEG', startX, y, imageWidth, imageHeight);
                    startX += imageWidth + 10;
                });
    
                y += imageHeight + 10; // Menor espaçamento após as imagens
            });

            pdf.save("relatorio_visitas.pdf"); // Gera o arquivo PDF com o nome especificado
        };
    };
}

