// Information to be inserted automatically in colection 'entries' in MongoDB

interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Pending: Proident dolor duis elit sunt qui dolor laborum veniam ea laboris qui consequat',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      description: 'In-Progress: Proident dolor duis elit sunt qui dolor laborum veniam ea laboris qui consequat',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description: 'Finished: Proident dolor duis elit sunt qui dolor laborum veniam ea laboris qui consequat',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
    {
      description: 'Finished: Proident dolor duis elit sunt qui dolor laborum veniam ea laboris qui consequat',
      status: 'in-progress',
      createdAt: Date.now() - 200000,
    },
  ]
}