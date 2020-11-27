using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HR.Errors;
using HR.Helpers;
using HR.Middleware;
using AutoMapper;
using Core.Interfaces;
using Infrastructure.Data;

using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace HR
{
  public class Startup
  {
    // FE
    private readonly IConfiguration _configuration;
    public Startup(IConfiguration configuration)
    {
      // FE
      // Configuration = configuration;
      _configuration = configuration;

    }

    // public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));
      services.AddAutoMapper(typeof(MappingProfiles));

      services.AddControllersWithViews();

      // FE
      services.AddDbContext<HumanResourcesContext>(x => x.UseSqlServer(_configuration.GetConnectionString("DefaultConnection")));

      // In production, the Angular files will be served from this directory
      services.AddSpaStaticFiles(configuration =>
      {
        configuration.RootPath = "ClientApp/dist";
      });

      var origins = new string[] {
                "https://localhost:3000",
                "https://localhost:5001"
            };
      services.AddCors(opt => {
        opt.AddPolicy("CorsPolicy", policy => {
          policy.AllowAnyHeader().AllowAnyMethod().WithOrigins(origins);
        });
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, HumanResourcesContext db)
    {
      //if (env.IsDevelopment())
      //{
      //  app.UseDeveloperExceptionPage();
      //}
      //else
      //{
      //  app.UseExceptionHandler("/Error");
      //}

      // FE: To send back consistent error message object even with stack trace
      // Test endpoint: }/api/Buggy/servererror
      app.UseMiddleware<ExceptionMiddleware>();

      app.UseStatusCodePagesWithReExecute("/errors/{0}");

      db.Database.EnsureCreated();

      app.UseStaticFiles();
      if (!env.IsDevelopment())
      {
        app.UseSpaStaticFiles();
      }

      app.UseRouting();

      // FE
      app.UseCors("CorsPolicy");

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllerRoute(
                  name: "default",
                  pattern: "{controller}/{action=Index}/{id?}");
      });

      app.UseSpa(spa =>
      {
              // To learn more about options for serving an Angular SPA from ASP.NET Core,
              // see https://go.microsoft.com/fwlink/?linkid=864501

              spa.Options.SourcePath = "ClientApp";

        if (env.IsDevelopment())
        {
          spa.UseAngularCliServer(npmScript: "start");
        }
      });
    }
  }
}
