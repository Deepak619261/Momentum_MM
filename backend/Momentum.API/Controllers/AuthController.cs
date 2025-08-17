using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Momentum.API.Data;
using Momentum.API.DTOs;
using Momentum.API.Models;
using Momentum.API.Services;
using BCrypt.Net;

[ApiController]
[Microsoft.AspNetCore.Mvc.Route("api/[controller]")]

public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly TokenService _tokenService;

    public AuthController(AppDbContext context, TokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> SignUp(UserRegisterDto request)
    {
        if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            return BadRequest(new { message = "User with this email already exists." });

        // Use a work factor of 12 for BCrypt (default is 10)
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password, 12);
        var user = new User
        {
            Email = request.Email,
            FullName = request.FullName,
            PasswordHash = passwordHash
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var token = _tokenService.CreateToken(user);
        return Ok(new
        {
            token,
            user = new
            {
                id = user.Id,
                email = user.Email,
                fullName = user.FullName
            }
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserLoginDto request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

        // Separate checks for better security (avoid timing attacks)
        if (user == null)
            return Unauthorized(new { message = "Invalid email or password." });

        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return Unauthorized(new { message = "Invalid email or password." });

        var token = _tokenService.CreateToken(user);

        return Ok(new
        {
            token,
            user = new
            {
                id = user.Id,
                email = user.Email,
                fullName = user.FullName
            }
        });
    }
}
