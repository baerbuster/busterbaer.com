const script = [
  {
    speaker: 'Aporius:',
    text: "Welcome, weary traveler! I am Aporius and this is Buster Baer's Digital Portfolio!",
    delay: 1500
  },
  {
    speaker: 'Aporius:',
    text: 'Let me ask you, how old are you?',
    delay: 0
  },
  {
    speaker: 'Visitor:',
    control: [{ token: 'age', type: 'number' }],
    delay: 0
  },
  {
    speaker: 'Aporius:',
    text: 'And how old would you hope to be on the day you die?',
    delay: 0
  },
  {
    speaker: 'Visitor:',
    control: [{ token: 'deathAge', type: 'number' }],
    delay: 0
  },
  {
    speaker: 'Aporius:',
    text: 'And what is your favorite season of the year?',
    delay: 0
  },
  {
    speaker: 'Visitor:',
    control: [{ token: 'season', type: 'select', options: ['Winter', 'Spring', 'Summer', 'Fall'] }],
    delay: 0
  },
  {
    speaker: 'Aporius:',
    text: 'Is there a particular subject about your life that interests you?',
    delay: 0
  },
  {
    speaker: 'Visitor:',
    control: [
      {
        token: 'subject',
        type: 'select',
        options: ['Sleeping', 'Eating', 'Working', 'Exercising', 'Commuting', 'Goofing Off']
      }
    ],
    delay: 0
  },
  {
    speaker: 'Aporius:',
    text: 'How many hours do you spend {subject}?',
    delay: 0
  },
  {
    speaker: 'Visitor:',
    control: [
      { token: 'hours', type: 'number' },
      { words: " hours a ", token: 'time_unit', type: 'select', options: ['day', 'week', 'month', 'year'] }
    ],
    delay: 0
  },
  {
    speaker: 'Aporius:',
    text: 'You have {seasons_left} {season}s left. Before you die, you will have spent {num_seasons_spent} of them {subject}. On your deathbed, will you believe you have spent your {season}s well?',
    delay: 0
  }
]

export default script
