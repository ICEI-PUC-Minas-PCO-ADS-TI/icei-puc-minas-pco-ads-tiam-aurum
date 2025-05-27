
using AurumApi.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using AurumApi.Services.Interface;
using AurumApi.Services;
using Microsoft.Extensions.Options;
using AurumApi.Models;

namespace AurumApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            ConfigureAuthentication(builder);
            ConfigureSwagger(builder);
            ConfigureDatabase(builder);
            ConfigureCloudinary(builder);
            ConfigureMvc(builder);
            // Configura o CORS
            ConfigureCors(builder);


            builder.Services.AddScoped<IPagamento, PagamentoService>();
            builder.Services.AddScoped<IUsuarioService, UsuarioService>();
            builder.Services.AddScoped<IJoiasService, JoiasService>();
            builder.Services.AddScoped<IClienteService, ClienteService>();
            builder.Services.AddScoped<IPedidoService, PedidoService>();

            var app = builder.Build();

            ConfigureMiddleware(app);

            app.Run();
        }

        // AUTENTICA��O JWT
        static void ConfigureAuthentication(WebApplicationBuilder builder)
        {
            var key = Encoding.ASCII.GetBytes(Configuration.JwtKey);

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        }

        // DOCUMENTA��O NO SWAGGER
        static void ConfigureSwagger(WebApplicationBuilder builder)
        {
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Aurum API",
                    Version = "v1"
                });

                var xmlFile = "AurumApi.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Insira o token JWT no campo abaixo. Exemplo: Bearer {seu token}"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new List<string>()
                    }
                });
            });
        }

        // CONFIGURA��O DO BANCO DE DADOS COM EF
        static void ConfigureDatabase(WebApplicationBuilder builder)
        {
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

            builder.Services.AddDbContext<AurumDataContext>(options =>
            {
                options.UseNpgsql(connectionString);
            });
        }

        static void ConfigureCors(WebApplicationBuilder builder)
        {
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAnyOrigin", builder =>
                    builder.AllowAnyOrigin()  // Permite acesso de qualquer origem
                           .AllowAnyHeader()  // Permite qualquer cabe�alho
                           .AllowAnyMethod()); // Permite qualquer m�todo (GET, POST, etc.)
            });
        }


        static void ConfigureMvc(WebApplicationBuilder builder)
        {
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
        }

        static void ConfigureMiddleware(WebApplication app)
        {
            app.UseSwagger();
            app.UseSwaggerUI();

            //app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();
        }
        static void ConfigureCloudinary(WebApplicationBuilder builder)
        {
            builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("CloudinarySettings"));
            builder.Services.AddSingleton(sp =>
            {
                var settings = sp.GetRequiredService<IOptions<CloudinarySettings>>().Value;
                var account = new CloudinaryDotNet.Account(settings.CloudName, settings.ApiKey, settings.ApiSecret);
                return new CloudinaryDotNet.Cloudinary(account);
            });
        }
    }
}
