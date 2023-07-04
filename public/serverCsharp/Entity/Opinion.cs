using System;
using System.Collections.Generic;

namespace Entity;

public partial class Opinion
{
    public string Id { get; set; } = null!;

    public string? IdCust { get; set; }

    public string? IdStation { get; set; }

    public string? Caption { get; set; }

    public int? SatisfactionLeve { get; set; }
}
