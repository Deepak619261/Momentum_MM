# Momentum API Configuration

## Environment Setup

This project uses different appsettings files for different environments. To set up your development environment:

1. Copy `appsettings.Development.example.json` to `appsettings.Development.json`
2. Fill in your actual database connection string and JWT key values

```powershell
# From the Momentum.API directory
Copy-Item appsettings.Development.example.json appsettings.Development.json
```

## Sensitive Information

We do not commit files containing sensitive information such as:
- Database connection strings with passwords
- JWT secret keys
- API keys
- Other credentials

These files are excluded in the `.gitignore` file. Always use example or template files that are committed to the repository as references.

## Files to Keep Local Only

The following files should never be committed and should remain on your local machine only:
- `appsettings.Development.json`
- `appsettings.Production.json`
- `appsettings.Staging.json`
- Any `.env` files

## Template Files

We maintain example files with placeholder values that can be committed:
- `appsettings.Development.example.json`
- `appsettings.Development.template.json`

These files show the structure of the required configuration but without actual sensitive values.
