using System;
using System.Net.Http.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Google.Apis.Auth;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Momentum.API.Models;
using Momentum.API.DTOs;
using Momentum.API.Data;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace Momentum.API.Services
{
    public class GoogleAuthService
    {
        private readonly GoogleAuthSettings _googleSettings;
        private readonly TokenService _tokenService;
        private readonly AppDbContext _context;

        public GoogleAuthService(
            IOptions<GoogleAuthSettings> googleSettings,
            TokenService tokenService,
            AppDbContext context)
        {
            _googleSettings = googleSettings.Value;
            _tokenService = tokenService;
            _context = context;
        }

        public string GetAuthorizationUrl(string state)
        {
            var queryParams = new Dictionary<string, string>
            {
                { "client_id", _googleSettings.ClientId },
                { "redirect_uri", _googleSettings.RedirectUri },
                { "response_type", "code" },
                { "scope", "openid email profile" },
                { "state", state },
                { "access_type", "offline" }
            };

            var url = "https://accounts.google.com/o/oauth2/v2/auth";
            return $"{url}?{string.Join("&", queryParams.Select(p => $"{p.Key}={Uri.EscapeDataString(p.Value)}"))}";
        }

        public async Task<(User user, string token)> HandleCallback(string code)
        {
            // Exchange authorization code for tokens
            using var client = new HttpClient();
            var tokenResponse = await client.PostAsync("https://oauth2.googleapis.com/token", new FormUrlEncodedContent(
                new Dictionary<string, string>
                {
                    { "client_id", _googleSettings.ClientId },
                    { "client_secret", _googleSettings.ClientSecret },
                    { "code", code },
                    { "redirect_uri", _googleSettings.RedirectUri },
                    { "grant_type", "authorization_code" }
                }));

            if (!tokenResponse.IsSuccessStatusCode)
            {
                throw new UnauthorizedAccessException("Failed to exchange authorization code");
            }

            var tokens = await tokenResponse.Content.ReadFromJsonAsync<GoogleTokenResponse>();
            
            // Get user info using access token
            var userInfoResponse = await client.GetAsync(
                $"https://www.googleapis.com/oauth2/v3/userinfo?access_token={tokens.AccessToken}");
            
            if (!userInfoResponse.IsSuccessStatusCode)
            {
                throw new UnauthorizedAccessException("Failed to get user info");
            }

            var userInfo = await userInfoResponse.Content.ReadFromJsonAsync<GoogleUserInfo>();
            
            if (userInfo == null)
            {
                throw new UnauthorizedAccessException("Failed to get user info from Google");
            }

            // Check if user exists
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userInfo.Email);
            
            if (user == null)
            {
                // Create new user
                user = new User
                {
                    Email = userInfo.Email,
                    FullName = userInfo.Name,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(Guid.NewGuid().ToString()) // Random password for Google users
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }

            // Generate JWT token
            var jwtToken = _tokenService.CreateToken(user);

            return (user, jwtToken);
        }
    }
}
