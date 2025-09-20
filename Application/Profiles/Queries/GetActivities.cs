using Application.Core;
using Application.Profiles.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetActivities
{
    public class Query : IRequest<Result<List<UserActivity>>>
    {
        public required string UserId { get; set; }

        public string Predicate { get; set; } = "feature";
    }

    public class Handler(
        AppDbContext appDbContext,
        IMapper mapper) : IRequestHandler<Query, Result<List<UserActivity>>>
    {
        public async Task<Result<List<UserActivity>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var baseQuery = appDbContext.Activities.Include(x => x.Attendees).Where(x => !x.IsCancelled);
            var filteredQuery = request.Predicate switch
            {
                "feature" => baseQuery = baseQuery.Where(x => 
                    x.Attendees.Any(a => a.UserId == request.UserId) && x.Date > DateTime.UtcNow),
                "past" => baseQuery = baseQuery.Where(x => 
                    x.Attendees.Any(a => a.UserId == request.UserId) && x.Date < DateTime.UtcNow),
                "hosting" => baseQuery = baseQuery.Where(x => x.Attendees.Any(a => a.UserId == request.UserId && a.IsHost)),
                _ => baseQuery
            };

            var userActivities = await filteredQuery
                .ProjectTo<UserActivity>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return Result<List<UserActivity>>.Success(userActivities);
        }
    }
}