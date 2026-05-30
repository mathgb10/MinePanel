# mc-servers

Esta pasta é utilizada pelo painel para armazenar os arquivos dos servidores Minecraft gerenciados pela aplicação.

Cada servidor deve possuir sua própria pasta contendo seus arquivos, configurações, mundos e mods.

## Estrutura esperada

```text
mc-servers/
├── cobbleverse/
│   ├── config/
│   ├── datapacks/
│   ├── mods/
│   └── server.jar
│
└── vanilla/
    └── server.jar
```

## Observações

- O painel identifica automaticamente os servidores através das pastas presentes neste diretório.
- Após a primeira execução do servidor, novos arquivos e diretórios serão criados automaticamente pelo Minecraft.
- O painel deve ser capaz de lidar com esses arquivos adicionais sem depender de uma estrutura rígida.