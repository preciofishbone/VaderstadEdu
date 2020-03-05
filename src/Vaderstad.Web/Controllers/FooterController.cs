using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Omnia.Fx.Models.Shared;
using Omnia.Fx.Utilities;

namespace Vaderstad.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FooterController : ControllerBase
    {

        [HttpGet]
        public async ValueTask<ApiResponse<List<string>>> GetFooter()
        {
            try
            {
                
                var res = new List<string> { "value1", "value2" };
                return res.AsApiResponse();
            }
            catch (Exception ex)
            {
                throw;
            }
            

           
        }

        
    }
}
