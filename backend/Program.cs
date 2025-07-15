using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add EF Core with MySQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    ));

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

// Seed sample product if table is empty
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
    if (!db.Products.Any())
    {
        db.Products.Add(new Product {
            Name = "Pure Lavender Oil",
            Description = "Premium quality, 30ml bottle",
            Price = 19.99M,
            Image = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
        });
        db.SaveChanges();
    }
}

// Custom endpoints will be mapped here

// Products endpoint
app.MapGet("/api/products", async (AppDbContext db) =>
    await db.Products.ToListAsync()
);

// In-memory cart (for demo)
var cart = new List<CartItem>();

app.MapGet("/api/cart", () => cart);

app.MapPost("/api/cart/add", (CartItem item) => {
    var existing = cart.FirstOrDefault(i => i.Id == item.Id);
    if (existing != null)
    {
        existing.Quantity += item.Quantity;
    }
    else
    {
        cart.Add(item);
    }
    return Results.Ok(cart);
});

app.MapPost("/api/cart/update", (CartItem item) => {
    var existing = cart.FirstOrDefault(i => i.Id == item.Id);
    if (existing != null)
    {
        existing.Quantity = Math.Max(1, item.Quantity);
    }
    return Results.Ok(cart);
});

app.MapPost("/api/cart/remove", (int id) => {
    cart.RemoveAll(i => i.Id == id);
    return Results.Ok(cart);
});

app.Run();

// CartItem class
public class CartItem
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public string Image { get; set; }
}

// Add required using statements and AppDbContext definition
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Product> Products { get; set; }
}

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string Image { get; set; }
}
