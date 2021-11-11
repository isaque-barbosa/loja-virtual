#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["src/services/Loja.Back.Pedido.Api/Loja.Back.Pedido.Api.csproj", "src/services/Loja.Back.Pedido.Api/"]
RUN dotnet restore "src/services/Loja.Back.Pedido.Api/Loja.Back.Pedido.Api.csproj"
COPY . .
WORKDIR "/src/src/services/Loja.Back.Pedido.Api"
RUN dotnet build "Loja.Back.Pedido.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Loja.Back.Pedido.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Loja.Back.Pedido.Api.dll"]