# Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copiar o csproj e restaurar dependências
COPY AurumApi.csproj ./
RUN dotnet restore

# Copiar o restante do código e compilar
COPY . ./
RUN dotnet publish -c Release -o out

# Etapa de runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Expõe a porta padrão
EXPOSE 80

ENTRYPOINT ["dotnet", "AurumApi.dll"]