﻿using Microsoft.EntityFrameworkCore;
using Activity = Domain.Models.Activity;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public required DbSet<Activity> Activities { get; set; }
}
