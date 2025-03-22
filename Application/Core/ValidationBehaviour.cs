using System;
using FluentValidation;
using MediatR;

namespace Application.Core;

public class ValidationBehaviour<TRequest, TResponse>(IValidator<TRequest>? validator = null)
    : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if (validator is null) return await next();

        var validationResult = await validator.ValidateAsync(request, cancellationToken);

        return !validationResult.IsValid 
            ? throw new ValidationException(validationResult.Errors) 
            : await next();
    }
}
