﻿using Application.Core;
using Application.Interfaces;
using Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Profiles.Commands;

public class AddPhoto
{
    public class Command : IRequest<Result<Photo>>
    {
        public required IFormFile File { get; set; }
    }

    public class Handler(
        IUserAccessor userAccessor,
        AppDbContext appDbContext,
        IPhotoService photoService) : IRequestHandler<Command, Result<Photo>>
    {
        public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
        {
            var uploadResult = await photoService.UploadPhoto(request.File);
            if (uploadResult is null)
                return Result<Photo>.Failure("Falied to upload photo", 400);

            var user = await userAccessor.GetUserAsync();
            var photo = new Photo
            {
                Url = uploadResult.Url,
                PublicId = uploadResult.PublicId,
                UserId = user.Id
            };

            user.ImageUrl ??= photo.Url;

            appDbContext.Photos.Add(photo);
            var result = await appDbContext.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<Photo>.Success(photo)
                : Result<Photo>.Failure("Problem saving photo to DB", 400);
        }
    }
}