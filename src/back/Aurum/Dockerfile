# Etapa 1: Usando a imagem base do .NET SDK para construção
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo .csproj e restaura as dependências
COPY src/back/Aurum/Aurum_config.csproj ./  # Caminho correto para o arquivo .csproj
RUN dotnet restore  # Restaura as dependências do projeto

# Copia todos os arquivos do projeto para dentro do contêiner
COPY src/back/Aurum/. ./  # Caminho correto para copiar o restante dos arquivos

# Publica o aplicativo no modo Release
RUN dotnet publish -c Release -o out  # Compila e publica a aplicação

# Etapa 2: Usando a imagem base do ASP.NET (runtime)
FROM mcr.microsoft.com/dotnet/aspnet:6.0

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos publicados da etapa anterior
COPY --from=build /app/out .

# Expõe a porta 80 (padrão para APIs ASP.NET)
EXPOSE 80

# Comando para iniciar a aplicação no contêiner
ENTRYPOINT ["dotnet", "Aurum.dll"]  # Certifique-se de que "Aurum.dll" é o nome correto
