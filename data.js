// SAMPLE DATA ONLY. Replace with real information later.
// Never put real phone numbers here until each person has agreed.

const areas = [
  { id: "okwe", name: "Okwe" },
  { id: "area-2", name: "Sample Area 2" },
  { id: "area-3", name: "Sample Area 3" },
  { id: "area-4", name: "Sample Area 4" },
  { id: "area-5", name: "Sample Area 5" }
];

// To switch a category on or off, change active to true or false.
// Only switch one on when it has at least 3 verified providers.
const categories = [
    {
    id: "property",
    name: "House / Shop",
    description: "Houses, shops, offices and warehouses",
    active: true,
    provider: "agent",
    providers: "agents",
    lookingFor: "a house, shop, office or warehouse to rent",
    groups: [
      {
        label: "Houses",
        types: [
          "Single room",
          "Room and parlour",
          "Self-contain",
          "One-bedroom flat",
          "Two-bedroom flat",
          "Three-bedroom flat",
          "Duplex or bungalow"
        ]
      },
      {
        label: "Shops, offices and warehouses",
        types: [
          "Small shop",
          "Shop in a plaza",
          "Office space",
          "Warehouse",
          "Store or storage room"
        ]
      }
    ]
  },
    {
    id: "tools",
    name: "Tools",
    description: "Work tools and equipment",
    active: true,
    provider: "supplier",
    providers: "suppliers",
    lookingFor: "tools to rent",
    groups: [
      {
        label: "Cars and mechanics",
        types: ["Car battery", "Mechanic tools"]
      },
      {
        label: "Building and repair",
        types: ["Ladders", "Other tools"]
      }
    ]
  },
  { id: "events", name: "Events", active: false, groups: [] },
  { id: "cars", name: "Cars", active: false, groups: [] }
];

const providers = [
  {
    id: 1,
    name: "Sample Agent One",
    phone: "08000000001",
    whatsapp: "2348000000001",
    categories: ["property"],
    areas: ["okwe", "area-2"],
    types: ["Self-contain", "Room and parlour", "Small shop"],
    verified: true
  },
  {
    id: 2,
    name: "Sample Agent Two",
    phone: "08000000002",
    whatsapp: "2348000000002",
    categories: ["property"],
    areas: ["okwe"],
    types: ["Two-bedroom flat", "Shop in a plaza"],
    verified: true
  },
  {
    id: 3,
    name: "Sample Agent Three",
    phone: "08000000003",
    whatsapp: "2348000000003",
    categories: ["property"],
    areas: ["area-3"],
    types: ["Single room"],
    verified: false
  },
  {
    id: 4,
    name: "Sample Tool Supplier One",
    phone: "08000000004",
    whatsapp: "2348000000004",
    categories: ["tools"],
    areas: ["okwe", "area-3"],
    types: ["Generator", "Concrete mixer"],
    verified: true
  },
  {
    id: 5,
    name: "Sample Tool Supplier Two",
    phone: "08000000005",
    whatsapp: "2348000000005",
    categories: ["tools"],
    areas: ["okwe"],
    types: ["Welding machine", "Scaffolding and ladders"],
    verified: false
  }
];
