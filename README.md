# CRUD-Angular-NET-Core-Entity-Framework-Core-SqlServer
Aplicación web full-stack que implementa operaciones CRUD sobre entidades de negocio. El frontend en Angular consume una API REST construida con .NET Core, la persistencia se gestiona con Entity Framework Core y SQL Server, aplicando buenas prácticas de arquitectura (capas, DTOs) y manejo de datos tipado y seguro.

```markdown
# CRUD Angular + .NET Core + Entity Framework Core + SQL Server

Proyecto full-stack con **API .NET** (EF Core + SQL Server) y **Frontend Angular**.

## Estructura
```

/FBTarjeta             # Backend (.NET API)
/FETarjetaCredito      # Frontend (Angular)
/README.md

````

## Tecnologías
- .NET 8 (Web API) + Entity Framework Core
- SQL Server (LocalDB o instancia)
- Angular 16+ (Angular CLI)
- Node.js + npm

## Prerrequisitos
- [.NET SDK 8.x](https://dotnet.microsoft.com/)
- [Node.js LTS](https://nodejs.org/) (incluye npm)
- [Angular CLI](https://angular.io/): `npm i -g @angular/cli`
- SQL Server / LocalDB (o Docker con SQL Server)

## Configuración rápida

### 1) Backend (.NET)
Desde la carpeta `/FBTarjeta`:

1. **Configuración**
   Crea `appsettings.Development.json` (si no existe) y ajusta la cadena de conexión:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=TarjetasDb;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=true"
     },
     "Logging": { "LogLevel": { "Default": "Information", "Microsoft.AspNetCore": "Warning" } }
   }
````

En `Program.cs` usa `UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))`.

2. **Migraciones y base de datos**

   ```bash
   dotnet tool install --global dotnet-ef   # si no lo tienes
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

3. **Ejecutar API**

   ```bash
   dotnet run
   ```

   Por defecto: `https://localhost:7045` (puerto puede variar).

### 2) Frontend (Angular)

Desde `/FETarjetaCredito`:

```bash
npm install
ng serve -o
```

Se abrirá `http://localhost:4200`.

> Si necesitas evitar CORS, usa un **proxy**:
> `proxy.conf.json`
>
> ```json
> { "/api": { "target": "https://localhost:7045", "secure": false, "changeOrigin": true } }
> ```
>
> Ejecuta:
>
> ```bash
> ng serve --proxy-config proxy.conf.json
> ```

## Scripts útiles

**Backend**

```bash
dotnet watch run
dotnet ef migrations add <Nombre>
dotnet ef database update
```

**Frontend**

```bash
ng g c components/tarjeta-credito
ng g s services/tarjeta
npm run build
```

## Buenas prácticas

* No versionar `bin/`, `obj/`, `.vs/`, `node_modules/`, `dist/` (ya en `.gitignore`).
* Trabajar en ramas (`feature/*`, `dev`) y merger a `main` vía PR.
* Commits descriptivos.

## Problemas comunes

* **CORS** (habilitar en API):

  ```csharp
  builder.Services.AddCors(opt =>
  {
      opt.AddPolicy("AllowLocal", p => p
          .WithOrigins("http://localhost:4200")
          .AllowAnyHeader()
          .AllowAnyMethod());
  });
  app.UseCors("AllowLocal");
  ```
* **Certificado HTTPS dev**: `dotnet dev-certs https --trust`.
* **EF “No database provider has been configured”**: revisa `UseSqlServer` y tu `ConnectionString`.

## Licencia

MIT.

````

Luego confirma y sube:

```bash
git add README.md
git commit -m "docs: agregar README con pasos de backend y frontend"
git push
````
