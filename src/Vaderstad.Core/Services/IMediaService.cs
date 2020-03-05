using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Vaderstad.Models.Media;

namespace Vaderstad.Core.Services
{
    public interface IMediaService
    {

        public ValueTask<IEnumerable<MediaItemSearchResult>> SearchMedia(string query);

    }
}
