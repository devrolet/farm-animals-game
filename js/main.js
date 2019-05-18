
// this game will only have one state
var GameState = {
  // load the game assets before the game starts
  preload: function() {
    // Load Background
    this.load.image('background', 'assets/images/background.png');
    this.load.image('arrow', 'assets/images/arrow.png');

    // this.load.image('chicken', 'assets/images/chicken.png');
    // this.load.image('horse', 'assets/images/horse.png');
    // this.load.image('pig', 'assets/images/pig.png');
    // this.load.image('sheep', 'assets/images/sheep3.png');

    this.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png', 131, 200, 3);
    this.load.spritesheet('horse', 'assets/images/horse_spritesheet.png', 212, 200, 3);
    this.load.spritesheet('pig', 'assets/images/pig_spritesheet.png', 297, 200, 3);
    this.load.spritesheet('sheep', 'assets/images/sheep_spritesheet.png', 244, 200, 3);
  
    this.load.audio('chickenSound', ['assets/audio/chicken.ogg', 'asset/audio/chicken.mp3']);
    this.load.audio('horseSound', ['assets/audio/horse.ogg', 'asset/audio/horse.mp3']);
    this.load.audio('pigSound', ['assets/audio/pig.ogg', 'asset/audio/pig.mp3']);
    this.load.audio('sheepSound', ['assets/audio/sheep.ogg', 'asset/audio/sheep.mp3']);
  },
  // executed after everything is loaded
  create: function() {
    // Scale to fix entire screen
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // Center the game
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    // create a new sprite
    this.background = this.game.add.sprite(0, 0, 'background');

    // group for animals
    var animalData = [
      {key: 'chicken', text: 'CHICKEN', audio: 'chickenSound'},
      {key: 'horse', text: 'HORSE', audio: 'horseSound'},
      {key: 'pig', text: 'PIG', audio: 'pigSound'},
      {key: 'sheep', text: 'SHEEP', audio: 'sheepSound'}
    ];

    this.animals = this.game.add.group();

    var self = this;
    var animal;

    animalData.forEach(function(element) {
      animal = self.animals.create(-1000, this.game.world.centerY, element.key);

      // Non-Phaser related objects
      animal.customParams = {text: element.key, sound: self.game.add.audio(element.audio)};
      
      // anchor point set to the center of the sprite
      animal.anchor.setTo(0.5);

      //create animal animation
      animal.animations.add('animate', [0, 1, 2, 1, 0, 1], 3, false);

      animal.inputEnabled = true;
      animal.input.pixelPerfectClick = true;
      animal.events.onInputDown.add(self.animateAnimal, self);
    });

    this.currentAnimal = this.animals.next();
    this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);

    // left arrow
    this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
    this.leftArrow.anchor.setTo(0.5);
    this.leftArrow.scale.x = -1;
    this.leftArrow.customParams = {direction: -1};

    // left arrow allow user input
    this.leftArrow.inputEnabled = true;
    this.leftArrow.input.pixelPerfectClick = true;
    this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

    // right arrow
    this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
    this.rightArrow.anchor.setTo(0.5);
    this.rightArrow.customParams = {direction: 1};

    // right arrow allow user input
    this.rightArrow.inputEnabled = true;
    this.rightArrow.input.pixelPerfectClick = true;
    this.rightArrow.events.onInputDown.add(this.switchAnimal, this);

  },
  // this is executed multiple times per second
  update: function() {
    
  },
  
  animateAnimal: function(sprite, event) {
    sprite.play('animate');
    sprite.customParams.sound.play();
  },

  switchAnimal: function (sprite, event) {
    if(this.isMoving) {
      return false;
    }

    this.isMoving = true;

    var newAnimal, endX;
    
    if(sprite.customParams.direction > 0) {
      newAnimal = this.animals.next();
      newAnimal.x = -newAnimal.width/2;
      endX = 640 + this.currentAnimal.width/2;
    } else {
      newAnimal = this.animals.previous();
      newAnimal.x = 640 + newAnimal.width/2;
      endX = -this.currentAnimal.width/2;
    }

    var newAnimalMovement = this.game.add.tween(newAnimal);
    newAnimalMovement.to({ x: this.game.world.centerX }, 1000);
    newAnimalMovement.onComplete.add(function() {
      this.isMoving = false;
    }, this)
    newAnimalMovement.start();
    
    var currentAnimalMovement = this.game.add.tween(this.currentAnimal);
    currentAnimalMovement.to({ x: endX }, 1000);
    currentAnimalMovement.start();

    this.currentAnimal = newAnimal;

    
  }
};

// initiates the Phaser framework
var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('GameState', GameState);
// Start Game
game.state.start('GameState');