using advertisement.Models;
using Microsoft.EntityFrameworkCore;

namespace advertisement.Data
{
    public class AplicationDbContext : DbContext
    {
        public DbSet<Advertisement> Advertisement { get; set; }
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options) {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AplicationDbContext).Assembly);
        }

    }
}

