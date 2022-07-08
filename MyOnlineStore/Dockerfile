#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["MyOnlineStore/MyOnlineStore.csproj", "MyOnlineStore/"]
COPY ["auth/auth.csproj", "auth/"]
COPY ["mailer/mailer.csproj", "mailer/"]
COPY ["Common/Common.csproj", "Common/"]
COPY ["logger/logger.csproj", "logger/"]
RUN dotnet restore "MyOnlineStore/MyOnlineStore.csproj"
COPY . .
WORKDIR "/src/MyOnlineStore"
RUN dotnet build "MyOnlineStore.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MyOnlineStore.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MyOnlineStore.dll"]
