#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["src/api gateways/Loja.Back.Bff.Compras/Loja.Back.Bff.Compras.csproj", "src/api gateways/Loja.Back.Bff.Compras/"]
RUN dotnet restore "src/api gateways/Loja.Back.Bff.Compras/Loja.Back.Bff.Compras.csproj"
COPY . .
WORKDIR "/src/src/api gateways/Loja.Back.Bff.Compras"
RUN dotnet build "Loja.Back.Bff.Compras.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Loja.Back.Bff.Compras.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Loja.Back.Bff.Compras.dll"]