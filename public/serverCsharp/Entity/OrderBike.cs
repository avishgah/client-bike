using System;
using System.Collections.Generic;

namespace Entity;

public partial class OrderBike
{
    public string? Id { get; set; }

    public DateTime? DateStart { get; set; }

    public DateTime? DateEnd { get; set; }

    public string? IdBike { get; set; }

    public string? IdPay { get; set; }

    public string? Status { get; set; }

    public string? IdStation { get; set; }

    public int? Sum { get; set; }

    public DateTime? DateOrder { get; set; }
}
