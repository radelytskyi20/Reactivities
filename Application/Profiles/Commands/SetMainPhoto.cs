using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class SetMainPhoto
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
    }

    public class Handler(
        AppDbContext appDbContext,
        IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        async Task<Result<Unit>> IRequestHandler<Command, Result<Unit>>.Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserWithPhotosAsync();

            var photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);
            if (photo is null)
                return Result<Unit>.Failure("Cannot find photo", 400);

            user.ImageUrl = photo.Url;
            var result = await appDbContext.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem updating main photo", 400);
        }
    }
}
