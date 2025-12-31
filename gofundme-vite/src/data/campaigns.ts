export interface Campaign {
  id: number
  name: string
  idea: string
  description: string
  goal: number
  fundedSuccessfully: boolean
  imageUrl?: string
}

export function getPlaceholderImage(id: number): string {
  return `https://picsum.photos/seed/${id}/800/600`
}

export const campaigns: Campaign[] = [
  {
    id: 1,
    name: "Joe",
    idea: "Animal Shelter",
    description: "Our beloved animal shelter is facing closure. We need funds to keep caring for over 200 animals.",
    goal: 50000,
    fundedSuccessfully: true
  },
  {
    id: 2,
    name: "Joe",
    idea: "Potato Salad",
    description: "I'm making potato salad. Basically I'm just making potato salad. I haven't decided what kind yet.",
    goal: 10,
    fundedSuccessfully: true
  },
  {
    id: 3,
    name: "Joe",
    idea: "Neighbor Wall",
    description: "My neighbors are too loud. I want to build a 10-foot concrete wall between our properties.",
    goal: 15000,
    fundedSuccessfully: false
  },
  {
    id: 4,
    name: "Joe",
    idea: "Medical Bills",
    description: "After a drunk driver hit my car, I'm facing huge medical bills. I have two kids and can't work.",
    goal: 45000,
    fundedSuccessfully: true
  },
  {
    id: 5,
    name: "Joe",
    idea: "Coachella Trip",
    description: "I really want to go to Coachella this year but tickets are expensive. All my friends are going!",
    goal: 1500,
    fundedSuccessfully: false
  },
  {
    id: 6,
    name: "Joe",
    idea: "House Fire Recovery",
    description: "Our family lost everything in a devastating house fire. We escaped with only our clothes.",
    goal: 75000,
    fundedSuccessfully: true
  },
  {
    id: 7,
    name: "Joe",
    idea: "Tesla Purchase",
    description: "I've always dreamed of owning a Tesla Model S. My current car works fine but it's not electric.",
    goal: 80000,
    fundedSuccessfully: false
  },
  {
    id: 8,
    name: "Joe",
    idea: "PTSD Service Dog",
    description: "After serving three tours overseas, I struggle daily with PTSD. A service dog would help me.",
    goal: 25000,
    fundedSuccessfully: true
  },
  {
    id: 9,
    name: "Joe",
    idea: "Sue Ex-Boyfriend",
    description: "My ex-boyfriend owes me $500 and won't pay it back. I need $3,000 for legal fees to sue him.",
    goal: 3000,
    fundedSuccessfully: false
  },
  {
    id: 10,
    name: "Joe",
    idea: "Wheelchair Van",
    description: "Our son was paralyzed in a diving accident. We need a modified van for his wheelchair.",
    goal: 65000,
    fundedSuccessfully: true
  },
  {
    id: 11,
    name: "Joe",
    idea: "Gaming Setup",
    description: "I want to become a professional gamer but need a high-end PC and multiple monitors to compete.",
    goal: 5000,
    fundedSuccessfully: false
  },
  {
    id: 12,
    name: "Joe",
    idea: "Funeral Expenses",
    description: "My sister passed away suddenly, leaving three young children. We need help with funeral costs.",
    goal: 15000,
    fundedSuccessfully: true
  },
  {
    id: 13,
    name: "Joe",
    idea: "Cryptocurrency Launch",
    description: "I have an idea for a new cryptocurrency that will revolutionize finance. To the moon!",
    goal: 100000,
    fundedSuccessfully: false
  },
  {
    id: 14,
    name: "Joe",
    idea: "Accessible Playground",
    description: "Our community needs an accessible playground where children of all abilities can play together.",
    goal: 120000,
    fundedSuccessfully: true
  },
  {
    id: 15,
    name: "Joe",
    idea: "Student Loans",
    description: "I have $80,000 in student loans from my English degree. I'm working as a barista.",
    goal: 80000,
    fundedSuccessfully: false
  }
]

export function getShuffledCampaigns(): Campaign[] {
  return [...campaigns].sort(() => Math.random() - 0.5)
}
