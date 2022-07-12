using advertisement.Data;
using advertisement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace advertisement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertisementController : ControllerBase
    {

        private readonly AplicationDbContext _context;

        public AdvertisementController(AplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        async public Task<ActionResult<List<Advertisement>>> Get()
        {
            List<Advertisement> advertisements = await _context.Advertisement.ToListAsync();
            return Ok(advertisements);
        }

        [HttpGet("{id}")]
        async public Task<ActionResult<Advertisement>> Get(int id)
        {
            Advertisement advertisements = await _context.Advertisement.FindAsync(id);
            if (advertisements == null)
                return BadRequest("Advertisement not found.");
            return Ok(advertisements);
        }

        [HttpPost]
        public async Task<ActionResult<List<Advertisement>>> Post([FromBody] Advertisement advertisement)
        {
            _context.Advertisement.Add(advertisement);
            await _context.SaveChangesAsync();
            List<Advertisement> advertisementsResult = await _context.Advertisement.ToListAsync();
            return Ok(advertisementsResult);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Advertisement>>> Put(int id, [FromBody] Advertisement advertisement)
        {
            Advertisement advertisementExist = await _context.Advertisement.FindAsync(id);
            if (advertisementExist == null)
                return BadRequest("Advertisement not found.");
            advertisementExist.Body = advertisement.Body;
            advertisementExist.MediaURL = advertisement.MediaURL;
            advertisementExist.LinkURL = advertisement.LinkURL;
            await _context.SaveChangesAsync();

            return Ok(await _context.Advertisement.ToListAsync());
        }
       
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Advertisement>>> Delete(int id)
        {
            Advertisement advertisementExist = await _context.Advertisement.FindAsync(id);
            if (advertisementExist == null)
                return BadRequest("Advertisement not found.");
            _context.Advertisement.Remove(advertisementExist);
            await _context.SaveChangesAsync();

            return Ok(await _context.Advertisement.ToListAsync());
        }
    }
}
