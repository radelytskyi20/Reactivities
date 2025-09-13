using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class FollowToggle
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string TargetUserId { get; set; }
    }

    public class Handler(
        AppDbContext appDbContext,
        IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var observer = await userAccessor.GetUserAsync();
            var target = await appDbContext.Users.FindAsync([request.TargetUserId], cancellationToken);

            if (target is null)
                return Result<Unit>.Failure("Target user not found", 400);

            var following = await appDbContext.UserFollowings
                    .FindAsync([observer.Id, target.Id], cancellationToken);

            if (following is null)
            {
                appDbContext.UserFollowings.Add(new Domain.Models.UserFollowing
                {
                    ObserverId = observer.Id,
                    TargetId = target.Id
                });
            }
            else
            {
                appDbContext.UserFollowings.Remove(following);
            }

            var result = await appDbContext.SaveChangesAsync(cancellationToken) > 0;
            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem updating following", 400);
        }
    }
}
