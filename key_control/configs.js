export default { keyConfigs : [
    {
    name: 'tracks',
    instructions: 'https://bricksafe.com/files/Kuramapicka1/mindstormnxt-2.0standard/NXT2.0Instructions.pdf',
    config: [
      {key: 38, action: 'motorbc',direction:'forward',speed:100},
      {key: 40, action: 'motorbc',direction:'backward',speed:100},
      {key: 37, action: 'motorbc',direction:'forwardbackward',speed:100},
      {key: 39, action: 'motorbc',direction:'backwardforward',speed:100}
    ]
    },
    {
    name: 'car',
    instructions: 'http://www.nxtprograms.com/NXT2/race_car/steps.html',
    config: [
      {key: 38, action: 'motorbc',direction:'backward',speed:100},
      {key: 40, action: 'motorbc',direction:'forward',speed:100},
      {key: 37, action: 'motora',direction:'forward',speed:50},
      {key: 39, action: 'motora',direction:'backward',speed:50}
    ]
    },
    {
    name: 'alpha rex',
    instructions: 'https://bricksafe.com/files/Kuramapicka1/mindstormnxt-2.0standard/NXT2.0Instructions.pdf',
    config: [
      {key: 38, action: 'motorbc',direction:'forward',speed:50},
      {key: 40, action: 'motorbc',direction:'backward',speed:40},
      {key: 37, action: 'motora',direction:'forward',speed:100},
      {key: 39, action: 'motora',direction:'backward',speed:100},
    ]
    },
    {
    name: 'robogator',
    instructions: 'https://bricksafe.com/files/Kuramapicka1/mindstormnxt-2.0standard/NXT2.0Instructions.pdf',
    config: [
      {key: 38, action: 'motorbc',direction:'backward',speed:100},
      {key: 40, action: 'motorbc',direction:'forward',speed:100},
      {key: 37, action: 'motorbc',direction:'forwardbackward',speed:100},
      {key: 39, action: 'motorbc',direction:'backwardforward',speed:100},
      {key: 32, action: 'motora',direction:'backward',speed:100},
      {key: 66, action: 'motora',direction:'forward',speed:100},
    ]
    },
    {
    name: 'Puppy',
    instructions: 'http://www.nxtprograms.com/puppy/',
    config: [
      {key: 38, action: 'motorbc',direction:'backward',speed:70},
      {key: 40, action: 'motorbc',direction:'forward',speed:70},
      {key: 37, action: 'motorbc',direction:'backwardforward',speed:60},
      {key: 39, action: 'motorbc',direction:'forwardbackward',speed:60},
      {key: 32, action: 'motora',direction:'backward',speed:30},
      {key: 66, action: 'motora',direction:'forward',speed:30},
    ]
    }
  ]
  }