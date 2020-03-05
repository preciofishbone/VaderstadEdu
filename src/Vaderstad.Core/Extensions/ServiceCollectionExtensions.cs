using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using Vaderstad.Core.Services;

namespace Vaderstad.Core.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddVaderstadCore(this IServiceCollection services)
        {
            services.AddHttpClient<IMediaService,MediaService>();
            
            return services;
        }
    }
}

   
