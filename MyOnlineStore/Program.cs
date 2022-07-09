using logger;
using MyOnlineStore.Extensions;
using NLog;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
LogManager.LoadConfiguration(Path.Combine(Directory.GetCurrentDirectory(), "nlog.config"));

builder.Services.ConfigureCors();
builder.Services.ConfigureLoggerService();
builder.Services.ConfigureRepositoryManager();
builder.Services.ConfigureAuthServices();
builder.Services.ConfigureCitiesServices();
builder.Services.ConfigureHrServices();
builder.Services.ConfigureValidationFilter();
builder.Services.ConfigureSqlContext(builder.Configuration);
builder.Services.ConfigureIdentity();
builder.Services.ConfigureJwt(builder.Configuration);
builder.Services.ConfigureAutoMapper();

builder.Services.AddControllers(config =>
{
    config.RespectBrowserAcceptHeader = true;
    config.ReturnHttpNotAcceptable = true;
}).AddJsonOptions(x =>
{
    x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure logger
var logger = app.Services.GetRequiredService<ILoggerManager>();
app.ConfigureExceptionHandler(logger);

// Seed service requires logger
builder.Services.MigrateDatabase();
builder.Services.SeedDefaultData();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (app.Environment.IsProduction())
    app.UseHsts();

app.UseHttpsRedirection();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = Microsoft.AspNetCore.HttpOverrides.ForwardedHeaders.All
});

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
