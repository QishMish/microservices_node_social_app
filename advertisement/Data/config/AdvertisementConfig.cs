using advertisement.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace advertisement.Data.config
{
    public class AdvertisementConfig : IEntityTypeConfiguration<Advertisement>
    {
        public void Configure(EntityTypeBuilder<Advertisement> builder)
        {
            builder.HasIndex(x => x.Id).IsUnique();
            builder.HasKey(x => x.Id);

            builder.Property(x => x.MediaURL).IsRequired();
            builder.Property(x => x.Body).IsRequired().HasMaxLength(200);
            builder.Property(x => x.LinkURL).IsRequired();
        }
    }
}
