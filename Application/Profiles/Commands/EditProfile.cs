using Application.Core;
using Application.Interfaces;
using Application.Profiles.Dtos;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands;

public class EditProfile
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditProfileDto ProfileDto { get; set; }
    }

    public class Handler(
        AppDbContext appDbContext,
        IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();
            if (user is null)
                return Result<Unit>.Failure("Cannot find user profile", 400);

            var displayNameToSet = request.ProfileDto.DisplayName;
            var bioToSet = request.ProfileDto.Bio;

            user.DisplayName = string.IsNullOrEmpty(displayNameToSet) ? user.DisplayName : displayNameToSet;
            user.Bio = string.IsNullOrEmpty(bioToSet) ? user.Bio : bioToSet;

            var result = await appDbContext.SaveChangesAsync(cancellationToken) > 0;
            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem updating user profile", 400);
        }
    }
}
