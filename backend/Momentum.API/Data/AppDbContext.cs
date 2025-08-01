using Microsoft.EntityFrameworkCore;
using Momentum.API.Models;

namespace Momentum.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }  // example model
    }
}
