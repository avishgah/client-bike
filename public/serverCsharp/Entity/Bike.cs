using System;
using System.Collections.Generic;

namespace Entity;

public partial class Bike
{
    public string? Id { get; set; }

    public string? Code { get; set; }

    public int? Battery { get; set; }

    public string? IdStation { get; set; }

    public DateTime? DateStart { get; set; }
}
