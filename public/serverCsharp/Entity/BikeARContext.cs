using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Entity;

public partial class BikeARContext : DbContext
{
    public BikeARContext()
    {
    }

    public BikeARContext(DbContextOptions<BikeARContext> options)
        : base(options)
    {

    }

    public virtual DbSet<Bike> Bikes { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Opinion> Opinions { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderBike> OrderBikes { get; set; }

    public virtual DbSet<Station> Stations { get; set; }

    public virtual DbSet<Status> Statuses { get; set; }

    public virtual DbSet<TypeCust> TypeCusts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=sqlsrv;Initial Catalog=bike_a&r;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Bike>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("bike");

            entity.Property(e => e.Battery).HasColumnName("battery");
            entity.Property(e => e.Code)
                .HasMaxLength(10)
                .IsFixedLength();
            entity.Property(e => e.DateStart).HasColumnType("date");
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("id");
            entity.Property(e => e.IdStation)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("idStation");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("customers");

            entity.Property(e => e.Address)
                .HasMaxLength(50)
                .HasColumnName("address");
            entity.Property(e => e.DateBirth)
                .HasColumnType("date")
                .HasColumnName("dateBirth");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Mail)
                .HasMaxLength(50)
                .HasColumnName("mail");
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .IsFixedLength()
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("password");
            entity.Property(e => e.Phon)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("phon");
            entity.Property(e => e.Pic)
                .HasMaxLength(50)
                .IsFixedLength()
                .HasColumnName("pic");
            entity.Property(e => e.ReadTerms).HasColumnName("readTerms");
            entity.Property(e => e.Status)
                .HasMaxLength(1)
                .IsFixedLength()
                .HasColumnName("status");
            entity.Property(e => e.Toun)
                .HasMaxLength(50)
                .HasColumnName("toun");
            entity.Property(e => e.TypeCust)
                .HasMaxLength(1)
                .IsFixedLength()
                .HasColumnName("typeCust");
            entity.Property(e => e.Tz)
                .HasMaxLength(9)
                .HasColumnName("tz");
        });

        modelBuilder.Entity<Opinion>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("opinion");

            entity.Property(e => e.Caption)
                .HasMaxLength(100)
                .IsFixedLength()
                .HasColumnName("caption");
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("id");
            entity.Property(e => e.IdCust)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("idCust");
            entity.Property(e => e.IdStation)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("idStation");
            entity.Property(e => e.SatisfactionLeve).HasColumnName("satisfactionLeve");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("orders");

            entity.Property(e => e.Code)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("code");
            entity.Property(e => e.DatePay)
                .HasColumnType("date")
                .HasColumnName("datePay");
            entity.Property(e => e.EndSum).HasColumnName("endSum");
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("id");
            entity.Property(e => e.IdCust)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("idCust");
            entity.Property(e => e.IsPay).HasColumnName("isPay");
        });

        modelBuilder.Entity<OrderBike>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("order_bike");

            entity.Property(e => e.DateEnd)
                .HasColumnType("date")
                .HasColumnName("dateEnd");
            entity.Property(e => e.DateOrder)
                .HasColumnType("date")
                .HasColumnName("dateOrder");
            entity.Property(e => e.DateStart)
                .HasColumnType("date")
                .HasColumnName("dateStart");
            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("id");
            entity.Property(e => e.IdBike)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("idBike");
            entity.Property(e => e.IdPay)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("idPay");
            entity.Property(e => e.IdStation)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("idStation");
            entity.Property(e => e.Status)
                .HasMaxLength(1)
                .IsFixedLength()
                .HasColumnName("status");
            entity.Property(e => e.Sum).HasColumnName("sum");
        });

        modelBuilder.Entity<Station>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("stations");

            entity.Property(e => e.Id)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("id");
            entity.Property(e => e.Location)
                .HasMaxLength(50)
                .HasColumnName("location");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.Status)
                .HasMaxLength(1)
                .IsFixedLength()
                .HasColumnName("status");
        });

        modelBuilder.Entity<Status>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("status");

            entity.Property(e => e.Busy).HasColumnName("busy");
            entity.Property(e => e.Vacant).HasColumnName("vacant");
        });

        modelBuilder.Entity<TypeCust>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("type_cust");

            entity.Property(e => e.Cust).HasColumnName("cust");
            entity.Property(e => e.Maneger).HasColumnName("maneger");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
