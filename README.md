# Taxa Legal

Este projeto realiza o cálculo da **Taxa Legal** de juros sobre um valor nominal, considerando um período de inadimplência definido por uma **data inicial** e uma **data final**. A metodologia utilizada pode ser tanto a **Metodologia Padrão** quanto a utilização da API do **Banco Central do Brasil (BCB)** ambas terão o mesmo resultado.

O sistema foi desenvolvido para ser facilmente integrado a outros projetos, incluindo APIs. Para utilizá-lo, basta copiar a pasta services para seu projeto e criar um endpoint em sua API que utilize o serviço de cálculo da Taxa Legal. Isso permite que você aplique o cálculo de juros de forma rápida e eficiente em seu próprio ambiente.

![print npm start](./docs/npm-start.gif)

## Sumário

- [Instalação](#instalação)
- [Como usar](#como-usar)
- [Metodologia do cálculo](#metodologia-do-cálculo)
- [Disclaimer sobre a Metodologia](#disclaimer-sobre-a-metodologia)
- [Licença](#licença)

## Instalação

Clone este repositório em sua máquina local:

```bash
git clone git@github.com:guilhermelim/taxa-legal.git
cd taxa-legal
```

Instale as dependências:

```bash
npm install
```

## Como usar

Este projeto utiliza a versão do Node.js definida no arquivo `.nvmrc`. Você pode instalar a versão correta do Node.js usando o NVM (Node Version Manager):

```bash
nvm use
```

Para rodar o projeto no ambiente de produção:

```bash
npm start
```

Ou, para rodar o projeto no ambiente de desenvolvimento com `nodemon`:

```bash
npm run dev
```

 Exemplo de Código usando o serviço

```ts
import calculateTaxaLegal from "./services/taxa-legal";
import { TaxaLegalEntry } from "./services/taxa-legal/common/taxa-legal-table";

// Exemplo de tabela de Taxa Legal para ser utilizada caso o usuário não forneça uma tabela personalizada
const defaultTaxaLegalTable: TaxaLegalEntry[] = [
  { year: 2024, month: 8, value: 0.605306 },
  { year: 2024, month: 9, value: 0.676227 },
  { year: 2024, month: 10, value: 0.704241 },
  { year: 2024, month: 11, value: 0.385874 },
];

(async () => {
  const startDate = new Date(2024, 7, 30);
  const endDate = new Date(2024, 8, 10);
  const amount = 1000.0;
  try {
    console.log("Iniciando o cálculo da Taxa Legal...");
    
    // Cálculo usando a API do Banco Central
    const resultBCB = await calculateTaxaLegal(
      startDate,
      endDate,
      amount,
      [],
      true
    );
    console.log("\nResultado usando API Banco Central (BCB):", resultBCB);

    // Cálculo usando a Metodologia Padrão (com a tabela fornecida ou a padrão)
    const resultPadrao = await calculateTaxaLegal(
      startDate,
      endDate,
      amount,
      defaultTaxaLegalTable,
      false
    );
    console.log("\nResultado usando a Metodologia Padrão:", resultPadrao);
  } catch (error) {
    console.error("Erro ao calcular a Taxa Legal:", error);
  }
})();
```

## Metodologia do cálculo

A metodologia de cálculo utilizada para o cálculo da Taxa Legal, explicando como ela é aplicada em diferentes períodos e com diferentes tabelas de taxas legais, pode ser encontrada no arquivo [metodologia.md](./docs/metodologia.md).

## Disclaimer sobre a Metodologia

A apuração dos dias de inadimplência segue uma lógica nada convencional. O **dia de vencimento** é considerado como inadimplente, e o **último dia** do período de inadimplência (data de atualização) não tem aplicação de juros. Essa abordagem não é a convencional, pois o cálculo correto envolveria a aplicação de juros até o último dia do período. No entanto, essa é a metodologia adotada pela [**calculadora do Banco Central do Brasil**](https://www3.bcb.gov.br/CALCIDADAO/publico/exibirFormCorrecaoValores.do?method=exibirFormCorrecaoValores&aba=6).

Vale destacar que, embora essa abordagem seja a utilizada pelo Banco Central, ela não significa que seja a mais adequada ou a mais precisa. Inclusive, o próprio Banco Central afirma que o cálculo da Taxa Legal deve ser considerado apenas como **referência** para situações reais, e não como o valor oficial cobrado pelas instituições credoras ([Fonte](https://www.bcb.gov.br/detalhenoticia/20356/noticia)).

É importante notar também que outras instituições financeiras podem adotar metodologias diferentes, que podem resultar em valores mais altos. O objetivo deste projeto é fornecer **apenas** a metodologia utilizada pela calculadora do Banco Central, com o intuito de garantir a transparência e a simplicidade no cálculo da Taxa Legal, sem afirmar que esta seja a metodologia mais vantajosa para todas as situações.

## Contato

Se você está interessado em discutir sobre metodologias mais lucrativas na aplicação de juros, ou se deseja colaborar em melhorias para o cálculo, entre em contato comigo pelo [LinkedIn](https://www.linkedin.com/in/guilherme-lim/).

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
