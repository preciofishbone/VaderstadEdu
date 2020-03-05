using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Omnia.Fx.Models.Shared;
using Omnia.Fx.Utilities;
using Vaderstad.Core.Services;
using Vaderstad.Models.Media;

namespace Vaderstad.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly IMediaService _mediaService;

        public MediaController(
            IMediaService mediaService
            )
        {
            _mediaService = mediaService;
        }

        [HttpGet]
        public async ValueTask<ApiResponse<IEnumerable<MediaItemSearchResult>>> SearchMedia(string query)
        {
            try
            {
                
                return (await _mediaService.SearchMedia(query)).AsApiResponse();
            }
            catch (Exception ex)
            {
                throw;
            }



        }


    }
}
