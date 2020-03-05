using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Vaderstad.Models.Media;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Omnia.Fx;

namespace Vaderstad.Core.Services
{
    internal class MediaService : IMediaService
    {
        private readonly HttpClient _httpClient;

        public MediaService(HttpClient httpClient)
        {
            this._httpClient = httpClient;
        }

        public async ValueTask<IEnumerable<MediaItemSearchResult>> SearchMedia(string query)
        {

            var url = $"https://api.unsplash.com/search/photos?page=1&query={query}&client_id=Fp95GfHO1jnsDDDzTxnWh9QTFgTYX0F8uYVJ_CzRVdU";
            var result = new List<MediaItemSearchResult>();


            var res = await _httpClient.GetAsync(url);


            var reqResp = await res.Content.ReadAsJsonAsync<JObject>();

            foreach (var item in reqResp["results"])
            {
                result.Add(new MediaItemSearchResult
                {
                    ThumbnailUrl = item["urls"]["small"].ToString(),
                    ContentUrl = item["urls"]["full"].ToString()
                });


            }

            return result;
        }
    }


}
