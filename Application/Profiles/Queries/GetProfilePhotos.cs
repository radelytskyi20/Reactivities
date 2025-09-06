﻿using Application.Core;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetProfilePhotos
{
    public class Query : IRequest<Result<List<Photo>>> 
    {
        public required string UserID { get; set; }
    }

    public class Handler(AppDbContext appDbContext) : IRequestHandler<Query, Result<List<Photo>>>
    {
        public async Task<Result<List<Photo>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var photos = await appDbContext.Users
                .Where(x => x.Id == request.UserID)
                .SelectMany(x => x.Photos)
                .ToListAsync(cancellationToken);

            return Result<List<Photo>>.Success(photos);
        }
    }
}
