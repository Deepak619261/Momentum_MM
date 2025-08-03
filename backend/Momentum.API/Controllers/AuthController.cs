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
            return BadRequest("User already exists.");

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
        var user = new User
        {
            Email = request.Email,
            FullName = request.FullName,
            PasswordHash = passwordHash
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var token = _tokenService.CreateToken(user);
        return Ok(new { token });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserLoginDto request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return Unauthorized("Invalid credentials.");

        var token = _tokenService.CreateToken(user);
        return Ok(new { token });
    }
}
